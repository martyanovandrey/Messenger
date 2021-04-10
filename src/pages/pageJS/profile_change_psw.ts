import { Button, render } from '../../components/button/button';
import Validation from '../../utils/input_validation/input_validation';
import { ProfileChangePswAPI } from '../../api/profile-api';
import { store } from '../../utils/store/store';
import { router } from '../../utils/router/router';

interface Data {
    [key: string]: string;
}

(<HTMLButtonElement>document.querySelector('.profile-sidebar')).addEventListener('click', (event) => {
    event.preventDefault();
    router.go('/profile');
});

// Validate data
const node_inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.textinput-profile.right');
const input_select: Array<HTMLInputElement> = [...node_inputs];
input_select.shift();

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
            // el.style.background = "";
        } else {
            el.style.background = '#ffe9ec';
            error_label.textContent = `${el.dataset.message}`;
            error_label.style.textAlign = 'right';
            error_label.style.width = '330px';
            console.log(error_label?.textContent);
            error_label.style.visibility = 'visible';
        }
    });
});

// Create button
const button = new Button({
    text: 'Сохранить',
});

render('.app', button);

function changeData(data: Record<string, any>) {
    return { type: 'CHANGEDATA', data };
}

(<HTMLButtonElement>document.querySelector('.button_type_submit')).addEventListener('click', (event) => {
    event.preventDefault();
    console.log('gogo');
    const form = (<HTMLFormElement>document.querySelector('form'));
    const formData = new FormData(form);

    const data: Data = {};

    formData.forEach((value: string, key: string) => { data[key] = value; });

    input_select.find((el: HTMLInputElement) => {
        if (!(Validation(el))) {
            console.log(`${el.placeholder} not valid`);
        }
    });
    const profileChangeApiClient = new ProfileChangePswAPI();
    profileChangeApiClient.update(JSON.stringify(data)).then((data) => {
        store.update(changeData(JSON.parse(data.response)));
        router.go('/profile');
    });
});
