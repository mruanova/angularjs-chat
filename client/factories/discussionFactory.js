
app.factory("discussionFactory", function ($http) {
    var factory = {};

    factory.topics = [];
    factory.categories = [];

    factory.topic = {};

    factory.getTopics = function(setTopics){
      $http.get('/api/topics').then(function(response){
        if (response.data.topics){
          console.log("Received topics: ", response.data.topics);
          factory.topics = response.data.topics
        } else {
          console.log("Failed to retrieve topics")
          console.log(response.data.errors)
        }
        setTopics(factory.topics)
      })
    }

    factory.getCategories = function(setCategories){
      $http.get('/api/categories').then(function(response){
        if (response.data.categories){
          console.log("Received categories: ", response.data.categories);
          factory.categories = response.data.categories;

          if (factory.categories.length < 1){
            var categories = ["Web Fundamentals", "Python", "MEAN", "Ruby on Rails", "ASP.NET"];
            for (var x = 0; x < categories.length; x += 1){
              $http.post('/api/category', {name:categories[x]}).then(function(response){
                console.log(response);
              })
            }
          }

        } else {
          console.log("Failed to retrieve categories")
          console.log(response.data.errors)
        }
        setCategories(factory.categories)
      })
    }


    factory.showTopic = function (topicId, setTopic) {
      $http.get("/api/topic/" + topicId).then(function (response) {
        if(response.data.topic){
          console.log("Retrieved topic: ", response.data.topic);
          factory.topic = response.data.topic;
        } else {
          console.log("Failed to retrieve topic")
          console.log(response.data.errors)
        }
        setTopic(factory.topic)
      });
    }

    factory.addTopic = function(postData, setTopics){
      $http.post('/api/topic', postData).then(function(response){
        console.log(response);

        factory.getTopics(setTopics);

      })
    }

    factory.addNewPost = function (postdata, finishedAddingPost) {
      $http.post('/api/posts', postdata).then(function (response) {
        finishedAddingPost();
      });
    }
    return factory;
})

// app.factory("commentFactory", function ($http) {
//     var factory = {};
//     var comments = [];
//     factory.getComments = function (receivedComments) {
//         $http.get("/api/comments").then(function (response) {
//             comments = response.data.comments;
//             receivedComments(comments);
//
//         });
//     }
//     factory.addNewComment = function (postdata, finishedAddingComment) {
//         $http.post('/api/comments', postdata).then(function (response) {
//             finishedAddingComment();
//         });
//     }
//     return factory;
// });
