FROM node:20-alpine AS builder

WORKDIR /app

# Khai báo ARG để nhận giá trị từ bên ngoài
ARG VITE_DEFAULT_WEBHOOK
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_APP_ID

# Gán các ARG thành ENV để frontend sử dụng lúc build
ENV VITE_DEFAULT_WEBHOOK=$VITE_DEFAULT_WEBHOOK
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

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
