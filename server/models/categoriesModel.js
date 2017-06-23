var mongoose = require('mongoose');

// 1 = Web Fundamentals, 2 = Python, 3 = MEAN, 4 = Ruby on rails, 5 = ASP.Net
var categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topics',
    }]
}, { timestamps: true });
mongoose.model('Categories', categoriesSchema);