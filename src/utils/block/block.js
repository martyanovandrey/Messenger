"use strict";
exports.__esModule = true;
var event_bus_js_1 = require("../event-bus/event-bus.js");
var Block = /** @class */ (function () {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    function Block(tagName, props) {
        var _this = this;
        if (tagName === void 0) { tagName = "div"; }
        if (props === void 0) { props = {}; }
        this._element = null;
        this._meta = null;
        this.props = {};
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            Object.assign(_this.props, nextProps);
            _this.eventBus().emit(Block.EVENTS.FLOW_CDU, _this.props, nextProps);
        };
        var eventBus = new event_bus_js_1["default"]();
        this._meta = {
            tagName: tagName,
            props: props
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = function () { return eventBus; };
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    Block.prototype._registerEvents = function (eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    };
    Block.prototype._createResources = function () {
        var tagName = this._meta.tagName;
        this._element = this._createDocumentElement(tagName);
    };
    Block.prototype.init = function () {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    };
    Block.prototype._componentDidMount = function () {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };
    // Может переопределять пользователь, необязательно трогать
    Block.prototype.componentDidMount = function (oldProps) { };
    Block.prototype._componentDidUpdate = function (oldProps, newProps) {
        var response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    };
    // Может переопределять пользователь, необязательно трогать
    Block.prototype.componentDidUpdate = function (oldProps, newProps) {
        if (oldProps === newProps) {
            return false;
        }
        else {
            return true;
        }
    };
    Object.defineProperty(Block.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype._render = function () {
        var block = this.render();
        this.eventBus().off(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus().off(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus().off(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus().off(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this._element.innerHTML = block;
        this.eventBus().on(Block.EVENTS.INIT, this.init.bind(this));
        this.eventBus().on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus().on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus().on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    };
    // Может переопределять пользователь, необязательно трогать
    Block.prototype.render = function () {
    };
    Block.prototype.getContent = function () {
        return this.element;
    };
    Block.prototype._makePropsProxy = function (props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        var self = this;
        props = new Proxy(props, {
            deleteProperty: function (target, prop) {
                throw Error('Нет доступа');
            }
        });
        return props;
    };
    Block.prototype._createDocumentElement = function (tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    };
    Block.prototype.show = function () {
        this.getContent().style.display = "block";
    };
    Block.prototype.hide = function () {
        this.getContent().style.display = "none";
    };
    Block.EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };
    return Block;
}());
exports["default"] = Block;
