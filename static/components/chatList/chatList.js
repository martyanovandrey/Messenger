import Block from '../../utils/block/block.js';
const pug = require('pug');
class ChatList extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        let pugData = `
ul.chat-list
    each user in users
        li.chat-list__element(data-name= user.name)
            div.chat_link
                .chat_image(data-action='chatListEvent')
                    img(src='../../data/circle.png' alt='')
                .chat_text_wrap(data-action='chatListEvent')
                    .chat_text_name
                        span= user.name
                    .chat_text_message
                        span= user.text
                .chat_meta_wrap(data-action='chatListEvent')
                    time.chat_meta_date= user.date
                    if (user.badge)
                        span.chat_meta_badge= user.badge
`;
        const compiledFunction = pug.compile(pugData);
        console.log(this.props.name, 'here <---------------');
        let doneHTML = compiledFunction(this.props);
        return doneHTML;
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    console.log(block.getContent());
    root.appendChild(block.getContent().firstChild);
    return root;
}
export { ChatList, render };
//# sourceMappingURL=chatList.js.map