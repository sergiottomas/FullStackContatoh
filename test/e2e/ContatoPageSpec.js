var ContatoPage = new require('./pages/ContatoPage.js');

describe('Cadastro de contatos', function(){
  var pagina = new ContatoPage();

  beforeEach(function(){
    pagina.visitar();
  });

  it('Deve cadastrar o contato', function(){
    var aleatorio = Math.floor((Math.random() * 10000000) + 1);

    pagina.digitarNome('teste' + aleatorio);
    pagina.digitarEmail('teste@email' + aleatorio);
    pagina.selecionarNomePrimeiraEmergenciaDaLista();
    pagina.salvar();

    expect(pagina.obterMensagem()).toContain('sucesso');
  });
});
