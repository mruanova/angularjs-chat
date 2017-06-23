var mongoose = require('mongoose');

var commentsSchema = new mongoose.Schema({
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    _post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    commentText: {
        type: String,
        minlength: 1,
        maxlength: 140,
        required: true,
    }
}, { timestamps: true });
mongoose.model('Comments', commentsSchema);