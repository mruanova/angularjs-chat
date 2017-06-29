app.controller("usersController", function ($scope, $location, userFactory, $cookies) {
  $scope.user = userFactory.currentUser;
  $scope.errors = {};
  var updateCookies = function (redirect = null) {
    if (userFactory.currentUser) {
      $cookies.put('currentUserId', userFactory.currentUser.id);
      $cookies.put('currentUserUsername', userFactory.currentUser.username);
      $cookies.put('currentUserEmail', userFactory.currentUser.email);
      $scope.currentUser = {};
      $scope.currentUser.id = $cookies.get('currentUserId');
      $scope.currentUser.username = $cookies.get('currentUserUsername');
      $scope.currentUser.email = $cookies.get('currentUserEmail');
    } else {
      console.log("No user found in the factory, clearing cookies");
      $scope.currentUser = null;
      $cookies.remove('currentUserId');
      $cookies.remove('currentUserUsername');
      $cookies.remove('currentUserEmail');      
    }
    if (redirect) {
      $location.url(redirect);
    }
  };

  var errorCatcher = function (errors) {
    console.log("Caught errors:", errors);
  };

  if ($location.url() == '/register') {
    console.log("Viewing register page");
    $scope.register = function () {
      if ($scope.registerUser.password == $scope.confirm) {
        userFactory.register($scope.registerUser, updateCookies, errorCatcher);
        $scope.errors = {};
      } else {
        $scope.errors.confirm = true;
        $scope.confirm = "";
      }
    }
  }

  if ($location.url() == '/login') {
    console.log("Viewing login page");
    $scope.login = function () {
      userFactory.login($scope.logindata, updateCookies, errorCatcher);
      $scope.errors = {};
    };
  }

  if ($location.url().match('^/users/')) {
    userFactory.show($scope.user.id, setUser, errorCatcher);
    console.log("$scope.user", $scope.user);
  }
  
  function setUser(user) {
      $scope.user = user;
      updateCookies();
  };
});