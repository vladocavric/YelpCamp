let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'comment'
    // }],
    // pizzeria: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'pizzeria'
    // }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);