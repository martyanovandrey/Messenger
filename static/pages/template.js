const pug = require('pug');
let template = `
.registration__block
    .registration__header
    .wraper
h1.header__descr.header-registraton Регистрация
form
    .button_bottom
    //load button module
    .app
    .not-registered.registration_page
a.not-registered-text(href='/') Войти
script(type= "module" src="/pages/registration/registration.js")
`;
const compiledFunction = pug.compile(template);
let html = compiledFunction();
console.log(html);
export { html };
//# sourceMappingURL=template.js.map