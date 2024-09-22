# Employees App

Full-Stack Приложение

## Tech Stack

**Client:** React, Redux, antd, RTK

**Server:** Node, Express, Prisma, JWT, BcrypT

## Как запустить

Склонируйте проект

```bash
  git clone https://github.com/NAPRINAR/employees-fullstack.git
```

Перейдите в корневую папку

```bash
  cd employees-fullstack
```

Установите зависимости

```bash
  npm install

```

Переименуйте файл .env.local (уберите .local)

```bash
  ․env
```

Сгенерируйте типы для Prisma

```bash
  npx prisma generate
```

Создайте базу данных и сделайте миграцию

```bash
npx prisma migrate dev
```

Перейдите в директорию client и установите зависимости для клиентской части проекта.

```bash
cd client
npm install
```

Вернитесь в корневую директорию проекта.

```bash
cd ..
```

Запуститe проект. Введите следующую команду в терминале:

```bash
npm run dev
```

Откройте браузер и перейдите по адресу http://localhost:3000, чтобы увидеть запущенный проект.

Успешный запуск проекта должен показать список сотрудников в браузере. Если возникли какие-либо проблемы во время установки или запуска проекта, проверьте, что все вышеперечисленные шаги были выполнены правильно и в соответствии с инструкцией.
