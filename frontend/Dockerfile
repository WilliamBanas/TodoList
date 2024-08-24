FROM node:20-alpine

WORKDIR /usr/src/frontend

COPY package.json ./
COPY prisma ./prisma

ENV ORIGIN http://localhost:80

RUN npm install -g pnpm
RUN pnpm install
RUN npx prisma generate

EXPOSE 3000

CMD npm run dev -- --host

