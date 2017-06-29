app.factory("userFactory", function ($http, $cookies) {
    var factory = {};
    factory.currentUser = null;

    var checkCookies = function(){
      console.log("Checking cookies");
      console.log($cookies.get('currentUserId'));
      console.log($cookies.get('currentUserUsername'));
      console.log($cookies.get('currentUserEmail'));
      if ($cookies.get('currentUserUsername')){
        console.log("Found cookie");
        factory.currentUser = {
          id:$cookies.get('currentUserId'), 
          username: $cookies.get('currentUserUsername'), 
          email: $cookies.get('currentUserEmail')
        };
      }
    };

    checkCookies();

    factory.register = function (user, setCookies, catchErrors) {
      $http.post('/api/users', user).then(function (response) {
        if (response.data.user) {
          factory.currentUser = {
            id: response.data.user._id,
            username: response.data.user.username
          };
        }
        else {
          console.log("factory.register.error");
          console.log(response.data);
          catchErrors(response.data);
        }
        setCookies('/dashboard');
      });
    };

    factory.login = function (user, setCookies, catchErrors) {
      $http.post('/api/login', user).then(function (response) {
        if (response.data.user) {
          factory.currentUser = {
            id: response.data.user.id,
            username: response.data.user.username
          }
          console.log(factory.currentUser);
        }
        else {
          console.log("factory.login.error");
          console.log(response.data);
          catchErrors(response.data);
        }
        setCookies('/dashboard');
      });
    };

    factory.logout = function(redirect){
      factory.currentUser = null;
      redirect();
    };

    factory.show = function(userId, setUser, catchErrors=null){
      $http.get('/api/users/' + userId).then(function(response){
        if (response.data.user){
          setUser(response.data.user);
        } else {
          console.log("Something went wrong during user retrieval");
          //do some error handling here
          //catchErrors(response.data.errors)
        }
      });
    };

    return factory;
});