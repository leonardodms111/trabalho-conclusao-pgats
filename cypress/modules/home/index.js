const seletores = {
  logo: 'img[alt="Website for automation practice"]',
  carrossel: '#slider',
};

function acessarHome() {
  cy.visit('/');
}

function validarHomeVisivel() {
  cy.title().should('eq', 'Automation Exercise');
  cy.get(seletores.logo).should('be.visible');
  cy.get(seletores.carrossel).should('be.visible');
}

module.exports = {
  acessarHome,
  validarHomeVisivel,
};
