import EventBus from '../event-bus/event-bus';

interface EVENTS {
    INIT: string,
    FLOW_CDM: string,
    FLOW_RENDER: string,
    FLOW_CDU: string
}

type Props = Record<string, any>;

type Meta = {
    tagName: string;
    props: Props;
};

// не вышло сделать с onClick
export default abstract class Block {
    static EVENTS: EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update',
    };

    _element: any = null;

    _meta: Meta | null = null;

    eventBus: () => EventBus;

    props: Props;

    constructor(tagName = 'div', props = {}) {
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

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        if (this._meta) {
            const { tagName } = this._meta;
            this._element = this._createDocumentElement(tagName);
        } else {
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    componentDidMount(oldProps?:string) {}

    _componentDidUpdate(oldProps:string, newProps:string) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps:string, newProps:string) {
        if (oldProps === newProps) {
            return false;
        }
        return true;
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

    // ????
    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
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
        // ????
        this._addEvents();
    }

    // Может переопределять пользователь, необязательно трогать
    abstract render(): string;

    getContent():any {
        return this.element;
    }

    _makePropsProxy(props: object) {
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

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName) as HTMLElement;
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}
