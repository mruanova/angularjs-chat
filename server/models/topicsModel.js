var mongoose = require('mongoose');

// html5, css3, git, heroku, aws; mysql, sqlite, apache, django, flask, jinja; mongodb, express, angularjs, nodejs; ruby, rails; c#, visual basic, sqlserver.
var topicsSchema = new mongoose.Schema({
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    _category: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }]
}, { timestamps: true });
mongoose.model('Topics', topicsSchema);