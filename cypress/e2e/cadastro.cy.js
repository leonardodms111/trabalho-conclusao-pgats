const home = require('../modules/home');
const menu = require('../modules/menu');
const cadastro = require('../modules/cadastro');
const conta = require('../modules/conta');
const usuarioBase = require('../fixtures/usuario.json');

describe('Cadastro de usuário', () => {
  it('Caso 1 - Deve cadastrar um novo usuário, exibir o nome logado e excluir a conta', () => {
    const usuario = { ...usuarioBase, email: `qa.${Date.now()}@pgats.com` };

    home.acessarHome();
    home.validarHomeVisivel();

    menu.irParaSignupLogin();
    cadastro.validarFormularioNovoUsuarioVisivel();

    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.validarFormularioInformacoesContaVisivel();

    cadastro.preencherInformacoesConta(usuario);
    cadastro.preencherEndereco(usuario.endereco);
    cadastro.criarConta();
    conta.validarContaCriada();

    conta.continuar();
    menu.validarUsuarioLogado(usuario.nome);

    menu.excluirConta();
    conta.validarContaExcluida();
    conta.continuar();
  });

  it('Caso 5 - Deve exibir erro ao tentar cadastrar com um e-mail já cadastrado', () => {
    const usuario = { ...usuarioBase, email: `qa.${Date.now()}@pgats.com` };

    // Pré-condição: o próprio caso cria o usuário cujo e-mail será repetido
    home.acessarHome();
    menu.irParaSignupLogin();
    cadastro.cadastrarUsuario(usuario);
    conta.validarContaCriada();
    conta.continuar();
    menu.fazerLogout();

    home.acessarHome();
    home.validarHomeVisivel();

    menu.irParaSignupLogin();
    cadastro.validarFormularioNovoUsuarioVisivel();

    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.validarErroEmailExistente();
  });
});
