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
    index: function (request, response) {
        var promise = categoriesModel.find({});
        promise.then(function (categories) {
            if (categories) {
                console.log("categories.show", categories.length);
                response.json({ categories: categories });
            } else {
                console.log("categories not found");
                response.json({});
            }
        }).catch(function (err) {
            console.log("categories.show.ERROR", err);// if the server fails then log the error in the console
            response.json({});// but do not propagate it to the browser
        });
    },
    create: function (request, response) {
        var category = new categoriesModel(request.body);
        var promise = category.save();
        promise.then(function (category) {
            console.log("category.SAVE.SUCCESS");
            response.json({ category: category });
        }).catch(function (err) {
            console.log("category.SAVE.ERROR", err);// if the server fails then log the error in the console
            response.json({});// but do not propagate it to the browser
        });
    }
};