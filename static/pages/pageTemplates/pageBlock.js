// Page blocks
import { Block } from "../../utils/router/router.js";
import { loginHTML } from "../pageTemplates/loginPage.js";
import { registrationHTML } from "../pageTemplates/registrationPage.js";
import { chatHTML } from "../pageTemplates/chatPage.js";
import { chatDialogHTML } from "../pageTemplates/chatDialogPage.js";
import { profileHTML } from "../pageTemplates/profilePage.js";
import { profileChangesHTML } from "../pageTemplates/profileChanges.js";
import { profileChangePswHTML } from "../pageTemplates/profileChangePsw.js";
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
class registationPage extends Block {
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
class chatDialogPage extends Block {
    constructor() {
        super();
        this.pageData = store.state;
    }
    getContent() {
        const compiledFunction = pug.compile(chatDialogHTML);
        let doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
    ;
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
export { loginPage, registationPage, chatPage, chatDialogPage, profilePage, profileChangesPage, profileChangePsw };
//# sourceMappingURL=pageBlock.js.map