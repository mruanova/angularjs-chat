
app.factory("discussionFactory", function ($http) {
    var factory = {};

    factory.topics = [];

    factory.topic = {};

    factory.getTopics = function(setTopics){
      $http.get('/api/topics').then(function(response){
        if (response.data.topics){
          console.log("Received topics: ", reponse.data.topics);
          factory.topics = response.data.topics
        } else {
          console.log("Failed to retrieve topics")
          console.log(response.data.errors)
        }
        setTopics(factory.topics)
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
