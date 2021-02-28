import { Button, render } from '../../../components/event-bus/index.js';
import Validation from '../../../components/input_validation/input_validation.js';
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector(".button_type_submit").addEventListener("click", login);
});
function login() {
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => { data[key] = value; });
    let json = JSON.stringify(data);
    console.log(json);
}
//Validate data
let input_select = [...document.querySelectorAll('.textinput-control')];
input_select.map(el => {
    let error_label = el.parentElement.querySelector('.registration__invalid');
    el.addEventListener("focus", () => {
        el.style.background = "";
    });
    el.addEventListener("blur", () => {
        if (Validation(el)) {
            el.style.background = "";
        }
        else {
            if (el.value === "") {
                el.style.background = "";
            }
            else {
                el.style.background = "#ffe9ec";
                error_label === null || error_label === void 0 ? void 0 : error_label.textContent = el.dataset.message;
                error_label === null || error_label === void 0 ? void 0 : error_label.visibility = "visible";
            }
        }
    });
});
//Create button
const button = new Button({
    text: 'Авторизоваться',
});
render(".app", button);
const button_div = document.querySelector('.app');
const button_div_b = button_div.firstElementChild;
button_div_b.classList.add("button_type_submit");
button_div_b.type = 'submit';
button_div_b.firstElementChild.classList.add("button-text");
//# sourceMappingURL=index.js.map