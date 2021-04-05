import EventBus from '../event-bus/event-bus.js';
// не вышло сделать с onClick
export default class Block {
    constructor(tagName = 'div', props = {}) {
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
            this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
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
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        if (this._meta) {
            const { tagName } = this._meta;
            this._element = this._createDocumentElement(tagName);
        }
        else {
            console.log('this._meta === null !');
        }
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
    // @ts-ignore
    componentDidMount(oldProps) { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        if (oldProps === newProps) {
            return false;
        }
        return true;
    }
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
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        // Можно и так передать const self = this;
        // Такой способ больше не применяется с приходом ES6+
        props = new Proxy(props, {
            // @ts-ignore
            deleteProperty(target, prop) {
                throw Error('Нет доступа');
            },
        });
        return props;
    }
    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    show() {
        this.getContent().style.display = 'block';
    }
    hide() {
        this.getContent().style.display = 'none';
    }
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
};
//# sourceMappingURL=block.js.map