var mongoose = require('mongoose');

var postsSchema = new mongoose.Schema({
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    postText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    dislikes: {
        type: Number,
        default: 0,
        required: true
    },
    _topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topics",
        required: true
    }
}, { timestamps: true });
mongoose.model('Posts', postsSchema);