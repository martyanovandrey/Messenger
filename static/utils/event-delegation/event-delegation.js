class Menu {
    constructor(elem) {
        elem.onclick = this.onClick.bind(this);
    }
    onClick(event) {
        if (event.target instanceof HTMLElement) {
            let action = event.target.dataset.action;
            if (action) {
                this[action](event);
            }
        }
    }
    ;
}
export { Menu };
//# sourceMappingURL=event-delegation.js.map