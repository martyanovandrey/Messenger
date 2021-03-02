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
    root.appendChild(block.getContent());
    return root;
}
export { Button, render };
//# sourceMappingURL=button.js.map