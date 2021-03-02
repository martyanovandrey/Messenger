import Block from '../../utils/block/block.js';

interface Props {
  text: string
}

class Button extends Block {
    props: Props
    constructor(props: Props) {
      super("button", props);
    }
  
    render() {
      return `<span>${this.props.text}</span>`;
    }
  }

function render(query:string, block) {
  const root = <Element>document.querySelector(query);
  root.appendChild(block.getContent());

  return root;
}

export {Button, render}
  
