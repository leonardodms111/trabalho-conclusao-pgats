const seletores = {
  tituloLogin: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErroLogin: '.login-form form p',
};

function fazerLogin(email, senha) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha, { log: false });
  cy.get(seletores.botaoLogin).click();
}

function verificarSeFormularioLoginEstaVisivel() {
  cy.get(seletores.tituloLogin)
    .should('be.visible')
    .and('have.text', 'Login to your account');
}

function verificarSePaginaDeLoginFoiExibida() {
  cy.url().should('include', '/login');
  verificarSeFormularioLoginEstaVisivel();
}

function verificarSeMensagemLoginInvalidoFoiExibida() {
  cy.get(seletores.mensagemErroLogin)
    .should('be.visible')
    .and('have.text', 'Your email or password is incorrect!');
}

module.exports = {
  fazerLogin,
  verificarSeFormularioLoginEstaVisivel,
  verificarSePaginaDeLoginFoiExibida,
  verificarSeMensagemLoginInvalidoFoiExibida,
};
