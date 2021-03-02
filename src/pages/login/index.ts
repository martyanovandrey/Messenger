import {Button, render} from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';

document.addEventListener('DOMContentLoaded', function () {
  (<HTMLButtonElement>document.querySelector(".button_type_submit")).addEventListener("click", login);
});

function login():void {
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
  console.log(data_json)
  
}

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
const button_div = document.querySelector('.app') as HTMLDivElement;
const button_div_b = button_div.firstElementChild as HTMLButtonElement;
button_div_b.classList.add("button_type_submit");
button_div_b.type = 'submit';
const button_span = button_div_b.firstElementChild as HTMLSpanElement;
button_span.classList.add("button-text")
