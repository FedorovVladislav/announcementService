# 1. Используем официальный Node.js образ для сборки
FROM node:20-alpine AS build

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и package-lock.json (или pnpm-lock.yaml / yarn.lock)
COPY package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем исходный код приложения
COPY . .

# 6. Сборка приложения
RUN npm run build

# ------------------------
# 2. Nginx для отдачи собранного приложения
# ------------------------
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг nginx (опционально, для SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 5173
EXPOSE 5173

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]