.registration__block
    .registration__header
    .wraper
h1.header__descr.header-registraton Регистрация
form
include ../../components/registration/form__field/form__field.pug
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
script(type= "module" src="/pages/registration/registration.js")