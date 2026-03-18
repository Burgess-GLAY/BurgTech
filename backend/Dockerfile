FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl openssl-dev

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 burtech
COPY --from=builder --chown=burtech:nodejs /app/dist ./dist
COPY --from=builder --chown=burtech:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=burtech:nodejs /app/prisma ./prisma
COPY --from=builder --chown=burtech:nodejs /app/package.json ./
USER burtech
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
