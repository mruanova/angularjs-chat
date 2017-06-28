var mongoose = require('mongoose');

var bcrypt = require("bcryptjs");
var regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/;

var usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Email is already registered"],
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
        maxlength: 240,
        validate: {
            validator: function (value) {
                return regex_password.test(value);
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topics',
    }]
}, { timestamps: true });

usersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

usersSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

usersSchema.pre('save', function (done) {
    if (!this.isModified('password')) { return done() };
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    done();
})

mongoose.model('Users', usersSchema);