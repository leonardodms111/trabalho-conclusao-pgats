const seletores = {
  tituloContaCriada: '[data-qa="account-created"]',
  tituloContaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

function continuar() {
  cy.get(seletores.botaoContinuar).click();
}

function validarContaCriada() {
  cy.get(seletores.tituloContaCriada)
    .should('be.visible')
    .and('have.text', 'Account Created!');
}

function validarContaExcluida() {
  cy.get(seletores.tituloContaExcluida)
    .should('be.visible')
    .and('have.text', 'Account Deleted!');
}

module.exports = {
  continuar,
  validarContaCriada,
  validarContaExcluida,
};
