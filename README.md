# [Messenger](https://optimistic-bhaskara-25a05f.netlify.app/pages/login/index.html)
- [Вход](https://optimistic-bhaskara-25a05f.netlify.app/pages/login/index.html)
- [Регистрация](https://optimistic-bhaskara-25a05f.netlify.app/pages/registration/registration.html)
- [Чат](https://optimistic-bhaskara-25a05f.netlify.app/pages/chat/chat/chat.html)
    - [Открытый диалог](https://optimistic-bhaskara-25a05f.netlify.app/pages/chat/chat-dialog/chat-dialog.html)
    - [Поиск](https://optimistic-bhaskara-25a05f.netlify.app/pages/chat/chat-dialog_search/chat-dialog_search.html)
    - [Меню](https://optimistic-bhaskara-25a05f.netlify.app/pages/chat/chat-dialog_pop-up/chat-dialog_pop-up.html)
    - [Добавление нового пользователя в чат](https://optimistic-bhaskara-25a05f.netlify.app/pages/chat/chat-dialog_overlay/chat-dialog_overlay.html)
- [Профиль](https://optimistic-bhaskara-25a05f.netlify.app/pages/profile/profile/profile.html)
    - [Изменение профиля](https://optimistic-bhaskara-25a05f.netlify.app/pages/profile/profile_changes/profile_changes.html)
    - [Изменение пароля](https://optimistic-bhaskara-25a05f.netlify.app/pages/profile/profile_change_psw/profile_change_psw.html)
    - [Изменение изображения](https://optimistic-bhaskara-25a05f.netlify.app/pages/profile/profile_change_image/profile_change_image.html)
- Ошибки
    - [404](https://optimistic-bhaskara-25a05f.netlify.app/pages/errors/404/404.html)
    - [500](https://optimistic-bhaskara-25a05f.netlify.app/pages/errors/500/500.html)
## Описание

Messenger это веб-приложения для обмена сообщениями.

## Использованные инструменты и функционал


Папка src содержит исходные файлы приложения. В проекте используется:

[TypeScript](https://github.com/microsoft/TypeScript) Запустить отдельно компиляцию всех .ts файлов приложения можно командой 
    
    npm build-ts

Шаблонизатор [PUG](https://github.com/pugjs/pug) Запустить отдельно компиляцию всех .pug файлов приложения можно командой 
    
    npm build-pug


В проекте реализован единый модуль создания блоков и валидации форм. 

## Дизайн

- [Дизайн макета (Yandex.Praktikum)](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

- [Меню удаления чата и подтверждения удаления](https://www.figma.com/file/qkWXtG2jIVAeKZFghNkCQI/Chat?node-id=0%3A1)

## Как запустить

    npm start