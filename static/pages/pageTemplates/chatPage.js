export const chatHTML = `
.page-wrap
    .page-sidebar#chat
        .search
            .search__profile-wrap
                .flex_center(data-action='createNewChat' style='margin-right: auto')
                    svg(width='12' height='12' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg')
                        circle(cx='11' cy='11' r='10.25' stroke='#3369F3' stroke-width='1.5')
                        line(x1='10.9999' y1='5.5' x2='10.9999' y2='16.5' stroke='#3369F3' stroke-width='1.5')
                        line(x1='5.49988' y1='11' x2='16.4999' y2='11' stroke='#3369F3' stroke-width='1.5')
                    span.search__profile(data-action='createNewChat')#createNewChat
                        | Создать чат

                a.search__profile(href='/profile')#profile-link Профиль >
            .search__bar
                svg(width='13' height='14' viewBox='0 0 13 14' fill='none' xmlns='http://www.w3.org/2000/svg')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M7.59239 8.41379C6.16047 9.84571 3.83886 9.84571 2.40694 8.41379C0.975017 6.98187 0.975017 4.66027 2.40694 3.22834C3.83886 1.79642 6.16047 1.79642 7.59239 3.22834C9.02431 4.66027 9.02431 6.98187 7.59239 8.41379ZM8.03277 9.79675C6.07255 11.2961 3.25696 11.1494 1.46413 9.3566C-0.488491 7.40398 -0.488491 4.23816 1.46413 2.28553C3.41675 0.332912 6.58258 0.332912 8.5352 2.28553C10.3279 4.07828 10.4747 6.8937 8.97555 8.85391L12.5423 12.4206L11.5994 13.3634L8.03277 9.79675Z' fill='#999999')
                input.search__input(type='search' placeholder='Поиск')
        .page_chat_list
    .page-dialog
        .dialog-text.dialog-mask
            | Выберите чат чтобы отправить сообщение
    .page-overlay(style="display: none")
        .page-overlay__wrap
            .page-dialog__pop-up.pop-up-width
                h1.header__descr.header-overlay Добавить пользователя
                form
                    .form_wrap
                        .form__field.registration-field
                            span.textinput
                                input.textinput-control(type='email' placeholder='Логин')
                                label.registration__label(for='name') Логин
                                label.registration__invalid Неверный логин
                        .button_overlay
                            .app
`;
//# sourceMappingURL=chatPage.js.map