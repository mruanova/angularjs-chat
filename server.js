var express = require('express');
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client"))); // index.html
app.use(express.static(path.join(__dirname, "./bower_components")));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/discussdb', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to Mongoose");
    }
});

var usersSchema = new mongoose.Schema({
	username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                return regex_email.test(value);
            },
            message: "Email is invalid."
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 24,
        validate: {
            validator: function (value) {
                return regex_password.test(value);
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
    }
}, { timestamps: true });

// 1 = Web Fundamentals, 2 = Python, 3 = MEAN, 4 = Ruby on rails, 5 = ASP.Net
var categoriesSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    }
}, { timestamps: true });

// html5, css3, git, heroku, aws; mysql, sqlite, apache, django, flask, jinja; mongodb, express, angularjs, nodejs; ruby, rails; c#, visual basic, sqlserver.
var topicSchema = new mongoose.Schema({
    _author: {
        type: String,
        ref: 'Users',
        required: true
    },
	_category: {
        type: String,
        ref: 'Categories',
        required: true
    },
	title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
	description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 140
    }
}, { timestamps: true });

var postsSchema = new mongoose.Schema({
    _author: {
        type: String,
        ref: 'Users',
        required: true
    },
	postText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
    },
	likes:{
		type: Number,
		default: 0,
		required: true
	},
	dislikes:{
		type: Number,
		default: 0,
		required: true
	}
}, { timestamps: true });

var commentsSchema = new mongoose.Schema({
    _author: {
        type: String,
        ref: 'Users',
        required: true
    },
    _post: {
        type: String,
        ref: 'Posts',
        required: true
    },
    commentText: {
        type: String,
        minlength: 1,
        maxlength: 140,
        required: true,
    }
}, { timestamps: true })

mongoose.model('Users', usersSchema);
var UsersModel = mongoose.model('Users');

/*
mongoose.model(Categories, categoriesSchema);
mongoose.model(Topics, topicsSchema);
mongoose.model(Posts, postsSchema);
mongoose.model(Comments, commentsSchema);
 */

var usersController = {
    index: function (req, res) {
        var promise = UsersModel.find({}).sort({ score: -1 }).exec();
        promise.then(function (users) {
            console.log("find all users: success!");
            res.json({ users: users, errors: [] });
        }).catch(function (err) {
            console.log('find all users: error!', err);
            res.json({ users: [], errors: err });
        });
    },
}

app.get('/api', usersController.index);

app.listen(3000, function () {
    console.log("listening on port 3000");
});
