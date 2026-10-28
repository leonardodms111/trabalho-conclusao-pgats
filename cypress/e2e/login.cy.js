const home = require('../modules/home');
const menu = require('../modules/menu');
const cadastro = require('../modules/cadastro');
const conta = require('../modules/conta');
const login = require('../modules/login');
const usuarioBase = require('../fixtures/usuario.json');

describe('Login de usuário', () => {
  it('Caso 3 - Deve exibir erro ao fazer login com e-mail e senha incorretos', () => {
    const email = `inexistente.${Date.now()}@pgats.com`;
    const senha = 'SenhaIncorreta@123';

    home.acessarHome();
    home.validarHomeVisivel();

    menu.irParaSignupLogin();
    login.validarFormularioLoginVisivel();

    login.fazerLogin(email, senha);
    login.validarErroLoginInvalido();
  });

  it('Caso 2 - Deve fazer login com e-mail e senha corretos, exibir o nome logado e excluir a conta', () => {
    const usuario = { ...usuarioBase, email: `qa.${Date.now()}@pgats.com` };

    // Pré-condição: o próprio caso cria o usuário que vai usar no login
    home.acessarHome();
    menu.irParaSignupLogin();
    cadastro.cadastrarUsuario(usuario);
    conta.validarContaCriada();
    conta.continuar();
    menu.fazerLogout();

    home.acessarHome();
    home.validarHomeVisivel();

    menu.irParaSignupLogin();
    login.validarFormularioLoginVisivel();

    login.fazerLogin(usuario.email, usuario.senha);
    menu.validarUsuarioLogado(usuario.nome);

    menu.excluirConta();
    conta.validarContaExcluida();
  });
});
