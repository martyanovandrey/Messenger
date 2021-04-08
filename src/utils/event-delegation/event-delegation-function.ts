let isSame = document.body.isEqualNode ? 'isEqualNode' : 'isSameNode';
function delegate(wrapperEl, eventName, delegatedElClass, action){
    wrapperEl.addEventListener(eventName, function(event) {
        var clickedEl = event.target;
        var checkingNode = clickedEl;
        while(checkingNode){
            if(checkingNode[isSame](wrapperEl)){
                // checking element itself
                checkingNode = undefined;// STOP loop
            }else{
                if(checkingNode.classList.contains(delegatedElClass)){
                    // found delegated element
                    action.call(checkingNode, event);// "this" will be delegated el
                    checkingNode = undefined;// STOP loop
                }else{
                    // going to parent node
                    checkingNode = checkingNode.parentNode;
                }
            }
        }
    });
}

export {delegate}