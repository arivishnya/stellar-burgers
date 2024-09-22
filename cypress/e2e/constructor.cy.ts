const bun1 = '[data-cy="1"]';
const bun2 = '[data-cy="8"]';
const main = '[data-cy="2"]';
const sauce = '[data-cy="4"]';
const burgerConstructor = '[data-cy="burgerConstructor"]';
const modal = '[data-cy="modal"]';
const modalClose = '[data-cy="modalClose"]';
const modalCloseOverlay = '[data-cy="modalCloseOverlay"]';
const orderButton = '[data-cy="order-button"]';
const orderNumber = '[data-cy="order-number"]';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('login');
  cy.intercept('POST', 'api/auth/token', { fixture: 'login.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );

  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('refreshToken')
  );
  cy.setCookie('accessToken', 'accessToken');

  cy.visit('/');
  cy.viewport(1680, 1024);

  cy.wait('@getIngredients');
});

afterEach(() => {
  window.localStorage.clear();
  cy.clearCookies();
});

const constructor = (bun1: string, main: string, bun2: string) => {
  cy.get(burgerConstructor).should('contain', bun1);
  cy.get(burgerConstructor).should('contain', main);
  cy.get(burgerConstructor).should('contain', bun2);
};

it('Cчетчик', () => {
  cy.get(main).children('button').click();
  cy.get(main).find('.counter__num').contains('1');
});

describe('Добавление ингредиентов', () => {
  it('bun1 + main', () => {
    cy.get(bun1).children('button').click();
    cy.get(main).children('button').click();
    constructor(
      'Краторная булка N-200i',
      'Биокотлета из марсианской Магнолии',
      'Краторная булка N-200i'
    );
  });

  it('main + bun1', () => {
    cy.get(main).children('button').click();
    cy.get(bun1).children('button').click();
    constructor(
      'Краторная булка N-200i',
      'Биокотлета из марсианской Магнолии',
      'Краторная булка N-200i'
    );
  });

  it('bun1 + main + sauce', () => {
    cy.get(bun1).children('button').click();
    cy.get(main).children('button').click();
    cy.get(sauce).children('button').click();
    constructor(
      'Краторная булка N-200i',
      'Биокотлета из марсианской Магнолии',
      'Краторная булка N-200i'
    );
    cy.get(burgerConstructor).should('contain', 'Соус Spicy-X');
  });
});

describe('Замена булок', () => {
  it('bun1 -> bun2', () => {
    cy.get(bun1).children('button').click();
    constructor('Краторная булка N-200i', '', 'Краторная булка N-200i');
    cy.get(bun2).children('button').click();
    constructor('Флюоресцентная булка R2-D3', '', 'Флюоресцентная булка R2-D3');
  });

  it('bun1 -> bun2 + main', () => {
    cy.get(bun1).children('button').click();
    constructor('Краторная булка N-200i', '', 'Краторная булка N-200i');
    cy.get(main).children('button').click();
    cy.get(bun2).children('button').click();
    constructor(
      'Флюоресцентная булка R2-D3',
      'Биокотлета из марсианской Магнолии',
      'Флюоресцентная булка R2-D3'
    );
  });
});

describe('Модальные окна', () => {
  it('Открытие', () => {
    cy.get(bun1).click();
    cy.get(modal).should('be.visible');
  });
  it('Закрытие по кнопке', () => {
    cy.get(main).click();
    cy.get(modal).should('be.visible');
    cy.get(modalClose).click();
    cy.get(modal).should('not.exist');
  });
  it('Закрытие по клику на оверлей', () => {
    cy.get(bun2).click();
    cy.get(modal).should('be.visible');
    cy.get(modalCloseOverlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });
});

describe('Создание заказа', () => {
  it('add order', () => {
    cy.get(bun1).children('button').click();
    cy.get(main).children('button').click();
    constructor(
      'Краторная булка N-200i',
      'Биокотлета из марсианской Магнолии',
      'Краторная булка N-200i'
    );
    cy.get(orderButton).click();
    cy.get(modal).should('be.visible');
    cy.get(orderNumber).should('contain', '1');
    cy.get(modalClose).click();
    cy.get(modal).should('not.exist');

    cy.get(burgerConstructor).should('exist');
    cy.get(burgerConstructor).should('not.contain', 'Краторная булка N-200i');
    cy.get(burgerConstructor).should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
  });
});

export {};
