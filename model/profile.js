import mongoose, { Schema } from "mongoose";



const profileSchema = new mongoose.Schema({
    profilePic:{
        type:String,
        // required:true
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    pronouns:{
        type:String,
        // required:true
    },
    links:{
        type:Map,
        of:String
        // required:true
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
})

export default  mongoose.model('profile',profileSchema)