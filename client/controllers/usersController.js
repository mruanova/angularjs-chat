app.controller("usersController", function ($scope, $location, userFactory, $cookies) {

  $scope.errors = {};

  // console.log($location.url())


  var updateCookies = function(redirect = null){
    if (userFactory.currentUser){
      $cookies.put('currentUserId', userFactory.currentUser.id);
      $cookies.put('currentUserUsername', userFactory.currentUser.username)
      $scope.currentUser = {}
      $scope.currentUser.id = $cookies.get('currentUserId')
      $scope.currentUser.username = $cookies.get('currentUserUsername')
    } else {
      console.log("No user found in the factory, clearing cookies");
      $scope.currentUser = null;
      $cookies.remove('currentUserId');
      $cookies.remove('currentUserUsername')
    }
    if(redirect){
      $location.url(redirect)
    }

  }

  var errorCatcher = function(errors){
      console.log("Caught errors:", errors)
      // if (errors.error.email){
      //   $scope.errors.emailTaken = errors.error.email.message
      // }
      // $scope.errors.emailTaken = null;
      // // console.log("Email isn't taken...")
      // if (errors.error){
      //   if (errors.error.email){
      //     $scope.errors.email = errors.errors.email.message
      //   }
      //   if (errors.errors.first_name){
      //     $scope.errors.first_name = errors.errors.first_name.message
      //   }
      //   if (errors.errors.last_name){
      //     $scope.errors.last_name = errors.errors.last_name.message
      //   }
      //   if (errors.errors.password){
      //     $scope.errors.password = errors.errors.password.message
      //   }
      //   if (errors.errors.birthday){
      //     $scope.errors.birthday = errors.errors.birthday.message
      //   }
      // }
    }

  if ($location.url() == '/register'){
    console.log("Viewing register page")
    $scope.register = function () {
      if ($scope.registerUser.password == $scope.confirm) {
        userFactory.register($scope.registerUser, updateCookies, errorCatcher)
        $scope.errors = {};
      } else {
        $scope.errors.confirm = true;
        $scope.confirm = "";
      }
    }
  }

  if ($location.url() == '/login'){
    updateCookies();
    console.log("Viewing login page")
    $scope.login = function () {
      userFactory.login($scope.logindata, updateCookies, errorCatcher)
      $scope.errors = {};
    }
  }


  if ($location.url().match('^/users/')){
    console.log("Viewing user show page")

    //TODO need to flesh this out later
  }


  // var getUser = function(){
  //   userFactory.show()
  // }






});
