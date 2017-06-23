var mongoose = require('mongoose');

//mongoose.model('Users', usersSchema);
var usersModel = mongoose.model('Users');

//mongoose.model('Categories', categoriesSchema);
var categoriesModel = mongoose.model('Categories');

//mongoose.model('Topics', topicsSchema);
var topicsModel = mongoose.model('Topics');

//mongoose.model('Posts', postsSchema);
var postsModel = mongoose.model('Posts');

//mongoose.model('Comments', commentsSchema);
var commentsModel = mongoose.model('Comments');

//var topicsController = {
module.exports = {
    index: function (request, response) {
        var promise = topicsModel.find({}).populate("_author _category");
        promise.then(function (topics) {
            if (topics) {
                console.log("topics.find", topics.length);
                var promise = postsModel.find({}).populate("_author _topic");
                promise.then(function (posts) {
                    if (posts) {
                        console.log("post.find", posts.length);
                        var promise = commentsModel.find({}).populate("_author _post");
                        promise.then(function (comments) {
                            if (comments) {
                                console.log("comments.find", comments.length);
                                response.json({ topics: topics, posts: posts, comments: comments });
                            } else {
                                console.log("comments not found");
                                response.json({});
                            }
                        }).catch(function (err) {
                            console.log("comments.find.ERROR", err);// if the server fails then log the error in the console
                            response.json({});// but do not propagate it to the browser
                        });
                    } else {
                        console.log("posts not found");
                    }
                }).catch(function (err) {
                    console.log("posts.find.ERROR", err);// if the server fails then log the error in the console
                    response.json({});// but do not propagate it to the browser
                });
            } else {
                console.log("topics not found");
                response.json({});
            }
        }).catch(function (err) {
            console.log("topics.find.ERROR", err);// if the server fails then log the error in the console
            response.json({});// but do not propagate it to the browser
        });
    },
    create: function (request, response) {
        console.log("topicsController.create");
        // console.log("REQUEST: ", request)
        console.log(request.body)
        var topic = new topicsModel(request.body)
        var promise = topic.save();
        promise.then(function (post) {
            console.log("topic.SAVE.SUCCESS");
            response.json({ topic: topic })
        }).catch(function (err) {
            console.log("topic.create.SAVE.ERROR", err);
            response.json({});
        })

    },
    show: function (request, response) {
        console.log("topicsController.show");
        var promise = topicsModel.findOne({ _id: request.params.id }).populate("_author posts posts._author posts.comments posts.comments._author");
        promise.then(function (topic) {
            console.log("Found topic");
            response.json({ topic: topic });
        }).catch(function (err) {
            console.log("topic.show.ERROR", err);
            response.json({});
        })
    }
};