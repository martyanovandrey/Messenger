import { Button, render } from '../../../components/button/button.js';
const button = new Button({
    text: 'Добавить',
});
render(".app", button);
const button_div = document.querySelector('.app');
const button_div_b = button_div.firstElementChild;
button_div_b.classList.add("button_type_submit");
button_div_b.type = 'submit';
const button_span = button_div_b.firstElementChild;
button_span.classList.add("button-text");
//# sourceMappingURL=chat-dialog_overlay.js.map