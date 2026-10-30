// Component Object: o menu aparece em todas as páginas da aplicação
const seletores = {
  linkSignupLogin: '.shop-menu a[href="/login"]',
  linkProdutos: '.shop-menu a[href="/products"]',
  linkCarrinho: '.shop-menu a[href="/view_cart"]',
  linkLogout: '.shop-menu a[href="/logout"]',
  linkExcluirConta: '.shop-menu a[href="/delete_account"]',
  usuarioLogado: '.shop-menu a:contains("Logged in as")',
};

function irParaSignupLogin() {
  cy.get(seletores.linkSignupLogin).click();
}

function irParaProdutos() {
  cy.get(seletores.linkProdutos).click();
}

function irParaCarrinho() {
  cy.get(seletores.linkCarrinho).click();
}

function fazerLogout() {
  cy.get(seletores.linkLogout).click();
}

function excluirConta() {
  cy.get(seletores.linkExcluirConta).click();
}

function verificarSeUsuarioEstaLogado(nome) {
  cy.get(seletores.usuarioLogado)
    .should('be.visible')
    .and('contain.text', `Logged in as ${nome}`);
}

module.exports = {
  irParaSignupLogin,
  irParaProdutos,
  irParaCarrinho,
  fazerLogout,
  excluirConta,
  verificarSeUsuarioEstaLogado,
};
