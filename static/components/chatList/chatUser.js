import Block from '../../utils/block/block.js';
class Chat extends Block {
    constructor(props) {
        super("button", props);
    }
    render() {
        return `<span>${this.props.text}</span>`;
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    console.log(block.getContent());
    root.appendChild(block.getContent());
    return root;
}
export { Chat, render };
//# sourceMappingURL=chatUser.js.map