import Block from '../../utils/block/block.js';
const pug = require('pug');
class OverlayMenu extends Block {
    constructor(props) {
        super("div", props);
    }
    componentDidMount() {
        //let roottest = document.querySelector('.test2');
        // let roottest = this.getContent();
        // console.log(this.getContent(), '111111111111111')
        // //let roottest = this.getContent().querySelector('.app');
        // if(roottest != null){
        //
        //     roottest.appendChild(this.props.button.getContent());
        // }
        //
        // console.log(this.props.button.getContent(), '22222222222222')
        //roottest.appendChild(this.props.button.getContent());
        this._element.addEventListener('click', this.props.event);
        //this.eventBus.on('test', console.log('event BUS TEST'));
    }
    render() {
        const pugData = `
.page-overlay(class= hideClass)
    .page-overlay__wrap
        .page-dialog__pop-up.pop-up-width
            h1.header__descr.header-overlay= title
            form
                .form_wrap
                    .form__field.registration-field
                        span.textinput
                            input.textinput-control(type='text' placeholder= inputData)
                            label.registration__label(for='name')= inputData
                            label.registration__invalid Текст должен быть от 2 до 10 символов
                    .button_overlay
                        .app 
                            | !{button}
`;
        const compiledFunction = pug.compile(pugData);
        let doneHTML = compiledFunction({
            hideClass: this.props.hideClass,
            title: this.props.title,
            inputData: this.props.inputData,
            button: this.props.button.render()
        });
        // function createElementFromHTML(htmlString) {
        //     var div = document.createElement('div');
        //     div.innerHTML = htmlString.trim();
        //
        //     // Change this to div.childNodes to support multiple top-level nodes
        //     return div.firstChild;
        // }
        //console.log(createElementFromHTML(doneHTML).querySelector('.app').appendChild(this.props.button.getContent()), '222222222222222')
        //document.querySelector('.test').innerHTML = doneHTML
        //doneHTML = createElementFromHTML(doneHTML).querySelector('.app').appendChild(this.props.button.getContent())
        //console.log(doneHTML, 'doneeeeeeeee');
        return doneHTML;
    }
}
function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
// const overlayMenuAdd = new OverlayMenu({
//     title: "Добавить пользователя",
//     button: new newButton({
//         text: "Добавить"
//     })});
function test(event) {
    event.preventDefault();
    console.log('teseeeeeeeeeeest', event);
}
export { OverlayMenu, render };
//# sourceMappingURL=overlayMenu.js.map