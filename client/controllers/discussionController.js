app.controller("discussionController", function ($scope, $location, userFactory, discussionFactory, commentFactory, $cookies, $routeParams) {
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
  // checkCurrentUser();
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
      $scope.categories = categories
      console.log(categories)
    }
    discussionFactory.getTopics(setTopics)
    discussionFactory.getCategories(setCategories)
    $scope.addTopic = function (userId) {
      $scope.newTopic._author = userId
      console.log("NEW TOPIC: ", $scope.newTopic)
      discussionFactory.addTopic($scope.newTopic, setTopics)
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
      // $route.reload();
    }
    $scope.addNewComment = function (postidfrompage, newcomment) {
      console.log("controller.addNewComment");
      var newcommentdata = {
        commentText: newcomment.commentText,
        _author: $scope.user.id,
        _post: postidfrompage
      };
      discussionFactory.addNewComment(newcommentdata, function () {
        $scope.newcomment = {};
      })
      // $route.reload();
    }
  }
  $scope.like = function (post_id) {
    discussionFactory.like(post_id, $scope.user_id, function (data) {
      //connects the likes to the factory
      if (data.err) {
        console.log(data.err)
        // logs any errors
      }
      else {
        console.log(data.like)
        $scope.showTopic();
        // else adds like to scope.
      }
    })
  }
  $scope.dislike = function (post_id) {
    //connects the dislikes to the factory
    discussionFactory.dislike(post_id, $scope.user_id, function (data) {

      if (data.err) {
        //logs any errors
        console.log(data.err)

      }
      else {
        // else adds dislike to scope
        console.log(data.dislike)
        $scope.showTopic();

      }
    })
  }
});