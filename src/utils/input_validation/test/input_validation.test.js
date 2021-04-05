import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import validation from '../../../../static/utils/input_validation/input_validation.js';

describe('Input_validation (text validation) Text validation. Text must include letters and be from 2 to 10 characters long', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `<html>
                   <body>
                    <input class="textinput-control" type="text" value="123">
                   </body>
                 </html>`,
      { url: 'http://localhost' },
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });
  it('Value does NOT meet requirements', () => {
    const input = document.querySelector('.textinput-control');
    const result = validation(input);
    expect(result).to.equal(false);
  });

  it('Value does meet requirements', () => {
    const input = document.querySelector('.textinput-control');
    input.value = 'Testtest';
    const result = validation(input);
    expect(result).to.equal(true);
  });
});

describe('Input_validation (password validation) Password must contains a digit, uppercase and lowercase letter, any character and be at least 6 characters long', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `<html>
                   <body>
                    <input class="textinput-control" type="password" value="123">
                   </body>
                 </html>`,
      { url: 'http://localhost' },
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });
  it('Value does NOT meet requirements', () => {
    const input = document.querySelector('.textinput-control');
    const result = validation(input);
    expect(result).to.equal(false);
  });

  it('Value does meet requirements', () => {
    const input = document.querySelector('.textinput-control');
    input.value = 'Test12345!';
    const result = validation(input);
    expect(result).to.equal(true);
  });
});

describe('Input_validation (email validation) Email must contains @ and be from 2 to 15 characters long', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `<html>
                   <body>
                    <input class="textinput-control" type="email" value="123">
                   </body>
                 </html>`,
      { url: 'http://localhost' },
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });
  it('Value does NOT meet requirements', () => {
    const input = document.querySelector('.textinput-control');
    const result = validation(input);
    expect(result).to.equal(false);
  });

  it('Value does meet requirements', () => {
    const input = document.querySelector('.textinput-control');
    input.value = 'test@example.com';
    const result = validation(input);
    expect(result).to.equal(true);
  });
});

describe('Input_validation (tel validation) Telephone must contains a digit and be from 5 to 13 characters long', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      `<html>
                   <body>
                    <input class="textinput-control" type="tel" value="123">
                   </body>
                 </html>`,
      { url: 'http://localhost' },
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });
  it('Value does NOT meet requirements', () => {
    const input = document.querySelector('.textinput-control');
    const result = validation(input);
    expect(result).to.equal(false);
  });

  it('Value does meet requirements', () => {
    const input = document.querySelector('.textinput-control');
    input.value = '5151515';
    const result = validation(input);
    expect(result).to.equal(true);
  });
});
