const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    age: {
        default: 0,
        type: Number
    }
});

module.exports = User;