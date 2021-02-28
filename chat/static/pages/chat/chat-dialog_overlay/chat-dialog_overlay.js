import { Button, render } from '../../../components/event-bus/index.js';
const button = new Button({
    text: 'Добавить',
});
render(".app", button);
const button_div = document.querySelector('.app');
const button_div_b = button_div.firstElementChild;
button_div_b.classList.add("button_type_submit");
button_div_b.type = 'submit';
button_div_b.firstElementChild.classList.add("button-text");
//# sourceMappingURL=chat-dialog_overlay.js.map