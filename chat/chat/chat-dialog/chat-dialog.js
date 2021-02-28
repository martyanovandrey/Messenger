document.querySelector(".button.button_send").addEventListener("click", message);
function message() {
    data = {};
    data.message = document.querySelector('textarea[name="message"]').value;
    console.log(data);
}
//# sourceMappingURL=chat-dialog.js.map