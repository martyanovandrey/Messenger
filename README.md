Привет, TS ошибки все поправил.
С сервером я не так понял задание, думал надо сделать свой и самим валидировать, давать куки и тд., пытался это реализовать. На нетлифай запустить свой сервер как я понял так просто не получится, поэтому мой вариант не подходит, переделаю с запросами к яндексовскому на следующем спринте.
Спасибо за ревью !


# [Messenger](https://optimistic-bhaskara-25a05f.netlify.app/)
- [Вход](https://optimistic-bhaskara-25a05f.netlify.app/)
- [Регистрация](https://optimistic-bhaskara-25a05f.netlify.app/signup)
- [Чат](https://optimistic-bhaskara-25a05f.netlify.app/pages/chat)
- [Профиль](https://optimistic-bhaskara-25a05f.netlify.app/pages/profile/profile/profile.html)
    - [Изменение профиля](https://optimistic-bhaskara-25a05f.netlify.app/pages/profile_changes)
    - [Изменение пароля](https://optimistic-bhaskara-25a05f.netlify.app/pages/profile/profile_change_psw)

## Описание

Messenger это веб-приложения для обмена сообщениями.

## Использованные инструменты и функционал


Папка src содержит исходные файлы приложения. В проекте используется:

[TypeScript](https://github.com/microsoft/TypeScript) Запустить отдельно компиляцию всех .ts файлов приложения можно командой 
    
    npm build-ts

Шаблонизатор [PUG](https://github.com/pugjs/pug) Запустить отдельно компиляцию всех .pug файлов приложения можно командой 
    
    npm build-pug

[POSTCSS](https://github.com/postcss/postcss) Запустить отдельно компиляцию всех .css файлов приложения можно командой

    npm postcss


В проекте реализован единый модуль создания блоков и валидации форм. 

## Дизайн

- [Дизайн макета (Yandex.Praktikum)](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

- [Меню удаления чата и подтверждения удаления](https://www.figma.com/file/qkWXtG2jIVAeKZFghNkCQI/Chat?node-id=0%3A1)

## Как запустить

    npm start