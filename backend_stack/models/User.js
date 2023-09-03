const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        unique: true,
        required : [true, "Please add a username"]
    },
    email: {
        type: String,
        required : [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^[A-Za-z0-9._%+-]+@uth\.gr/, "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        unique: false,
        required : [true, "Please add a password"] 
    },
    confirm : {
        type : String,
        unique : false,
        required : [true, "Please add a confirm"] 
    },
    role: {
        type: String,
        required: [true, "Please add the role of the new user"],
        default: 'admin'
    }    
 },
 {
    timestamps: true,
 }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;