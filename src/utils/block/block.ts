import EventBus from '../event-bus/event-bus.js';

interface EVENTS {
     INIT: string,
     FLOW_CDM: string,
     FLOW_RENDER: string,
     FLOW_CDU: string 
}

interface Props {
  tagName: string,
  props:{
    text: string
  }
}

export default class Block {
    static EVENTS: EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_RENDER: "flow:render",
      FLOW_CDU: "flow:component-did-update"
    };
  
    _element = null;
    _meta = null;
  eventBus: () => EventBus;
  props: object = {};
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName: string = "div", props: object = {}): void {
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };
  
      this.props = this._makePropsProxy(props);
  
      this.eventBus = () => eventBus;
  
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }
  
    _registerEvents(eventBus: EventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
  
    _createResources() {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  
    init() {
      this._createResources();
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
  
    _componentDidMount() {
      this.componentDidMount();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  
      // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps?:string) {}
  
    _componentDidUpdate(oldProps:string, newProps:string) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (response) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      }
    }
  
      // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps:string, newProps:string) {
      if (oldProps === newProps){
        return false;
      } else {
        return true;
      }
    }
  
    setProps = (nextProps: any) => {
      if (!nextProps) {
        return;
      }
      Object.assign(this.props, nextProps);
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    };
  
    get element() {
      return this._element;
    }
  
  
    _render() {
      const block = this.render();
      this.eventBus().off(Block.EVENTS.INIT, this.init.bind(this));
      this.eventBus().off(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      this.eventBus().off(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      this.eventBus().off(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  
      this._element.innerHTML = block;
      this.eventBus().on(Block.EVENTS.INIT, this.init.bind(this));
      this.eventBus().on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      this.eventBus().on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      this.eventBus().on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
  
      // Может переопределять пользователь, необязательно трогать
    render() {
  
    }
  
    getContent(): HTMLElement {
      return this.element;
    }
  
    _makePropsProxy(props: object) {
      // Можно и так передать this
      // Такой способ больше не применяется с приходом ES6+
      const self = this;
      props = new Proxy(props, {
          deleteProperty(target, prop) {
                throw Error('Нет доступа')
          }
      });
  
      return props;
    }
  
    _createDocumentElement(tagName: string) {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  
    show() {
      this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }
  }