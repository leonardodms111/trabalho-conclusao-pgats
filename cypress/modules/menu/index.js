const seletores = {
  linkSignupLogin: 'a[href="/login"]',
  linkLogout: 'a[href="/logout"]',
  linkExcluirConta: 'a[href="/delete_account"]',
  usuarioLogado: 'a:contains("Logged in as")',
};

function irParaSignupLogin() {
  cy.get(seletores.linkSignupLogin).click();
}

function fazerLogout() {
  cy.get(seletores.linkLogout).click();
}

function excluirConta() {
  cy.get(seletores.linkExcluirConta).click();
}

function validarUsuarioLogado(nome) {
  cy.get(seletores.usuarioLogado)
    .should('be.visible')
    .and('contain.text', `Logged in as ${nome}`);
}

module.exports = {
  irParaSignupLogin,
  fazerLogout,
  excluirConta,
  validarUsuarioLogado,
};
