import {Button, render} from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import {HTTPTransport} from '../../utils/xhr/xhr.js'

//Catch data from fields
document.addEventListener('DOMContentLoaded', function () {
  (<HTMLButtonElement>document.querySelector(".button_bottom")).addEventListener("click", registration);
});  
function registration() {
  let form = (<HTMLFormElement>document.querySelector('form'));
  let formData = new FormData(form);
  interface Data {
    [key: string]: string;
  }
  let data: Data = {}
  
  formData.forEach((value: string, key: string) => {data[key] = value});
  let data_json:string = JSON.stringify(data);

  input_select.find((el: HTMLInputElement) => {
    if (!(Validation(el))) {
      console.log(`${el.placeholder} not valid`)
    }
  })
  console.log(data)
  sendData(data)
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
const button_div = document.querySelector('.app') as HTMLDivElement;
const button_div_b = button_div.firstElementChild as HTMLButtonElement;
button_div_b.classList.add("button_type_submit");
button_div_b.type = 'submit';
const button_span = button_div_b.firstElementChild as HTMLSpanElement;
button_span.classList.add("button-text")

//Send req
function sendData(data) {
  const xhr = new HTTPTransport();
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  xhr.request('/auth/api/v1/signup', options).then(console.log(data))
}