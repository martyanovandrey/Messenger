import { Button, render } from '../../components/button/button';
import Validation from '../../utils/input_validation/input_validation';
import { ProfileChangeAPI } from '../../api/profile-api';
import { store } from '../../utils/store/store';
import { router } from '../../utils/router/router';

interface Data {
    [key: string]: string;
}

document.querySelector('.profile-sidebar')?.addEventListener('click', (event) => {
    event.preventDefault();
    router.back();
});

function profile_change():object {
    const form = (<HTMLFormElement>document.querySelector('form'));
    const formData = new FormData(form);
    const data: Data = {};

    formData.forEach((value: string, key: string) => { data[key] = value; });

    input_select.find((el: HTMLInputElement) => {
        if (!(Validation(el))) {
            console.log(`${el.placeholder} not valid`);
        }
    });
    return data;
}

// Validate data
const node_inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.textinput-profile.right');
const input_select: Array<HTMLInputElement> = [...node_inputs];

input_select.map((el) => {
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
            error_label.style.textAlign = 'right';
            error_label.style.width = '350px';
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

function changeData(data: Data) {
    return { type: 'CHANGEDATA', data };
}

document.querySelector('#change_button')?.addEventListener('click', (event) => {
    event.preventDefault();
    const data = profile_change();
    const profileChangeApiClient = new ProfileChangeAPI();
    profileChangeApiClient.update(JSON.stringify(data)).then((data) => {
        console.log(data.response, 'CHAGE DATA STOREEEE');
        store.update(changeData(JSON.parse(data.response)));
        console.log(store.state, 'STOREEEESTOREEEESTOREEEESTOREEEE');
    }).then(() => router.go('/profile'));
});
