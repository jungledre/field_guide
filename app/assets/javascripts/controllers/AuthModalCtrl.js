app.controller('AuthModalCtrl', ['$scope','$modalInstance','UserService',
  function($scope,$modalInstance,UserService){
  $scope.loginData = {email:'',password:''}
  $scope.signupData = {}

  $scope.login = function(){
    UserService.login($scope.loginData.email,$scope.loginData.password,
      function(err,data){
        if(err){
          alert(err);
        }
        else if(data.user){
          $modalInstance.close();
        }else{
          alert(data.error)
        }
    })
  }

  $scope.signup = function(){
    console.log($scope.signupEmail)

    var signupData = {
      email: $scope.signupEmail,
      password: $scope.signupPassword
    }
    console.log(signupData)
    // UserService.signup($scope.email,$scope.password,
    //   function(err,data){
    //     if(err){
    //       alert(err);
    //     }
    //     else if(data.user){
    //       $modalInstance.close();
    //     }else{
    //       alert(data.error)
    //     }
    // })
  }
}])
