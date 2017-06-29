app.controller("discussionController", function ($scope, $location, userFactory, discussionFactory, $cookies, $routeParams) {
  $scope.user = {};
  var checkCurrentUser = function () {
    if (!userFactory.currentUser) {
      $location.url("/login");
    } else {
      $scope.currentUser = {}
      $scope.currentUser.id = $cookies.get('currentUserId')
      $scope.currentUser.username = $cookies.get('currentUserUsername')
    }
  }
  
  $scope.logout = function () {
    userFactory.logout(checkCurrentUser);
  }
  $scope.printCookies = function () {
    console.log($cookies.get('currentUserId'))
    console.log($cookies.get('currentUserUsername'))
  }
  if ($location.url() == '/dashboard') {
    checkCurrentUser()
    var setTopics = function (topics) {
      $scope.topics = topics
    }
    var setCategories = function (categories) {
      $scope.categories = categories;
    }
    discussionFactory.getTopics(setTopics)
    discussionFactory.getCategories(setCategories)
    $scope.addTopic = function (userId) {
      $scope.newTopic._author = userId
      console.log("NEW TOPIC: ", $scope.newTopic)
      discussionFactory.addTopic($scope.newTopic, setTopics)
      $scope.newTopic={};
    }
  }
  if ($location.url().match('^/topics/')) {
    checkCurrentUser()
    var setTopic = function (topic) {
      $scope.topic = topic
    }
    discussionFactory.showTopic($routeParams.topicId, setTopic);
    $scope.addPost = function (userId, topicId) {
      console.log("controller.addPost");
      var newPost = { postText: $scope.newPost.postText, _author: userId, _topic: topicId };
      discussionFactory.addNewPost(topicId, newPost, setTopic);
      $scope.newPost=[];
      
    }
  
  }

 
});