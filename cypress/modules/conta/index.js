const seletores = {
  tituloContaCriada: '[data-qa="account-created"]',
  tituloContaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

function continuar() {
  cy.get(seletores.botaoContinuar).click();
}

function verificarSeContaFoiCriada() {
  cy.get(seletores.tituloContaCriada)
    .should('be.visible')
    .and('have.text', 'Account Created!');
}

function verificarSeContaFoiExcluida() {
  cy.get(seletores.tituloContaExcluida)
    .should('be.visible')
    .and('have.text', 'Account Deleted!');
}

module.exports = {
  continuar,
  verificarSeContaFoiCriada,
  verificarSeContaFoiExcluida,
};
