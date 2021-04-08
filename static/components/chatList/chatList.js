import Block from '../../utils/block/block.js';
import { ChatAPI } from "../../api/chat-api.js";
import { store } from '../../utils/store/store.js';
const pug = require('pug');
class ChatList extends Block {
    constructor(props) {
        super('div', props);
        this.pageData = store.state.users;
        store.subscribe(() => {
            this.render();
        });
    }
    componentDidMount() {
        if (store.state.users.length === 0) {
            const createChatApiClient = new ChatAPI();
            createChatApiClient.request()
                .then((data) => data.response)
                .then(data => {
                function changeData(data) {
                    return { type: 'CHANGEDATA', data };
                }
                let chatData = JSON.parse(data).map(el => {
                    el.last_message = JSON.parse(el.last_message);
                    if (el.last_message != null) {
                        let dataTest = el.last_message;
                        el.last_message = dataTest.content;
                    }
                    return el;
                });
                store.update(changeData({ users: chatData }));
            });
        }
        this.setProps({ users: store.state.users });
    }
    render() {
        const pugData = `
ul.chat-list
    each user in users
        li.chat-list__element(data-action='openChat' data-id= user.id data-name= user.title)
            div.chat_link
                .chat_image(data-action='chatListEvent')
                    img(src='../../data/circle.png' alt='')
                .chat_text_wrap(data-action='chatListEvent')
                    .chat_text_name
                        span= user.title
                    .chat_text_message
                        span= user.last_message
                .chat_meta_wrap(data-action='chatListEvent')
                    time.chat_meta_date= user.date
                    if (user.unread_count)
                        span.chat_meta_badge= user.unread_count
`;
        const compiledFunction = pug.compile(pugData);
        let doneHTML = compiledFunction({ users: store.state.users });
        function createElementFromHTML(htmlString) {
            var div = document.createElement('div');
            div.innerHTML = htmlString.trim();
            // Change this to div.childNodes to support multiple top-level nodes
            return div.firstChild;
        }
        document.querySelector('.page_chat_list').innerHTML = doneHTML;
        return doneHTML;
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent().firstChild);
    return root;
}
export { ChatList, render };
//# sourceMappingURL=chatList.js.map