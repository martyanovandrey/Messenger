import { Block } from "../../utils/router/router.js";
import { loginHTML } from "./loginPage.js";
import { registrationHTML } from "./registrationPage.js";
import { chatHTML } from "./chatPage.js";
import { profileHTML } from "./profilePage.js";
import { profileChangesHTML } from "./profileChanges.js";
import { profileChangePswHTML } from "./profileChangePsw.js";
import { error500HTML } from "./error500.js";
import { error404HTML } from "./error404.js";
import { store } from "../../utils/store/store.js";
const pug = require('pug');
class loginPage extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(loginHTML);
        let loginDoneHTML = compiledFunction(this.pageData);
        return loginDoneHTML;
    }
}
class registrationPage extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(registrationHTML);
        let registrationDoneHTML = compiledFunction(this.pageData);
        return registrationDoneHTML;
    }
}
class chatPage extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(chatHTML);
        let chatDoneHTML = compiledFunction(this.pageData);
        return chatDoneHTML;
    }
}
class profilePage extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(profileHTML);
        let doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
    ;
}
class profileChangesPage extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(profileChangesHTML);
        let doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}
class profileChangePsw extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(profileChangePswHTML);
        let doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}
class error404 extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(error404HTML);
        let doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}
class error500 extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(error500HTML);
        let doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}
export { loginPage, registrationPage, chatPage, profilePage, profileChangesPage, profileChangePsw, error404, error500 };
//# sourceMappingURL=pageBlock.js.map