# [Messenger](https://chat-app-yandex.herokuapp.com/)


## Описание

Messenger это веб-приложения для обмена сообщениями.

Данный проект написан на чистом TypeScript/JavaScript, без использования фреймворков. 
В приложении были реализованы такие утилиты как:
- **Block** Класс для создания блоков (компонентов) с собственным жизненным циклом
- **Router** Класс для создания ротинга в приложении.
- **XHR**
- **Store (state)** Аналог Redux store
- **Event-bus** Класс для реализации паттерна наблюдатель (Observer)
- **Event-delegarion**


## Использованные инструменты и функционал

Папка src содержит исходные файлы приложения. В проекте используется:

[TypeScript](https://github.com/microsoft/TypeScript) Запустить отдельно компиляцию всех .ts файлов приложения можно командой

    npm build-ts

Шаблонизатор [PUG](https://github.com/pugjs/pug) Запустить отдельно компиляцию всех .pug файлов приложения можно командой

    npm build-pug

[POSTCSS](https://github.com/postcss/postcss) Запустить отдельно компиляцию всех .css файлов приложения можно командой

    npm postcss

Для сборки проекта используется [Webpack](https://github.com/webpack/webpack)

    npm run build

В проекте используется [ESLint](https://github.com/eslint/eslint) для анализа кода

    npm run eslinter

Критические утилиты проекта покрыты тестами [Mocha](https://github.com/mochajs/mocha)

    npm test

Для проверки кода перед коммитом используется [Husky](https://github.com/typicode/husky) 🐶

    npm run prepare

## Дизайн

-   [Дизайн макета (Yandex.Praktikum)](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

-   [Меню удаления чата и подтверждения удаления](https://www.figma.com/file/qkWXtG2jIVAeKZFghNkCQI/Chat?node-id=0%3A1)

## Как запустить

    npm start
