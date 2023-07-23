const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
        // default:"Shoaib"
    },
    id:{
        type:Number,
        required:true
        // default:"48"
    },
    password:{
        type:String,
        // default:"shoaib"
        required:true
    }
    // performance:{
    //     type:Number,
    //     default:"10"
    // }
})
const Student = mongoose.model('Student',studentSchema)
module.exports = Student