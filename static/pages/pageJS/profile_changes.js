import { Button, render } from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import { ProfileChangeAPI } from '../../api/profile-api.js';
import { store } from '../../utils/store/store.js';
import { router } from '../../utils/router/router.js';
document.querySelector('.profile-sidebar').addEventListener('click', (event) => {
    event.preventDefault();
    router.back();
});
function profile_change() {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });
    input_select.find((el) => {
        if (!(Validation(el))) {
            console.log(`${el.placeholder} not valid`);
        }
    });
    return data;
}
// Validate data
const node_inputs = document.querySelectorAll('.textinput-profile.right');
let input_select = [...node_inputs];
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
            error_label.style.textAlign = 'right';
            error_label.style.width = '350px';
            console.log(error_label === null || error_label === void 0 ? void 0 : error_label.textContent);
            error_label.style.visibility = 'visible';
        }
    });
});
// Create button
const button = new Button({
    text: 'Сохранить',
});
render('.app', button);
function changeData(data) {
    return { type: 'CHANGEDATA', data };
}
document.querySelector('#change_button').addEventListener('click', (event) => {
    event.preventDefault();
    const data = profile_change();
    const profileChangeApiClient = new ProfileChangeAPI();
    profileChangeApiClient.update(JSON.stringify(data)).then((data) => {
        console.log(data.response, 'CHAGE DATA STOREEEE');
        store.update(changeData(JSON.parse(data.response)));
        console.log(store.state, 'STOREEEESTOREEEESTOREEEESTOREEEE');
    }).then(() => router.go('/profile'));
});
//# sourceMappingURL=profile_changes.js.map