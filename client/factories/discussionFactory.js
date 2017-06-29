app.factory("discussionFactory", function ($http) {
  var factory = {};

  factory.topics = [];
  factory.categories = [];

  factory.topic = {};

  factory.getTopics = function (setTopics) {
    $http.get('/api/topics').then(function (response) {
      if (response.data.topics) {
        factory.topics = response.data.topics;
      } else {
        console.log("Failed to retrieve topics");
      }
      setTopics(factory.topics);
    });
  };

  factory.getCategories = function (setCategories) {
    $http.get('/api/categories').then(function (response) {
      if (response.data.categories) {
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
        factory.topic = response.data.topic;
      } else {
        console.log("Failed to retrieve topic");
      }
      setTopic(factory.topic);
    });
  };

  factory.addTopic = function (postData, setTopics) {
    $http.post('/api/topics', postData).then(function (response) {
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
    $http.put('/dislike', { post: post, user: user }).then(function (data) {
      callback(data.data)
    })
  }
  return factory;
});