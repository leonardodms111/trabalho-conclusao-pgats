const seletores = {
  tituloNovoUsuario: '.signup-form h2',
  nomeNovoUsuario: '[data-qa="signup-name"]',
  emailNovoUsuario: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  mensagemErroCadastro: '.signup-form form p',

  tituloInformacoesConta: '.login-form h2.title',
  tratamento: {
    Mr: '#id_gender1',
    Mrs: '#id_gender2',
  },
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertasParceiros: '#optin',

  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
};

function iniciarCadastro(nome, email) {
  cy.get(seletores.nomeNovoUsuario).type(nome);
  cy.get(seletores.emailNovoUsuario).type(email);
  cy.get(seletores.botaoSignup).click();
}

function preencherInformacoesConta(usuario) {
  cy.get(seletores.tratamento[usuario.tratamento]).check();
  cy.get(seletores.senha).type(usuario.senha, { log: false });
  cy.get(seletores.diaNascimento).select(usuario.nascimento.dia);
  cy.get(seletores.mesNascimento).select(usuario.nascimento.mes);
  cy.get(seletores.anoNascimento).select(usuario.nascimento.ano);
  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertasParceiros).check();
}

function preencherEndereco(endereco) {
  cy.get(seletores.primeiroNome).type(endereco.primeiroNome);
  cy.get(seletores.sobrenome).type(endereco.sobrenome);
  cy.get(seletores.empresa).type(endereco.empresa);
  cy.get(seletores.endereco).type(endereco.endereco);
  cy.get(seletores.complemento).type(endereco.complemento);
  cy.get(seletores.pais).select(endereco.pais);
  cy.get(seletores.estado).type(endereco.estado);
  cy.get(seletores.cidade).type(endereco.cidade);
  cy.get(seletores.cep).type(endereco.cep);
  cy.get(seletores.celular).type(endereco.celular);
}

function criarConta() {
  cy.get(seletores.botaoCriarConta).click();
}

function cadastrarUsuario(usuario) {
  iniciarCadastro(usuario.nome, usuario.email);
  preencherInformacoesConta(usuario);
  preencherEndereco(usuario.endereco);
  criarConta();
}

function validarErroEmailExistente() {
  cy.get(seletores.mensagemErroCadastro)
    .should('be.visible')
    .and('have.text', 'Email Address already exist!');
}

function validarFormularioNovoUsuarioVisivel() {
  cy.get(seletores.tituloNovoUsuario)
    .should('be.visible')
    .and('have.text', 'New User Signup!');
}

function validarFormularioInformacoesContaVisivel() {
  cy.get(seletores.tituloInformacoesConta)
    .first()
    .should('be.visible')
    .and('contain.text', 'Enter Account Information');
}

module.exports = {
  iniciarCadastro,
  preencherInformacoesConta,
  preencherEndereco,
  criarConta,
  cadastrarUsuario,
  validarErroEmailExistente,
  validarFormularioNovoUsuarioVisivel,
  validarFormularioInformacoesContaVisivel,
};
