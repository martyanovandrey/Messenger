export const profileChangePswHTML = `
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
          .profile-image
            svg(width='130' height='130' viewBox='0 0 130 130' fill='none' xmlns='http://www.w3.org/2000/svg')
              circle(cx='65' cy='65' r='65' fill='#EFEFEF')
              path(fill-rule='evenodd' clip-rule='evenodd' d='M81 47H49C47.8954 47 47 47.8954 47 49V70.2667L59.6547 67.3139C60.5486 67.1053 61.4635 67 62.3814 67H67.6186C68.5365 67 69.4514 67.1053 70.3453 67.3139L83 70.2667V49C83 47.8954 82.1046 47 81 47ZM49 45C46.7909 45 45 46.7909 45 49V81C45 83.2091 46.7909 85 49 85H81C83.2091 85 85 83.2091 85 81V49C85 46.7909 83.2091 45 81 45H49ZM55.9091 59.5455C57.9174 59.5455 59.5455 57.9174 59.5455 55.9091C59.5455 53.9008 57.9174 52.2727 55.9091 52.2727C53.9008 52.2727 52.2728 53.9008 52.2728 55.9091C52.2728 57.9174 53.9008 59.5455 55.9091 59.5455Z' fill='#CDCDCD')
          form
            .form__field.form-space-between
              span.form__field-name
                | Старый пароль
              span
                input.textinput-profile.right(name='oldPassword' type='password' placeholder= oldPassword)
                label.registration__invalid
            .form__field.form-space-between
              span.form__field-name
                | Новый пароль
              span.textinput-profile
                input.textinput-profile.right(id='password' name='newPassword' type='password')
                label.registration__invalid
            .form__field.form-space-between
              span.form__field-name
                | Повторите новый пароль
              span.textinput-profile
                input.textinput-profile.right(type='password')
                label.registration__invalid
            .button_profile
              .app`