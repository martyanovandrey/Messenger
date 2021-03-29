import Block from '../../utils/block/block.js';
class Button extends Block {
    constructor(props) {
        super("button", props);
    }
    render() {
        return `<span>${this.props.text}</span>`;
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    const blockHTML = block.getContent();
    blockHTML.classList.add("button_type_submit");
    blockHTML.type = 'submit';
    blockHTML.id = 'change_button';
    const button_span = blockHTML.firstElementChild;
    button_span.classList.add("button-text");
    root.appendChild(block.getContent());
    return root;
}
export { Button, render };
//# sourceMappingURL=button.js.map