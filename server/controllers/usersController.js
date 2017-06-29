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
    login: function (request, response) {
        var promise = usersModel.findOne({ email: request.body.email });
        promise.then(function (user) {
            if (user) {
                var validPassword = user.comparePassword(request.body.password);
                if (validPassword) {
                    console.log("LOGIN SUCCESS", user.email);
                    response.json({ user: { id: user._id, username: user.username } });
                }
                else {
                    console.log("INCORRECT PASSWORD", user.email);
                    response.json({ error: { message: "Incorrect password" } });
                }
            }
            else {
                console.log("EMAIL NOT FOUND", user.email);
                response.json({ error: { message: "Email not found, please register" } })
            }
        }).catch(function (err) {
            console.log("LOGIN ERROR", err);
            response.json(err);
        });
    },
    create: function (request, response) {
        var promise = usersModel.findOne({ email: request.body.email });
        promise.then(function (user) {
            if (user) {
                console.log("EMAIL ALREADY EXISTS", user.email);
                response.json({ error: { email: { message: "Email already exists, please login" } } })
            }
            else {
                var user = new usersModel(request.body);
                var promise = user.save();
                promise.then(function (user) {
                    console.log("USER.SAVE.SUCCESS");
                    response.json({ user: user });
                }).catch(function (err) {
                    console.log("USER.SAVE.ERROR", err);
                    response.json(err);
                });
            }
        }).catch(function (err) {
            console.log("LOGIN ERROR", err);
            response.json(err);
        });
    },
    show: function (request, response) {
        var promise = usersModel.findOne({ _id: request.params.id })
            .populate("topics");
        promise.then(function (user) {
            console.log("USER.show.SUCCESS");
            response.json({ user: user });
        }).catch(function (err) {
            console.log("USER.show.ERROR", err);
            response.json(err);
        });
    }
};