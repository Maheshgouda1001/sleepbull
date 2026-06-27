FROM node:22-alpine AS base
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

COPY tsconfig.json eslint.config.js .prettierrc ./
COPY src ./src
COPY public ./public

RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/public ./public
COPY uploads ./uploads

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]
