var mongoose = require('mongoose');

//mongoose.model('Users', usersSchema);
var usersModel = mongoose.model('Users');

//mongoose.model('Categories', categoriesSchema);
var categoriesModel = mongoose.model('Categories');

//mongoose.model('Topics', topicsSchema);
var topicsModel = mongoose.model('Topics');

//mongoose.model('Posts', postsSchema);
var postsModel = mongoose.model('Posts');

module.exports = {
    create: function (request, response) {
        console.log(request.body);
        var promise = topicsModel.findOne({ _id: request.params.id })
        promise.then(function (topic) {
            console.log("Found topic:", topic)
            var promise = usersModel.findOne({ _id: request.body._author })
            promise.then(function (user) {
                console.log("Found user topics:", user)
                var newPost = new postsModel(request.body);
                var promise = newPost.save();
                promise.then(function (post) {
                    console.log("Saved new post, pushing into topic.posts")
                    topic.posts.push(post);
                    var promise = topic.save();
                    promise.then(function (topic) {
                        console.log("Saved topic", topic)
                        user.topics.push(topic);//todo
                        var promise = user.save();
                        promise.then(function (user) {
                            console.log("Saved user topics", topic)
                            response.json({ topic: topic });
                        }).catch(function (err) {
                            console.log("post.user.save.topics.ERROR", err);
                            response.json(err);
                        })
                    }).catch(function (err) {
                        console.log("post.topic.save.ERROR", err);
                        response.json(err);
                    })
                }).catch(function (err) {
                    console.log("post.save.ERROR", err);
                    response.json(err);
                })
            }).catch(function (err) {
                console.log("topic.show.ERROR", err);
                response.json(err);
            })
        }).catch(function (err) {
            console.log("topic.find.ERROR", err);
            response.json(err);
        });
    }
};