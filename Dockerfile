FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lockb ./
COPY . .
RUN npm install --frozen-lockfile || bun install --frozen-lockfile
RUN npm run build

# Production image
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
RUN npm install --production --frozen-lockfile || bun install --production --frozen-lockfile

# Use a simple static file server for the built files
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]