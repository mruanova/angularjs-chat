
app.factory("discussionFactory", function ($http) {
  var factory = {};

  factory.topics = [];
  factory.categories = [];

  factory.topic = {};

  factory.getTopics = function (setTopics) {
    $http.get('/api/topics').then(function (response) {
      if (response.data.topics) {
        console.log("Received topics: ", response.data.topics);
        factory.topics = response.data.topics;
      } else {
        console.log("Failed to retrieve topics");
        console.log(response.data.errors);
      }
      setTopics(factory.topics);
    });
  };

  factory.getCategories = function (setCategories) {
    $http.get('/api/categories').then(function (response) {
      if (response.data.categories) {
        console.log("Received categories: ", response.data.categories);
        factory.categories = response.data.categories;
        if (factory.categories.length < 1) {
          var categories = ["Tech", "Sports", "Entertainment", "News", "Random"];
          for (var x = 0; x < categories.length; x += 1) {
            $http.post('/api/categories', { name: categories[x] }).then(function (response) {
              console.log(response);
            })
          }
        }
      } else {
        console.log("Failed to retrieve categories");
        console.log(response.data.errors);
      }
      setCategories(factory.categories);
    });
  };

  factory.showTopic = function (topicId, setTopic) {
    $http.get("/api/topics/" + topicId).then(function (response) {
      if (response.data.topic) {
        console.log("Retrieved topic: ", response.data.topic);
        factory.topic = response.data.topic;
        console.log(factory.topic);
      } else {
        console.log("Failed to retrieve topic");
        console.log(response.data.errors);
      }
      setTopic(factory.topic);
    });
  };

  factory.addTopic = function (postData, setTopics) {
    $http.post('/api/topics', postData).then(function (response) {
      console.log(response);
      factory.getTopics(setTopics);
    });
  };

  factory.addNewPost = function (topicId, postData, setTopic) {
    $http.post('/api/topics/' + topicId + '/posts', postData).then(function (response) {
      factory.showTopic(topicId, setTopic);
    });
  }
  factory.like = function (post, user, callback) {
    $http.put('/like', { post: post, user: user }).then(function (data) {
      callback(data.data)
    })
  }
  factory.dislike = function (post, user, callback) {
    console.log(user)
    $http.put('/dislike', { post: post, user: user }).then(function (data) {
      callback(data.data)
    })
  }
  return factory;
});

app.factory("commentFactory", function ($http) {
  var factory = {};
  var comments = [];
  factory.getComments = function (receivedComments) {
    $http.get("/api/comments").then(function (response) {
      comments = response.data.comments;
      receivedComments(comments);
    });
  };

  factory.addNewComment = function (postdata, finishedAddingComment) {
    console.log("factory.addNewComment");
    $http.post('/api/comments', postdata).then(function (response) {
      finishedAddingComment();
    });
  };
  return factory;
});