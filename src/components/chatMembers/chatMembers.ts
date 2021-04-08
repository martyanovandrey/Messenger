import Block from '../../utils/block/block.js';
import {store} from "../../utils/store/store.js";
import {ChatDialogAPI, ChatMembersAPI} from "../../api/chat-api.js";

const pug = require('pug');

class ChatMembers extends Block {
  constructor(props: { chatMembers: string[]; title: string }) {
    super('div', props);
    this.state = store.state.currentChat
      store.subscribe(() => {
          this.render()
      })
  }
    componentDidMount() {
        console.log(store.state.messages, 'CDMCDMCDMCDMCDMCDM');
        this.setProps(store.state.messages)

    }

    render() {
    const pugData = `
#headMenu.page-dialog__wrap
    .page-dialog__head
        .page-dialog__head-image
            img(src='../../data/circle.png' alt='')
        .page-dialog__head-name
            span#chatName= currentChat.chatName
            span(class='chat_text_message')#chatMembers Участники чата: 
                each member in chatMembers
                      span(class='chat_text_message')  #{member.first_name} 
        .page-dialog__head-options
            button.button.button-focus
                svg(class="delegate" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' data-action='menu')
                    path(fill='currentColor' d='M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z')
    .dialog-text
        .dialog-text__date-body
            .dialog-text__date
                span 19 июня
        each message in messages
            if message.user_id != currentUser
                .dialog-text__body
                    .dialog-text__message
                        span= message.content
                    .dialog-text__info
                        time.time= message.time
            else
                .dialog-text__body.user-message
                    .dialog-text__message
                        span= message.content
                    .dialog-text__info
                        if message.is_read
                            .read
                                svg(width='11' height='5' viewBox='0 0 11 5' fill='none' xmlns='http://www.w3.org/2000/svg')
                                    line(y1='-0.5' x2='3.765' y2='-0.5' transform='matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)' stroke='#3369F3')
                                    line(y1='-0.5' x2='5.6475' y2='-0.5' transform='matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5)' stroke='#3369F3')
                                    line(y1='-0.5' x2='5.6475' y2='-0.5' transform='matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5)' stroke='#3369F3')
                        time.time= message.time
    .page-dialog__pop-up-wrap
        #optionsMenu.page-dialog__pop-up.photo-file-menu(hidden='')
            .photo-video.flex_center
                svg(width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V14L14.5194 12.4052C13.5108 12.1362 12.4714 12 11.4275 12H10.5725C9.52864 12 8.48921 12.1362 7.48057 12.4052L1.5 14V4C1.5 2.61929 2.61929 1.5 4 1.5ZM0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V18C22 20.2091 20.2091 22 18 22H4C1.79086 22 0 20.2091 0 18V4ZM8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z' fill='#3369F3')
                span.pop-up__margin
                    | Фото или Видео
            .file.flex_center
                svg(width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V12H16C13.7909 12 12 13.7909 12 16V20.5H4C2.61929 20.5 1.5 19.3807 1.5 18V4C1.5 2.61929 2.61929 1.5 4 1.5ZM12 22H4C1.79086 22 0 20.2091 0 18V4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V12V18C22 20.2091 20.2091 22 18 22H12Z' fill='#3369F3')
                span.pop-up__margin
                    | Файл
            .location.flex_center
                svg(width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M20.5 11C20.5 16.2467 16.2467 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z' fill='#3369F3')
                span.pop-up__margin
                    | Локация
        .page-dialog__pop-up.user-menu(hidden='')
            .flex_center(class='menuAdd' data-action='menuAdd')
                svg(width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg')
                    circle(cx='11' cy='11' r='10.25' stroke='#3369F3' stroke-width='1.5')
                    line(x1='10.9999' y1='5.5' x2='10.9999' y2='16.5' stroke='#3369F3' stroke-width='1.5')
                    line(x1='5.49988' y1='11' x2='16.4999' y2='11' stroke='#3369F3' stroke-width='1.5')
                span.pop-up__margin(data-action='menuAdd')
                    | Добавить пользователя
            .flex_center(data-action='menuDelete')
                svg(width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg' data-action='menuDelete')
                    circle(cx='11' cy='11' r='10.25' stroke='#3369F3' stroke-width='1.5')
                    line(x1='7.11077' y1='7.11103' x2='14.8889' y2='14.8892' stroke='#3369F3' stroke-width='1.5')
                    line(x1='7.11078' y1='14.8891' x2='14.889' y2='7.11093' stroke='#3369F3' stroke-width='1.5')
                span.pop-up__margin(data-action='menuDelete')
                    | Удалить пользователя
            .flex_center
                svg(width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg')
                    circle(cx='11' cy='11' r='10.25' stroke='red' stroke-width='1.5')
                    line(x1='5.49988' y1='11' x2='16.4999' y2='11' stroke='red' stroke-width='1.5')
                span.pop-up__margin
                    | Удалить чат
        .page-dialog__pop-up.delete-menu(hidden='')#addMenu
            .delete-user
                input.textinput-control#addUserMenu
                div
                    button.delete-button(data-action='addUser')
                        | Добавить
        .page-dialog__pop-up.delete-menu(hidden='')#deleteMenu
            .delete-user
                span.delete-text
                    | Удалить чат
                span.pop-up__margin
                    | Вы уверены ?
                div
                    button.delete-button
                        | Да
                    button.delete-button
                        | Нет
    .page-dialog__message-panel
        .page-dialog__add-file
            button.button
                svg(width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' data-action='attach')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z' fill='#999999')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M9.70067 16.0141L17.2768 8.43793L18.2196 9.38074L10.6435 16.9569L9.70067 16.0141Z' fill='#999999')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z' fill='#999999')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M17.5574 23.8708L25.1335 16.2946L26.0763 17.2374L18.5002 24.8136L17.5574 23.8708Z' fill='#999999')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z' fill='#999999')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z' fill='#999999')
                    path(fill-rule='evenodd' clip-rule='evenodd' d='M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z' fill='#999999')
        .page-dialog__textarea
            textarea.textarea(name='message' rows='1' placeholder='Сообщение')#messageInput
        .page-dialog__send(data-action='sendMessage')#sendMessage
            button.button.button_send
                svg(width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg')
                    circle(cx='14' cy='14' r='14' fill='#3369F3')
                    rect(x='8' y='13.2' width='11' height='1.6' fill='white')
                    path(d='M15 9L19 14L15 19' stroke='white' stroke-width='1.6')
`;
    const compiledFunction = pug.compile(pugData);

      const doneHTML = compiledFunction({
          currentUser: store.state.id,
          currentChat: store.state.currentChat,
          chatMembers: store.state.chatMembers,
          messages: store.state.messages,
      });
      function createElementFromHTML(htmlString) {
          var div = document.createElement('div');
          div.innerHTML = htmlString.trim();

          // Change this to div.childNodes to support multiple top-level nodes
          return div.firstChild;
      }
      document.querySelector('.page-dialog').innerHTML = doneHTML
    return doneHTML;
  }
}

function render(query:string, block: ChatMembers) {
  const root = <Element>document.querySelector(query);
  root.appendChild(block.getContent().firstChild);
  return root;
}

export {ChatMembers, render};
