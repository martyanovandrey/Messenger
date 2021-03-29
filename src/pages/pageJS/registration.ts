import {Button, render} from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import {SignupAPI} from "../../api/signin-api.js";
import {store} from "../../utils/store/store.js"
import {router} from "../../utils/router/router.js";


interface Data {
  [key: string]: string;
}


//Validate data
let node_inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.textinput-control')
let input_select: Array<HTMLInputElement> = [...node_inputs]
let password = <HTMLInputElement>document.querySelector('.textinput input[name="password"]')
password.id = 'password'
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
  text: 'Зарегистрироваться',
});

render(".app", button);

function changeData(data: Data){
  return {type: 'CHANGEDATA', data: data}
}

//Send req


(<HTMLButtonElement>document.querySelector(".button_bottom")).addEventListener("click", event => {

  event.preventDefault()
  console.log('OKAAY');
  let form = (<HTMLFormElement>document.querySelector('form'));
  let formData = new FormData(form);
  let data: Data = {}

  formData.forEach((value: string, key: string) => {data[key] = value});

  input_select.find((el: HTMLInputElement) => {
    if (!(Validation(el))) {
      console.log(`${el.placeholder} not valid`)
    }
  })
  console.log(data)
  sendData(data)
});

function sendData(data: object): void {
  console.log(data, 'YYYYYYYYYYYYYYYYYYY');
  let signunApiClient = new SignupAPI()
  signunApiClient.create(JSON.stringify(data)).then(function(data) {
    console.log('WHAT I GET ');
    console.log(data);
    store.update(changeData(JSON.parse(data.response)))

  }).then(() => router.go("/chat"));
}