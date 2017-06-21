var app = angular.module("app", ["ngRoute", "ngMessages", "ngCookies"]);

app.factory("userFactory", function ($http) {
    var factory = {};
    factory.user = null;
    factory.errors = [];
    factory.register = function (user, finishedAddingUser) {
        $http.post('/api/users', user).then(function (response) {
            if (response.data.user) {
                factory.user = {
                    id: response.data.user._id,
                    username: response.data.user.username
                }
            }
            else {
                console.log("factory.register.error")
                console.log(response.data)
                factory.errors.push(response.data.error)
            }
            finishedAddingUser();
        });
    }
    factory.login = function (user, finishedLoggingUser) {
        $http.post('/api/login', user).then(function (response) {
            if (response.data.user) {
                factory.user = {
                    id: response.data.user.id,
                    username: response.data.user.username
                }
            }
            else {
                console.log("factory.login.error")
                console.log(response.data)
                factory.errors.push(response.data.error);
            }
            finishedLoggingUser();
        });
    }
    return factory;
});

app.factory("discussionFactory", function ($http) {
    var factory = {};
    var posts = [];
    factory.getPosts = function (receivedPosts) {
        $http.get("/api/posts").then(function (response) {
            posts = response.data.posts;
            receivedPosts(posts);
        });
    }
    factory.addNewPost = function (postdata, finishedAddingPost) {
        $http.post('/api/posts', postdata).then(function (response) {
            finishedAddingPost();
        });
    }
    return factory;
})
app.factory("commentFactory", function ($http) {
    var factory = {};
    var comments = [];
    factory.getComments = function (receivedComments) {
        $http.get("/api/comments").then(function (response) {
            comments = response.data.comments;
            receivedComments(comments);

        });
    }
    factory.addNewComment = function (postdata, finishedAddingComment) {
        $http.post('/api/comments', postdata).then(function (response) {
            finishedAddingComment();
        });
    }
    return factory;
});

app.controller("usersController", function ($scope, $location, userFactory, $cookies) {
    $scope.toggle = false;
    $scope.toggle = function () {
        $scope.toggle = (!$scope.toggle);
    };
    $scope.register = function () {
        if ($scope.registerUser.password == $scope.registerUser.confirm) {
            userFactory.register($scope.registerUser, function () {
                if (userFactory.user) {
                    $cookies.put('loggeduserid', userFactory.user.id);
                    $cookies.put('loggedusername', userFactory.user.username);
                    var favcookie = $cookies.get('loggedusername');
                    var othercookie = $cookies.get("loggeduserid");
                    console.log(favcookie);
                    console.log(othercookie);
                    $location.url('/');
                }
                else {
                    $scope.errors = userFactory.errors;
                }
            })
        }
    }
    $scope.login = function () {
        userFactory.login($scope.logindata, function () {
            if (userFactory.user) {
                $cookies.put('loggeduserid', userFactory.user.id);
                $cookies.put('loggedusername', userFactory.user.username);
                $location.url('/');
            }
            else {
                $scope.errors = userFactory.errors;
            }
        })
    }
});

app.controller("discussionController", function ($scope, $location, userFactory, discussionFactory, commentFactory, $cookies, $route) {
    $scope.user = {};
    //TODO: $scope.errors
    var logincookie = $cookies.get("loggeduserid");
    if (!logincookie) {
        $location.url("/login");
    } else {
        var id = $cookies.get("loggeduserid");
        var name = $cookies.get("loggedusername");
        $scope.user = { id: id, username: name };
        discussionFactory.getPosts(function (posts) {
            $scope.posts = posts;
        })
        commentFactory.getComments(function (comments) {
            $scope.comments = comments;
        })
        $scope.logout = function () {
            console.log("logout");
            $cookies.remove("loggeduserid");
            $cookies.remove("loggedusername");
            $location.url("/login");
        }
        $scope.addPost = function () {
            var newpostdata = { postText: $scope.newpost.posttext, _author: $scope.user.id };
            discussionFactory.addNewPost(newpostdata, function () {
                $scope.newpost = {};
            })
            $route.reload();
        }
        $scope.addComment = function (postidfrompage, newcomment) {
            var newcommentdata = {
                commentText: newcomment.commenttext,
                _author: $scope.user.id,
                _post: postidfrompage
            };
            commentFactory.addNewComment(newcommentdata, function () {
                $scope.newcomment = {};
            })
            $route.reload();
        }
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "/partials/login.html",
            controller: "usersController",
        })
        .when("/", {
            templateUrl: "/partials/dashboard.html",
            controller: "discussionController",
        })
        .otherwise("/");
});