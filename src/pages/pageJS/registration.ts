import { Button, render } from '../../components/button/button';
import Validation from '../../utils/input_validation/input_validation';
import { SignupAPI } from '../../api/signin-api';
import { store } from '../../utils/store/store';
import { router } from '../../utils/router/router';

interface Data {
    [key: string]: string;
}

// Validate data
const node_inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.textinput-control');
const input_select: Array<HTMLInputElement> = [...node_inputs];
const password = <HTMLInputElement>document.querySelector('.textinput input[name="password"]');
password.id = 'password';
input_select.map((el: HTMLInputElement) => {
    const input_span = <HTMLSpanElement>el.parentElement;
    const error_label = <HTMLLabelElement>input_span.querySelector('.registration__invalid');

    el.addEventListener('focus', () => {
        el.style.background = '';
    });
    el.addEventListener('blur', () => {
        if (Validation(el)) {
            el.style.background = '';
        } else if (el.value === '') {
            el.style.background = '';
        } else {
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

function changeData(data: Data) {
    return { type: 'CHANGEDATA', data };
}

// Send req

(<HTMLButtonElement>document.querySelector('.button_bottom')).addEventListener('click', (event) => {
    event.preventDefault();
    console.log('OKAAY');
    const form = (<HTMLFormElement>document.querySelector('form'));
    const formData = new FormData(form);
    const data: Data = {};

    formData.forEach((value: string, key: string) => { data[key] = value; });

    input_select.find((el: HTMLInputElement) => {
        if (!(Validation(el))) {
            console.log(`${el.placeholder} not valid`);
        }
    });
    console.log(data);
    sendData(data);
});

function sendData(data: object): void {
    console.log(data, 'YYYYYYYYYYYYYYYYYYY');
    const signunApiClient = new SignupAPI();
    signunApiClient.create(JSON.stringify(data)).then((data) => {
        console.log('WHAT I GET ');
        console.log(data);
        store.update(changeData(JSON.parse(data.response)));
        return JSON.parse(String(data.status));
    }).then((data) => {
        console.log(data, 'statusss');
        if (data >= 400) {
            console.log(data.response, 'error');
        } else {
            router.go('/chat');
        }
    });
}
