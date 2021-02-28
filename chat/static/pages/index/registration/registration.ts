import {Button, render} from '../../../components/event-bus/index.js';
import Validation from '../../../components/input_validation/input_validation.js';

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
  let json:string = JSON.stringify(data);

  console.log(json)
}


//Validate data
let input_select: Array<Element> = [...document.querySelectorAll('.textinput-control')]
let password = document.querySelector('.textinput input[name="password"]')
password?.id = 'password'
input_select.map(el => {
  let error_label = el.parentElement.querySelector('.registration__invalid')
  
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
        error_label?.textContent = el.dataset.message
        error_label?.visibility = "visible"
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
button_div_b.firstElementChild.classList.add("button-text");