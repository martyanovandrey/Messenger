// @ts-ignore
const isSame = document.body.isEqualNode ? 'isEqualNode' : 'isSameNode';
function delegate(wrapperEl: any, eventName: string, delegatedElClass: string, action: Function) {
    wrapperEl.addEventListener(eventName, (event: any) => {
        const clickedEl = event.target;
        let checkingNode: any = clickedEl;
        while (checkingNode) {
            if (checkingNode[isSame](wrapperEl)) {
                // checking element itself
                checkingNode = undefined;// STOP loop
            } else if (checkingNode.classList.contains(delegatedElClass)) {
                // found delegated element
                action.call(checkingNode, event);// "this" will be delegated el
                checkingNode = undefined;// STOP loop
            } else {
                // going to parent node
                checkingNode = checkingNode.parentNode;
            }
        }
    });
}

export { delegate };
