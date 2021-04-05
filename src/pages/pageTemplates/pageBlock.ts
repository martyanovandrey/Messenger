import { Block } from '../../utils/router/router.js';
import { loginHTML } from './loginPage.js';
import { registrationHTML } from './registrationPage.js';
import { chatHTML } from './chatPage.js';
import { profileHTML } from './profilePage.js';
import { profileChangesHTML } from './profileChanges.js';
import { profileChangePswHTML } from './profileChangePsw.js';
import { error500HTML } from './error500.js';
import { error404HTML } from './error404.js';

import { store } from '../../utils/store/store.js';

const pug = require('pug');

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
