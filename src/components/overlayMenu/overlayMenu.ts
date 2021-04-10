import Block from '../../utils/block/block';
// @ts-ignore
import pug from 'pug'

interface Props {
    [key: string]: any
}

class OverlayMenu extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    componentDidMount() {
        // let roottest = document.querySelector('.test2');
        // let roottest = this.getContent();
        // console.log(this.getContent(), '111111111111111')
        // //let roottest = this.getContent().querySelector('.app');
        // if(roottest != null){
        //
        //     roottest.appendChild(this.props.button.getContent());
        // }
        //
        // console.log(this.props.button.getContent(), '22222222222222')
        // roottest.appendChild(this.props.button.getContent());
        this._element.addEventListener('click', this.props.event);
        // this.eventBus.on('test', console.log('event BUS TEST'));
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
                            input.textinput-control(type='text' placeholder= inputData id= inputId)
                            label.registration__label(for='name')= inputData
                            label.registration__invalid Текст должен быть от 2 до 10 символов
                    .button_overlay
                        .app 
                            | !{button}
`;
        const compiledFunction = pug.compile(pugData);
        const doneHTML = compiledFunction({
            inputId: this.props.inputId,
            hideClass: this.props.hideClass,
            title: this.props.title,
            inputData: this.props.inputData,
            button: this.props.button.render(),
        });
        return doneHTML;
    }
}

function render(query:string, block: OverlayMenu) {
    const root = (<HTMLElement>document.querySelector(query));
    root.appendChild(block.getContent());
    return root;
}

export { OverlayMenu, render };
