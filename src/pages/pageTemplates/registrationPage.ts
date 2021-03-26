export const registrationHTML = `
.registration__block
    .registration__header
        .wraper
            h1.header__descr.header-registraton Регистрация
            form
                mixin form__field(typeValid, placeholder, name, labelFor, label)
                    .form__field
                        span.textinput
                            if(name)
                                input.textinput-control(type= typeValid placeholder= placeholder name= name)
                                label.registration__label(for= labelFor)= label    
                                label.registration__invalid
                            else
                                input.textinput-control(type= typeValid placeholder= placeholder)
                                label.registration__label(for= labelFor)= label
                                label.registration__invalid
                +form__field('email', 'Почта', 'email', 'email', 'Почта')
                +form__field('text', 'Логин', 'login', 'login', 'Логин')
                +form__field('text', 'Имя', 'first_name', 'name', 'Имя')
                +form__field('text', 'Фамилия', 'second_name', 'lastname', 'Фамилия')
                +form__field('tel', 'Телефон', 'phone', 'tel', 'Телефон')
                +form__field('password', 'Пароль', 'password', 'password', 'Пароль')
                +form__field('password', 'Пароль (еще раз)', false, 'Пароль (еще раз)', 'Пароль (еще раз)')
                .button_bottom
                    //load button module
                    .app
                .not-registered.registration_page
                    a.not-registered-text(href='/') Войти
`
