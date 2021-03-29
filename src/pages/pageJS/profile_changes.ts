import {Button, render} from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import {ProfileChangeAPI} from '../../api/profile-api.js'
import {store} from "../../utils/store/store.js"
import {router} from "../../utils/router/router.js";

interface Data {
  [key: string]: string;
}

(<HTMLButtonElement>document.querySelector(".profile-sidebar")).addEventListener("click", event => {
  event.preventDefault()
  router.back();
});


function profile_change():object {
  let form = (<HTMLFormElement>document.querySelector('form'));
  let formData = new FormData(form);
  let data: Data = {}
  
  formData.forEach((value: string, key: string) => {data[key] = value});

  input_select.find((el: HTMLInputElement) => {
    if (!(Validation(el))) {
      console.log(`${el.placeholder} not valid`)
    }
  })
  return data
}

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

//Create button
const button = new Button({
  text: 'Сохранить',
});

render(".app", button);

function changeData(data: Data){
  return {type: 'CHANGEDATA', data: data}
}

(<HTMLButtonElement>document.querySelector("#change_button")).addEventListener("click", event => {
    event.preventDefault()
    let data = profile_change()
    let profileChangeApiClient = new ProfileChangeAPI()
    profileChangeApiClient.update(JSON.stringify(data)).then(function(data) {
      console.log(data.response, 'CHAGE DATA STOREEEE');
      store.update(changeData(JSON.parse(data.response)))
      console.log(store.state, 'STOREEEESTOREEEESTOREEEESTOREEEE');

    }).then(() => router.go("/profile"))
})

