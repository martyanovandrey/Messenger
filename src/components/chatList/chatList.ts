import Block from '../../utils/block/block.js';
import {ChatMembers} from '../chatMembers/chatMembers.js';
import {ChatAPI} from "../../api/chat-api.js";
import { store } from '../../utils/store/store.js';

const pug = require('pug');

type User = {
  date: string;
    unread_count?: string;
    title: string;
  id: string;
    last_message: string;
};

type Props = {title: string; users: User[]};

class ChatList extends Block {
    private state: any;
    private pageData: any;
  constructor(props: Props) {
    super('div', props);
      this.pageData = store.state.users;
  }

    componentDidMount() {
        const createChatApiClient = new ChatAPI();
        createChatApiClient.request()
            .then((data) => data.response)
            .then(data => {

                function changeData(data) {
                    return { type: 'CHANGEDATA', data };
                }

                console.log({users: JSON.parse(data)},'rererer');
                store.update(changeData({users: JSON.parse(data)}));
                console.log(store.state);
            });
        this.setProps({users: store.state.users})
    }

  render() {
    const pugData = `
ul.chat-list
    each user in users
        li.chat-list__element(data-name= user.title)
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

      let doneHTML = compiledFunction({users: store.state.users});
    return doneHTML;
  }
}

function render(query:string, block: ChatList | ChatMembers) {
  const root = <Element>document.querySelector(query);
  root.appendChild(block.getContent().firstChild);

    return root;
}

export {ChatList, render};
