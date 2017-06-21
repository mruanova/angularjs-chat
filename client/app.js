var app = angular.module("app", ["ngRoute", "ngMessages", "ngCookies"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "/partials/login.html",
            controller: "usersController",
        })
        .when("/register", {
            templateUrl: "/partials/register.html",
            controller: "usersController",
        })
        .when("/dashboard", {
            templateUrl: "/partials/dashboard.html",
            controller: "discussionController",
        })
        .when("/users/:userId", {
            templateUrl: "/partials/user.html",
            controller: "usersController",
        })
        .when("/topics/:topicId", {
            templateUrl: "/partials/topic.html",
            controller: "discussionController",
        })
        .otherwise("/login");
});
