import { Button, render } from '../../../components/button/button.js';
import Validation from '../../../utils/input_validation/input_validation.js';
import { ProfileChangeAPI } from '../../../api/profile-api.js';
document.querySelector(".profile-sidebar").addEventListener("click", event => {
    event.preventDefault();
    router.back();
});
function profile_change() {
    console.log("test profile_change f<=-================");
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => { data[key] = value; });
    let data_json = JSON.stringify(data);
    input_select.find((el) => {
        if (!(Validation(el))) {
            console.log(`${el.placeholder} not valid`);
        }
    });
    console.log(data_json);
    return data_json;
}
//Validate data
let node_inputs = document.querySelectorAll('.textinput-profile.right');
let input_select = [...node_inputs];
input_select.map(el => {
    let input_span = el.parentElement;
    let error_label = input_span.querySelector('.registration__invalid');
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
                error_label.textContent = `${el.dataset.message}`;
                error_label.style.textAlign = "right";
                error_label.style.width = '350px';
                console.log(error_label === null || error_label === void 0 ? void 0 : error_label.textContent);
                error_label.style.visibility = "visible";
            }
        }
    });
});
//Create button
const button = new Button({
    text: 'Сохранить',
});
render(".app", button);
const button_div = document.querySelector('.app');
const button_div_b = button_div.firstElementChild;
button_div_b.classList.add("button_type_submit");
button_div_b.type = 'submit';
button_div_b.id = 'change_button';
const button_span = button_div_b.firstElementChild;
button_span.classList.add("button-text");
function changeData(data) {
    return { type: 'CHANGEDATA', data: data };
}
document.querySelector("#change_button").addEventListener("click", event => {
    event.preventDefault();
    let data = profile_change();
    let profileChangeApiClient = new ProfileChangeAPI();
    profileChangeApiClient.update(data).then(function (data) {
        console.log(JSON.parse(data.response), 'CHAGE DATA STOREEEE');
        store.update(changeData(JSON.parse(data.response)));
        console.log(store.state, 'STOREEEESTOREEEESTOREEEESTOREEEE');
        //window.location = '/profile';
        router.go("/profile");
    });
});
//# sourceMappingURL=profile_changes.js.map