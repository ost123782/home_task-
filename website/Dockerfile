# Етап 1: Збірка (Build)
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Отримуємо змінну оточення під час білда для Vite
ARG VITE_GATEWAY_URL
ENV VITE_GATEWAY_URL=$VITE_GATEWAY_URL

RUN npm run build

# Етап 2: Запуск (Production - Nginx)
FROM nginx:alpine

# Копіюємо зібрані файли з етапу builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Створюємо простий конфіг для Nginx, щоб працював React Router (SPA)
# Це перенаправляє всі запити на index.html
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]