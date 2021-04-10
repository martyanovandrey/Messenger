import Block from '../../utils/block/block';
import { ChatMembers } from '../chatMembers/chatMembers';
import { ChatAPI } from '../../api/chat-api';
import { store } from '../../utils/store/store';
// @ts-ignore
import circle from '../../data/circle.png';
// @ts-ignore
import pug from 'pug'


type User = {
    date: string;
    unread_count?: string;
    title: string;
    id: string;
    last_message: string;
};

type Props = { title: string; users: User[] };

class ChatList extends Block {

    constructor(props?: Props) {
        super('div', props);
        store.subscribe(() => {
            this.render();
        });
    }

    componentDidMount() {
        if (store.state.users.length === 0) {
            const createChatApiClient = new ChatAPI();
            createChatApiClient.request()
                .then((data) => data.response)
                .then((data) => {
                    function changeData(data: Record<string, any>) {
                        return { type: 'CHANGEDATA', data };
                    }

                    const chatData = JSON.parse(data).map((el: any) => {
                        el.last_message = JSON.parse(el.last_message);
                        if (el.last_message != null) {
                            const dataTest = el.last_message;
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
                    img(src= image alt='')
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
        const doneHTML = compiledFunction({
            users: store.state.users,
            image: circle,
        });
        (<HTMLElement>document.querySelector('.page_chat_list')).innerHTML = doneHTML;
        return doneHTML;
    }
}

function render(query:string, block: ChatList | ChatMembers) {
    const root = <Element>document.querySelector(query);
    root.appendChild(block.getContent().firstChild);

    return root;
}

export { ChatList, render };
