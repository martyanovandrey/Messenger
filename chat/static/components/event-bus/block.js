import EventBus from './event-bus.js';

export default class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_RENDER: "flow:render",
      FLOW_CDU: "flow:component-did-update"
    };
  
    _element = null;
    _meta = null;
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
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
  
    _registerEvents(eventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
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
    componentDidMount(oldProps) {}
  
    _componentDidUpdate(oldProps, newProps) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (response) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      }
    }
  
      // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
      if (oldProps === newProps){
        return false;
      } else {
        return true;
      }
    }
  
    setProps = nextProps => {
      if (!nextProps) {
        return;
      }
      Object.assign(this.props, nextProps);
      this.eventBus().emit(Block.EVENTS.FLOW_UPDATE, this.props, nextProps);
    };
  
    get element() {
      return this._element;
    }
  
  
    _render() {
      const block = this.render();
      this.eventBus().off(Block.EVENTS.INIT, this.init.bind(this));
      this.eventBus().off(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      this.eventBus().off(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      this.eventBus().off(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
  
      this._element.innerHTML = block;
      this.eventBus().on(Block.EVENTS.INIT, this.init.bind(this));
      this.eventBus().on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      this.eventBus().on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      this.eventBus().on(Block.EVENTS.FLOW_UPDATE, this._componentDidUpdate.bind(this));
    }
  
      // Может переопределять пользователь, необязательно трогать
    render() {
  
    }
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props) {
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
  
    _createDocumentElement(tagName) {
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