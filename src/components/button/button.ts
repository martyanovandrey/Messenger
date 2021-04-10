import Block from '../../utils/block/block';

interface Props {
    text: string
}

class Button extends Block {
    constructor(props: Props) {
        super('button', props);
    }

    componentDidMount() {
    // this._element.addEventListener('click', this.props.event);
        // this._element.addEventListener('click', console.log('ttttttteeeeeeeeeeeeeeeeeeeeeee'));
        // this.eventBus.on('test', console.log('event BUS TEST'));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        return `<span>${this.props.text}</span>`;
    }
}

function render(query:string, block: Button) {
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

export { Button, render };
