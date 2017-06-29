var mongoose = require('mongoose');

//mongoose.model('Users', usersSchema);
var usersModel = mongoose.model('Users');

//mongoose.model('Categories', categoriesSchema);
var categoriesModel = mongoose.model('Categories');

//mongoose.model('Topics', topicsSchema);
var topicsModel = mongoose.model('Topics');

//mongoose.model('Posts', postsSchema);
var postsModel = mongoose.model('Posts');

//var topicsController = {
module.exports = {
    index: function (request, response) {
        var promise = topicsModel.find({}).populate("_author _category");
        promise.then(function (topics) {
            console.log("topics.find", topics.length);
            var promise = postsModel.find({}).populate("_author _topic");
            promise.then(function (posts) {
                console.log("post.find", posts.length);
                response.json({ topics: topics, posts: posts });
            }).catch(function (err) {
                console.log("posts.find.ERROR", err);
                response.json(err);
            });
        }).catch(function (err) {
            console.log("topics.find.ERROR", err);
            response.json(err);
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
            response.json(err);
        })

    },
    show: function (request, response) {
        console.log("topicsController.show");
        var promise = topicsModel.findOne({ _id: request.params.id })
            .populate("_author posts")
            .populate({ path: 'posts', populate: { path: '_author', select: 'username' } });
        promise.then(function (topic) {
            console.log("found topic");
            response.json({ topic: topic });
        }).catch(function (err) {
            console.log("topic.show.ERROR", err);
            response.json(err);
        })
    }
};