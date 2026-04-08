# Install deps

FROM node:20-alpine as deps
WORKDIR /app
COPY package*.json ./
RUN npm Install

# Build
FROM node:20-alpine as builder
WORKDIR /app
COPY --from:deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Run application
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]