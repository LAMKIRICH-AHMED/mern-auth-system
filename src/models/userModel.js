const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        trim:true,
    },
    password:{
         type:String,
         required:[true,'password is required'],
    },
    profilePicture:{
        type:String,
        default:'uploads/profile.png'
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:String,
    otpExpires:Date,
    refreshTokens:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',userSchema);