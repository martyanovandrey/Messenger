import {Button, render} from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import { SigninAPI } from '../../api/signin-api.js'
import {router} from "../../utils/router/router.js";

interface Data {
  [key: string]: string;
}

(<HTMLButtonElement>document.querySelector(".not-registered-text")).addEventListener("click", event => {
  event.preventDefault()
  router.go("/signup");
});

//Validate data
let node_inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.textinput-control')
let input_select: Array<HTMLInputElement> = [...node_inputs]

input_select.map((el: HTMLInputElement) => {
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
        error_label.style.visibility = "visible"
      }
    }

  });
})

//Create button
const button = new Button({
  text: 'Авторизоваться',
});

render(".app", button);

(<HTMLButtonElement>document.querySelector(".button_type_submit")).addEventListener("click", function login (event) {
  console.log('bbbbb');
  event.preventDefault();
  let form = (<HTMLFormElement>document.querySelector('form'));
  let formData = new FormData(form);
  let data: Data = {}

  formData.forEach((value: string, key: string) => {data[key] = value});
  input_select.find((el: HTMLInputElement) => {
    if (!(Validation(el))) {
      console.log(`${el.placeholder} not valid`)
    }
  })

  let signinApiClient = new SigninAPI()
  signinApiClient.create(JSON.stringify(data)).then(function(data) {
    console.log('WHAT I GET ');
    console.log(data);
    router.go("/chat");
  });
});
