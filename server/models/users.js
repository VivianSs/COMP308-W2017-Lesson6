// require these modules for our user model
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let passortLocalMongoose = require("passport-local-mongoose");

let UserSchema = new Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    passport: {
        type: String,
        default: '',
        trim: true,
        required: 'passport is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: "users"
    }
);

let options = ({missingPasswordError: "Wrong Password"});

UserSchema.plugin(passortLocalMongoose, options);

exports.User = mongoose.model('User', UserSchema);