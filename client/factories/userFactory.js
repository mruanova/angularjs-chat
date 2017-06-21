app.factory("userFactory", function ($http) {

    var factory = {};

    factory.currentUser = null;

    factory.register = function (user, setCookies, catchErrors) {
      $http.post('/api/users', user).then(function (response) {
        if (response.data.user) {
          factory.currentUser = {
            id: response.data.user._id,
            username: response.data.user.username
          }
        }
        else {
          console.log("factory.register.error")
          console.log(response.data.errors)
          catchErrors(response.data.errors)
        }
        setCookies();
      });
    }

    factory.login = function (user, setCookies, catchErrors) {
      $http.post('/api/login', user).then(function (response) {
        if (response.data.user) {
          factory.currentUser = {
            id: response.data.user._id,
            username: response.data.user.username
          }
        }
        else {
          console.log("factory.login.error")
          console.log(response.data.errors)
          catchErrors(response.data.errors)
        }
        setCookies();
      });
    }


    factory.logout = function(redirect){
      factory.currentUser = null;
      redirect();
    }

    factory.show = function(userId, setUser, catchErrors=null){
      $http.get('/users/' + userId, function(response){
        if (response.data.user){
          console.log("Got user: ", response.data.user)
          setUser(response.data.user)
        } else {
          console.log("Something went wrong during user retrieval")
          //do some error handling here
          //catchErrors(response.data.errors)
        }
      })
    }


    return factory;
});
