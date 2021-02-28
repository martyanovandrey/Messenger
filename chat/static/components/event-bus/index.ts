import Block from './block.js';

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

function render(query, block) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());

  return root;
}

export {Button, render}
  
