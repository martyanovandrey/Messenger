export const loginHTML = `
.registration__block
    .registration__header.auth
        h1.header__descr.header-wrap Вход
        form
            div
                .form__field.form-auth
                    span.textinput.input-auth
                        input.textinput-control(type='text' name='login' placeholder='Логин')
                        label.registration__label(for='name') Логин
                        label.registration__invalid
                .form__field.form-auth
                    span.textinput.input-auth
                        input.textinput-control(type='password' name='password' placeholder='Пароль')
                        label.registration__label(for='password') Пароль
                        label.registration__invalid
            .button_bottom.button-auth
                .app
        .not-registered
            a.not-registered-text(href='/signup') Нет аккаунта?
script(type= "module" src="/pages/login/index.js")
`;
//# sourceMappingURL=loginPage.js.map