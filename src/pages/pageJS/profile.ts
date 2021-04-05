import Validation from '../../utils/input_validation/input_validation.js';
import { router } from '../../utils/router/router.js';
import { LogoutAPI } from '../../api/signin-api.js';

(<HTMLButtonElement>document.querySelector('.profile-sidebar')).addEventListener('click', (event) => {
  event.preventDefault();
  router.go('/chat');
});
(<HTMLButtonElement>document.querySelector('#change_data')).addEventListener('click', (event) => {
  event.preventDefault();
  router.go('/profile_changes');
});
(<HTMLButtonElement>document.querySelector('#change_psw')).addEventListener('click', (event) => {
  event.preventDefault();
  router.go('/profile_change_psw');
});
(<HTMLButtonElement>document.querySelector('#logout')).addEventListener('click', (event) => {
  event.preventDefault();
  const logoutApiClient = new LogoutAPI();
  logoutApiClient.create(JSON.stringify()).then(() => {
    router.go('/');
  });
});

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
