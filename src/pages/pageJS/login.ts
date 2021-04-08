import { Button, render } from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import { SigninAPI } from '../../api/signin-api.js';
import { router } from '../../utils/router/router.js';

interface Data {
  [key: string]: string;
}

(<HTMLButtonElement>document.querySelector('.not-registered-text')).addEventListener('click', (event) => {
  event.preventDefault();
  router.go('/signup');
});

// Validate data
const node_inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.textinput-control');
const input_select: Array<HTMLInputElement> = [...node_inputs];

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
  text: 'Авторизоваться'
});

render('.app', button);
//console.log(button)

(<HTMLButtonElement>document.querySelector('.button_type_submit')).addEventListener('click', (event) => {
  console.log('bbbbb');
  event.preventDefault();
  const form = (<HTMLFormElement>document.querySelector('form'));
  const formData = new FormData(form);
  const data: Data = {};

  formData.forEach((value: string, key: string) => { data[key] = value; });
  input_select.find((el: HTMLInputElement) => {
    if (!(Validation(el))) {
      console.log(`${el.placeholder} not valid`);
    }
  });

  const signinApiClient = new SigninAPI();
  signinApiClient.create(JSON.stringify(data)).then((data) => {
    if (data.status === 200 || data.response === '{"reason":"User already in system"}') {
      router.go('/chat');
    } else {
      console.log(typeof data.response);
    }
  });
});
