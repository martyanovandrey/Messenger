import {ChatList, render} from '../../components/chatList/chatList.js';
const pug = require('pug');

//(<HTMLButtonElement>document.querySelector(".button.button_send")).addEventListener("click", message);
        
function message():void {
    interface Data {
        message: String
    }
    let data: Data = {
        message: ''
    }

    data.message = (<HTMLInputElement>document.querySelector('textarea[name="message"]')).value
    console.log(data)
}

//Create button
let chatProps = [{
    id: '1',
    name: 'User',
    text: 'Hello!',
    date: '13:37',
    badge: '4'
},{
    id: '2',
    name: 'Teeeeeest',
    text: 'Hi!',
    date: '13:37'
}]

let chatProps2 = [{
    id: '13',
    name: 'Us12312312312er',
    text: 'Hello!',
    date: '13:37',
    badge: '4'
}]
/*



const chatList = new ChatList({ title: 'chatProps', users: chatProps, chatMembers: chatMembers});
render(".page_chat_list", chatList);*/

//chatList.setProps({ title: 'chatProps', users: chatProps2 })

//Event delegation for menu
