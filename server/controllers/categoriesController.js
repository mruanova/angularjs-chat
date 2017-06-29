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
    index: function (request, response) {
        var promise = categoriesModel.find({});
        promise.then(function (categories) {
            if (categories) {
                console.log("categories.show", categories.length);
                response.json({ categories: categories });
            } else {
                console.log("categories not found");
                response.json(err);
            }
        }).catch(function (err) {
            console.log("categories.show.ERROR", err);
            response.json(err);
        });
    },
    create: function (request, response) {
        var category = new categoriesModel(request.body);
        var promise = category.save();
        promise.then(function (category) {
            console.log("category.SAVE.SUCCESS");
            response.json({ category: category });
        }).catch(function (err) {
            console.log("category.SAVE.ERROR", err);
            response.json(err);
        });
    }
};