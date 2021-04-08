interface IRawParams {
    [key: string]: any
}
class Menu implements IRawParams{
    [k: string]: any;

    constructor(elem: HTMLElement) {
        elem.onclick = this.onClick.bind(this);
    }

    onClick(event: Event) {
        if (event.target instanceof HTMLElement) {
            let action = event.target.dataset.action
            if (action) {
                this[action](event);
            }
        }
    };
}

export { Menu }