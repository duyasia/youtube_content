FROM node:20-alpine AS builder

WORKDIR /app

# Cài dependencies
COPY package*.json ./
RUN npm install

# Copy source và build
COPY . .
RUN npm run build

# --- Giai đoạn phục vụ frontend ---
FROM nginx:alpine

# Copy build output từ builder sang nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy cấu hình nginx nếu có
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]