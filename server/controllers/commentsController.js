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

module.exports = {
    create: function (request, response) {
        var comment = new commentsModel(request.body);
        var promise = usersModel.findOne({ _id: request.body._author })
        promise.then(function (user) {
            user.comments.push(comment);
            var promise = user.save();
            promise.then(function (user) {
                console.log("comments.create.user.save success");
                var promise = comment.save();
                promise.then(function (comment) {
                    console.log("comment.SAVE.SUCCESS");
                    response.json({ message: "Successfully created comment", comment: comment });
                }).catch(function (err) {
                    console.log("comment.SAVE.ERROR", err);// if the server fails then log the error in the console
                    response.json({});// but do not propagate it to the browser
                });
            }).catch(function (err) {
                console.log("comments.create.user.save.ERROR", err);
                response.json({})
            });
        }).catch(function (err) {
            console.log("comments.create.user.findOne.ERROR", err);
            response.json({})
        });
    }
};