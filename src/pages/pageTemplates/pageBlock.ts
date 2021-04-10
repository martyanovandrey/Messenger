import { Block } from '../../utils/router/router';
import { loginHTML } from './loginPage';
import { registrationHTML } from './registrationPage';
import { chatHTML } from './chatPage';
import { profileHTML } from './profilePage';
import { profileChangesHTML } from './profileChanges';
import { profileChangePswHTML } from './profileChangePsw';
import { error500HTML } from './error500';
import { error404HTML } from './error404';

import { store } from '../../utils/store/store';
// @ts-ignore
import pug from 'pug'

class loginPage extends Block {
    private pageData: object;

    constructor() {
        super();
        this.pageData = store.state;
    }

    getContent() {
        const compiledFunction = pug.compile(loginHTML);
        const loginDoneHTML = compiledFunction(this.pageData);
        return loginDoneHTML;
    }
}

class registrationPage extends Block {
    private pageData: object;

    constructor() {
        super();
        this.pageData = store.state;
    }

    getContent() {
        const compiledFunction = pug.compile(registrationHTML);
        const registrationDoneHTML = compiledFunction(this.pageData);
        return registrationDoneHTML;
    }
}

class chatPage extends Block {
    private pageData: object;

    constructor() {
        super();
        this.pageData = store.state;
    }

    getContent() {
        const compiledFunction = pug.compile(chatHTML);
        const chatDoneHTML = compiledFunction(this.pageData);

        return chatDoneHTML;
    }
}

class profilePage extends Block {
    private pageData: object;

    constructor() {
        super();
        this.pageData = store.state;
    }

    getContent() {
        const compiledFunction = pug.compile(profileHTML);
        const doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}

class profileChangesPage extends Block {
    private pageData: object;

    constructor() {
        super();
        this.pageData = store.state;
    }

    getContent() {
        const compiledFunction = pug.compile(profileChangesHTML);
        const doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}

class profileChangePsw extends Block {
    private pageData: object;

    constructor() {
        super();
        this.pageData = store.state;
    }

    getContent() {
        const compiledFunction = pug.compile(profileChangePswHTML);
        const doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}

class error404 extends Block {
    private pageData: object;

    constructor() {
        super();
        this.pageData = store.state;
    }

    getContent() {
        const compiledFunction = pug.compile(error404HTML);
        const doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}

class error500 extends Block {
    private pageData: object;

    constructor() {
        super();
        this.pageData = store.state;
    }

    getContent() {
        const compiledFunction = pug.compile(error500HTML);
        const doneHTML = compiledFunction(this.pageData);
        return doneHTML;
    }
}

export {
    loginPage, registrationPage, chatPage,
    profilePage, profileChangesPage, profileChangePsw, error404, error500,
};
