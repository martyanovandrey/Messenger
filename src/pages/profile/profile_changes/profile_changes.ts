import {Button, render} from '../../../components/button/button.js';
import Validation from '../../../utils/input_validation/input_validation.js';
import EventBus from "../../../utils/event-bus/event-bus";
import {ProfileChangeAPI} from '../../../api/profile-api.js'
import { Router, Block} from "../../../utils/router/router.js";


document.addEventListener('DOMContentLoaded', function () {
  (<HTMLButtonElement>document.querySelector("#change_button")).addEventListener("click", profile_change_data);
});

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
  console.log(data_json)
  return data_json
}

function profile_change_data():void {
  let data = profile_change()
  let profileChangeApiClient = new ProfileChangeAPI()
  console.log("UPDATA DATA");
  console.log(data);
  profileChangeApiClient.update(data).then(function(data) {
    console.log(data);
    window.location = '/profile';
    class ProfileStatic extends Block {
      getContent(){
        let element = document.createElement('template');
        element.innerHTML  = '<h1>TEST</h1>'
        console.log(element.content.childNodes[0]);
        return element.content.childNodes[0]
      }
    }

    //let profileRouterBlock = new Profile();
    const router = new Router('.registration__block');
    router
        .use('/profile', ProfileStatic)
        .start()
  }
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



