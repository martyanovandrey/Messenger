import {Socket} from './socket'
import {store} from "../store/store";
import {changeData} from "../store/actionFuncStore";

export class ChatSocket extends Socket {

    sendMessage(){
        this.socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }));
    }

    subscribeOnMessage(socket: WebSocket, event: MessageEvent) {
        if (JSON.parse(event.data).length > 1) {
            console.log(JSON.parse(event.data), 'JSON.parse(event.data)');
            const newMessages = JSON.parse(event.data).map((el: any) => {
                const date = new Date(el.time);
                let min: any = date.getMinutes();
                if (min < 10) {
                    min = `0${min}`;
                }
                el.time = `${date.getHours()}:${min}`;
                return el;
            });
            store.update(changeData({ messages: newMessages }));
        } else if (store.state.messages.length != 0) {
            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
        } else if (store.state.messages.length === 0 && JSON.parse(event.data).length === 1) {
            store.update(changeData({ messages: JSON.parse(event.data) }));
            console.log(store.state);
        }
        document.getElementById('sendMessage')?.addEventListener('click', sendMe.bind(ChatSocket));
        function sendMe(event: MouseEvent) {
            event.preventDefault();
            let messageInput = document.getElementById('messageInput')
            if(!messageInput){
                return console.log("message Input element not found");
            }
            const message = (messageInput as HTMLInputElement).value;
            if (message != '') {
                socket.send(JSON.stringify({
                    content: `${message}`,
                    type: 'message',
                }));
                socket.send(JSON.stringify({
                    content: '0',
                    type: 'get old',
                }));
            } else {
                console.log('empty message');
            }
        }
    }
}
