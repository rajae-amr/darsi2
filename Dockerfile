FROM node:18-alpine

WORKDIR /app

# تثبيت التبعيات
COPY package.json package-lock.json* ./
# تثبيت Next.js عالميًا وتثبيت تبعيات المشروع
RUN npm install -g next && npm install

# نسخ ملفات المشروع
COPY . .

# تعريض المنفذ
EXPOSE 3000

# أمر التشغيل (سيتم تجاوزه بواسطة docker-compose.yml)
CMD ["npm", "run", "dev"]
