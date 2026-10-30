// Workflow / Facade: agrupa passos de preparação e limpeza usados por vários testes
const home = require('../home');
const menu = require('../menu');
const cadastro = require('../cadastro');
const conta = require('../conta');

function criarUsuarioParaTeste(usuario) {
  home.acessarHome();
  menu.irParaSignupLogin();
  cadastro.cadastrarUsuario(usuario);
  conta.verificarSeContaFoiCriada();
  conta.continuar();
  menu.fazerLogout();
}

function excluirContaLogada() {
  menu.excluirConta();
  conta.verificarSeContaFoiExcluida();
  conta.continuar();
}

module.exports = {
  criarUsuarioParaTeste,
  excluirContaLogada,
};
