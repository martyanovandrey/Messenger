export class Socket {
    public socket: WebSocket;

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.configureWebSocket();
    };

    public openWebSocket(){
        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this.sendMessage()
            this.socket.addEventListener('message', (event) => {
                this.subscribeOnMessage(this.socket, event);
            });
        });
    }

    private configureWebSocket(): void {
        this.socket.addEventListener('close', (event: CloseEvent) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        this.socket.addEventListener('error', (event:ErrorEvent ) => {
            console.log('Ошибка', event.message);
        });
    }


    sendMessage(){
        this.socket.send(JSON.stringify('test message'));
    }

    subscribeOnMessage(socket: WebSocket, event: MessageEvent){
        console.log(`Получено сообщение: ${event}, сокет ${socket}`);
    }
}