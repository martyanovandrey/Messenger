import Validation from "../../utils/input_validation/input_validation";
import {HTTPTransport} from "../../utils/xhr/xhr.js";

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
    const xhr = new HTTPTransport();
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    xhr.request('/api/v1/chats', options).then(function(data) {
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
        //window.location += `/${data.body.userName}`;
    });
}
