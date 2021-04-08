import { Button, render } from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import { SignupAPI } from '../../api/signin-api.js';
import { store } from '../../utils/store/store.js';
import { router } from '../../utils/router/router.js';
// Validate data
const node_inputs = document.querySelectorAll('.textinput-control');
const input_select = [...node_inputs];
const password = document.querySelector('.textinput input[name="password"]');
password.id = 'password';
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
    text: 'Зарегистрироваться',
});
render('.app', button);
function changeData(data) {
    return { type: 'CHANGEDATA', data };
}
// Send req
document.querySelector('.button_bottom').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('OKAAY');
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });
    input_select.find((el) => {
        if (!(Validation(el))) {
            console.log(`${el.placeholder} not valid`);
        }
    });
    console.log(data);
    sendData(data);
});
function sendData(data) {
    console.log(data, 'YYYYYYYYYYYYYYYYYYY');
    const signunApiClient = new SignupAPI();
    signunApiClient.create(JSON.stringify(data)).then((data) => {
        console.log('WHAT I GET ');
        console.log(data);
        store.update(changeData(JSON.parse(data.response)));
        return JSON.parse(data.status);
    }).then((data) => {
        console.log(data, 'statusss');
        if (data >= 400) {
            console.log(data.response, 'error');
        }
        else {
            router.go('/chat');
        }
    });
}
//# sourceMappingURL=registration.js.map