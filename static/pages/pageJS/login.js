import { Button, render } from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import { SigninAPI } from '../../api/signin-api.js';
import { router } from '../../utils/router/router.js';
document.querySelector('.not-registered-text').addEventListener('click', (event) => {
    event.preventDefault();
    router.go('/signup');
});
// Validate data
const node_inputs = document.querySelectorAll('.textinput-control');
const input_select = [...node_inputs];
input_select.map((el) => {
    const input_span = el.parentElement;
    const error_label = input_span.querySelector('.registration__invalid');
    el.addEventListener('focus', () => {
        el.style.background = '';
    });
    el.addEventListener('blur', () => {
        if (Validation(el)) {
            el.style.background = '';
        }
        else if (el.value === '') {
            el.style.background = '';
        }
        else {
            el.style.background = '#ffe9ec';
            error_label.textContent = `${el.dataset.message}`;
            error_label.style.visibility = 'visible';
        }
    });
});
// Create button
const button = new Button({
    text: 'Авторизоваться',
});
render('.app', button);
document.querySelector('.button_type_submit').addEventListener('click', (event) => {
    console.log('bbbbb');
    event.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });
    input_select.find((el) => {
        if (!(Validation(el))) {
            console.log(`${el.placeholder} not valid`);
        }
    });
    const signinApiClient = new SigninAPI();
    signinApiClient.create(JSON.stringify(data)).then((data) => {
        if (data.status === 200 || data.response === '{"reason":"User already in system"}') {
            router.go('/chat');
        }
        else {
            console.log(typeof data.response);
        }
    });
});
//# sourceMappingURL=login.js.map