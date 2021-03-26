import {Button, render} from '../../../components/button/button.js';
import { ProfileAPI, ProfileChangeAPI, ProfileChangePswPageAPI, ProfileChangePswAPI } from '../../../api/profile-api.js'
import EventBus from "../../../utils/event-bus/event-bus.js";
import { Router, Block} from "../../../utils/router/router.js";
import Validation from '../../../utils/input_validation/input_validation.js';
import {users} from '../../pages/storage.js'


document.addEventListener('DOMContentLoaded', function () {
    (<HTMLButtonElement>document.querySelector("#change_psw")).addEventListener("click", profile_change_psw_page);
    (<HTMLButtonElement>document.querySelector(".profile-image")).addEventListener("click", profile_change_image);
});

(<HTMLButtonElement>document.querySelector(".profile-sidebar")).addEventListener("click", event => {
    event.preventDefault()
    router.back();
});
(<HTMLButtonElement>document.querySelector("#change_data")).addEventListener("click", event => {
    event.preventDefault()
    router.go("/profile_changes");
});
(<HTMLButtonElement>document.querySelector("#change_psw")).addEventListener("click", event => {
    event.preventDefault()
    router.go("/profile_change_psw");
});
(<HTMLButtonElement>document.querySelector("#logout")).addEventListener("click", event => {
    event.preventDefault()
    router.go("/");
});


/*function profile_change_request():void {
    let data = {data: 'change_data'}
    let profileApiClient = new ProfileAPI()
    profileApiClient.update(JSON.stringify(data)).then(function(data) {

    });
}*/

function profile_change():void {
    let form = (<HTMLFormElement>document.querySelector('form'));
    let formData = new FormData(form);
    interface Data {
        [key: string]: string;
    }
    let data: Data = {}

    formData.forEach((value: string, key: string) => {data[key] = value});
    let data_json = JSON.stringify(data);

    input_select.find((el: HTMLInputElement) => {
        if (!(Validation(el))) {
            console.log(`${el.placeholder} not valid`)
        }
    })
    return data_json
}

// function profile_change_psw():void {
//     let data = profile_change()
//     let profileChangeApiClient = new ProfileChangePswAPI()
//     profileChangeApiClient.update(data).then(function(data) {
//         console.log(data);
//     }
// }

//25/03/ 18-00
// let eventButton = new EventBus();
// eventButton.on('changeProfile', renderButton)
//
// let listenButton = () => {
//     document.querySelector("#change_button").addEventListener("click", profile_change_data);
// }
// eventButton.on('changeProfile', listenButton)
//
// function renderButton(){
//     //Create button
//     const button = new Button({
//         text: 'Сохранить',
//     });
//
//     render(".app", button);
//     const button_div = document.querySelector('.app') as HTMLDivElement;
//     const button_div_b = button_div.firstElementChild as HTMLButtonElement;
//     button_div_b.classList.add("button_type_submit");
//     button_div_b.type = 'submit';
//     button_div_b.id = 'change_button'
//     const button_span = button_div_b.firstElementChild as HTMLSpanElement;
//     button_span.classList.add("button-text")
// }

//Validate data
let node_inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.textinput-profile.right')
let input_select: Array<HTMLInputElement> = [...node_inputs]

input_select.map(el => {
    let input_span = <HTMLSpanElement>el.parentElement
    let error_label = <HTMLLabelElement>input_span.querySelector('.registration__invalid')
    el.addEventListener("focus", () => {
        el.style.background = "";

    });
    el.addEventListener("blur", () => {
        if(Validation(el)){
            el.style.background = "";
        } else {
            if(el.value === ""){
                el.style.background = "";
            } else {
                el.style.background = "#ffe9ec";
                error_label.textContent = `${el.dataset.message}`;
                error_label.style.textAlign = "right"
                error_label.style.width = '350px'
                console.log(error_label?.textContent)
                error_label.style.visibility = "visible"
            }
        }
    });
})

