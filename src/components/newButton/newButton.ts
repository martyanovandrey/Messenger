import Block from '../../utils/block/block';
// @ts-ignore
import pug from 'pug'

interface Props {
    [key: string]: any
}

class newButton extends Block {
    constructor(props: Props) {
        super('button', props);
    }

    componentDidMount() {
        console.log('mount', this.props.event);
        this._element.addEventListener('click', this.props.event);
        // this.eventBus.on('test', console.log('event BUS TEST'));
    }

    render() {
        const pugData = `
button.button_type_submit(type='submit' id= id class= id)
  span.button-text(data-action='addChat')= text
`;
        const compiledFunction = pug.compile(pugData);
        const doneHTML = compiledFunction(this.props);
        return doneHTML;
    }
}

function render(query:string, block: newButton) {
    const root = <Element>document.querySelector(query);
    const blockHTML = block.getContent();
    blockHTML.classList.add('button_type_submit');
    blockHTML.type = 'submit';
    blockHTML.id = 'change_button';
    const button_span = blockHTML.firstElementChild;
    button_span.classList.add('button-text');
    root.appendChild(block.getContent());
    return root;
}

export { newButton, render };
