angular.module('contatooh').controller('ContatosController', function($scope, Contato){
  //scope
  $scope.mensage = {texto: ''}
  $scope.contatos = [];
  $scope.filtro = '';
  $scope.init = function(){
    buscaContatos();
  };
  $scope.init();

  //functions
  function buscaContatos(){
    Contato.query(function(contatos){
      //onSuccess
      $scope.contatos = contatos;
    }, function(error){
      $scope.mensage = {
        texto: "Não foi possível obter a lista de contatos"
      };
    });
  }

  $scope.remove = function(contato){
    var promise = Contato.delete({id: contato._id},
      buscaContatos,
      function(error){
        $scope.mensage = {
          texto: "Não foi possível remover os contatos"
        };
        console.log(error);
      });
  }
});
