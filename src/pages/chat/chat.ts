import Validation from "../../utils/input_validation/input_validation";
import {HTTPTransport} from "../../utils/xhr/xhr.js";
import {ChatAPI} from "../../api/chat-api.js";
import {EventBus} from "../../../static/utils/event-bus/event-bus.js"


document.addEventListener('DOMContentLoaded', function () {
    (<HTMLButtonElement>document.querySelector(".button")).addEventListener("click", popup);
});


function popup(event){

}




let chats = document.querySelectorAll('.chat-list__element')
chats.forEach((el) => {
    el.addEventListener("click", function test(id) {chat(this.id)});
})
//(<HTMLButtonElement>document.querySelector(".chat_link")).addEventListener("click", chat(this.id));


function chat(id):void {
    //let userName = document.getElementById('1');
    let data = {id: id}
    sendData(data)

}

//Send req
function sendData(data){

    let chatPage = new ChatAPI()
    chatPage.create(JSON.stringify(data)).then(function(data) {
        console.log('WHAT I GET ');
        console.log(data);
        let textBlock = document.querySelector('.dialog-text.dialog-mask')
        if (textBlock === null){
            console.log("test");
            textBlock = document.querySelector('.page-dialog__wrap')
        }
        textBlock.style.display = "none"
        let dialogBlock = document.querySelector('.page-dialog')
        dialogBlock.innerHTML = data.response
    });
}

