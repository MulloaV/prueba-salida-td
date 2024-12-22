FROM node:23.5.0-slim AS dev-deps
WORKDIR /app
COPY package.json  .
RUN npm install --frozen-lockfile


FROM node:23.5.0-slim AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM nginx:1.26.2-alpine AS prod
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]