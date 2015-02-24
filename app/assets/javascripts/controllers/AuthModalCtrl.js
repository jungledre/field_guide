app.controller('AuthModalCtrl', ['$scope','$modalInstance','UserService', function($scope,$modalInstance,UserService){
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

    var signupData = {
      email:$scope.signupEmail,
      password:$scope.signupPassword,
      firstName:$scope.signupFirstName,
      lastName:$scope.signupLastName
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