FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=file:./prisma/dev.db

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
