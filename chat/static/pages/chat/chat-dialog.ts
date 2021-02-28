(<HTMLButtonElement>document.querySelector(".button.button_send")).addEventListener("click", message);
        
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