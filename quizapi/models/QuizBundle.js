const mongoose = require('mongoose');

var quizSchema = new mongoose.Schema({
    qid:{
        type:Number,
        required:true,
        unique:true
    },
    question:{
        type:String
    },
    option1:{
        type:String
    },
    option2:{
        type:String
    },
    option3:{
        type:String
    },
    option4:{
        type:String
    },
    coption:{
        type:String
    }
})

const quizBundleSchema = new mongoose.Schema({
  quizid: {
    type: Number,
    required: true
  },
  
  quiz: [quizSchema]
});

module.exports = mongoose.model('quizBundle', quizBundleSchema);