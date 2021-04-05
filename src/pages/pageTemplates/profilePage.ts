export const profileHTML = `
block variables
    -var validation = 'validation'
    -var no_border = 'no_border'
    
.wrap
    a(href='/chat')
        .profile-sidebar
            .profile-sidebar__arrow
                button.profile-button
                    svg(width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg')
                        circle(cx='14' cy='14' r='14' transform='rotate(-180 14 14)' fill='#3369F3')
                        rect(x='20' y='14.8' width='11' height='1.6' transform='rotate(-180 20 14.8)' fill='white')
                        path(d='M13 19L9 14L13 9' stroke='white' stroke-width='1.6')
    .registration__block
        .wraper
            a.profile-image.link(href='/profile')
                svg(width='130' height='130' viewBox='0 0 130 130' fill='none' xmlns='http://www.w3.org/2000/svg')
                    circle(cx='65' cy='65' r='65' fill='#EFEFEF')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M81 47H49C47.8954 47 47 47.8954 47 49V70.2667L59.6547 67.3139C60.5486 67.1053 61.4635 67 62.3814 67H67.6186C68.5365 67 69.4514 67.1053 70.3453 67.3139L83 70.2667V49C83 47.8954 82.1046 47 81 47ZM49 45C46.7909 45 45 46.7909 45 49V81C45 83.2091 46.7909 85 49 85H81C83.2091 85 85 83.2091 85 81V49C85 46.7909 83.2091 45 81 45H49ZM55.9091 59.5455C57.9174 59.5455 59.5455 57.9174 59.5455 55.9091C59.5455 53.9008 57.9174 52.2727 55.9091 52.2727C53.9008 52.2727 52.2728 53.9008 52.2728 55.9091C52.2728 57.9174 53.9008 59.5455 55.9091 59.5455Z' fill='#CDCDCD')
            form
                mixin form(field_name, field_placeholder, style)
                    if (style == no_border)
                        .form__field.form-space-between(style='border: none;')
                            +form_input(field_name, field_placeholder)
                    else
                        .form__field.form-space-between
                            +form_input(field_name, field_placeholder)
                
                mixin form_input(field_name, field_placeholder)
                    span.form__field-name= field_name
                    span.textinput-profile
                        span.form__field-name.right= field_placeholder
                +form('Почта', email, validation)
                +form('Логин',login)
                +form('Имя',first_name)
                +form('Фамилия',second_name)
                +form('Имя в чате',display_name)
                +form('Телефон',phone, no_border)
            .profile-changes
            .form__field.form-space-between#change_data
                a.link(href='/')
                    | Изменить данные
            .form__field.form-space-between#change_psw
                a.link(href='/')
                    | Изменить пароль
            .form__field.form-space-between#logout
                a.link(href='/' style='color: #FF0000;')
                    | Выйти
`;
