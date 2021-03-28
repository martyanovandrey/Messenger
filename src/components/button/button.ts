import Block from '../../utils/block/block.js';

interface Props {
  text: string
}

class Button extends Block {

    constructor(props: Props) {
      super("button", props);
    }
  
    render() {
      return `<span>${this.props.text}</span>`;
    }
  }

function render(query:string, block: Button) {
  const root = <Element>document.querySelector(query);
    console.log(block.getContent());
    root.appendChild(block.getContent());

  return root;
}





export {Button, render}

