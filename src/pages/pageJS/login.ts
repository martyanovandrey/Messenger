import {Button, render} from '../../components/button/button.js';
import Validation from '../../utils/input_validation/input_validation.js';
import { SigninPageAPI, SignupPageAPI } from '../../api/pages.api.js'
import { SigninAPI } from '../../api/signin-api.js'
import {Block, Router} from "../../utils/router/router.js";
import EventBus from "../../../static/utils/event-bus/event-bus.js";
//import('static/pages/index.js')

/*document.addEventListener('DOMContentLoaded', function () {
});*/
//(<HTMLButtonElement>document.querySelector(".button_type_submit")).addEventListener("click", login(event));
// (<HTMLButtonElement>document.querySelector(".not-registered-text")).addEventListener("click", function signupRedirect(event){
//   event.preventDefault();
//   console.log('wtf go');
//   router.go('/signup')
// });
document.addEventListener('DOMContentLoaded', function () {

});

function signupRedirect(event) {

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
button_span.classList.add("button-text");

console.log(button, '<-----------------!!_----');

(<HTMLButtonElement>document.querySelector(".button_type_submit")).addEventListener("click", function login (event) {
  console.log('bbbbb');
  event.preventDefault();
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

  let signinApiClient = new SigninAPI()
  signinApiClient.create(JSON.stringify(data)).then(function(data) {
    console.log('WHAT I GET ');
    console.log(data);
    window.location = data.responseURL;
  });
});


function login(event):void {

}

/*TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER TEST ROUTER */


/*
class loginPage extends Block {
  getContent(){
      let signinApiClient = new SigninPageAPI();
      //console.log(signinApiClient.create())
    console.log("ok im here all good LOGIN");
      return signinApiClient.create().then(res => {
        console.log(res);
        return res.response
      }));
  }
}

class registationPage extends Block {
  getContent(){
    let signupApiClient = new SignupPageAPI();
    //console.log(signinApiClient.create())
    console.log("ok im here all good LOGIN");
    return signupApiClient.create().then(res => {
      console.log(res);
      return res.response
    }));
  }
}


const router = new Router('.registration__block');
router
    .use('/', loginPage)
    .use('/signup', registationPage)
    .start()




setTimeout(() => {
  router.go("/signup");
}, 2000);

// А можно и назад
setTimeout(() => {
  router.back();
}, 4000);

// И снова вперёд
setTimeout(() => {
  router.forward();
}, 6000);

*/



//Send req
/*
function sendData(data){
  const xhr = new HTTPTransport();
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  xhr.request('/api/v1/auth/signin', options).then(function(data) {
    console.log('WHAT I GET ');
    console.log(data);
    window.location = data.responseURL;
  });
}
*/

