// const express = require('express')

// const quiz = express()

// const multer = require('multer')
// const path = require('path')
// const bodyParser = require('body-parser')
// const XLSX = require('xlsx');
// const async = require('async');
// const Quiz = require('../models/Quiz');

// // quiz.use(bodyParser.urlencoded({extended : true}))

// // quiz.use(express.statiwc(path.resolve(__dirname,'public')))

// quiz.get('/', async (req, res) => {
//     try {
//         const quiz = await Quiz.find();
//         res.json(quiz);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// })


// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });


// var upload = multer({storage:storage})

// const quizController = require('../controller/quizController')
// //Imp1
// //quiz.post('/importQuiz',upload.single("xlsx"),quizController.importQuiz)

// //Imp2
// // quiz.post('/', upload.single("xlsx"), (req, res, next) => {
// //     try {
// //         let path = req.file.path;
// //         var workbook = XLSX.readFile(path);
// //         var sheet_name_list = workbook.SheetNames;
// //         let jsonData = XLSX.utils.sheet_to_json(
// //             workbook.Sheets[sheet_name_list[0]]
// //         );
// //         if (jsonData.length === 0) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Sheet has no data",
// //             });
// //         }

// //         let count = 0;
// //         let duplicateCount = 0;
// //         async.eachSeries(jsonData, (item, callback) => {
// //             Candidate.findOne({ qid: item.qid }).count(function (err, num) {
// //                 if (num > 0) {
// //                     duplicateCount++;
// //                     console.log(`Skipping duplicate item: ${item['qid']}`);
// //                     return callback();
// //                 }

// //                 const quiz = new Quiz(item);
// //                 quiz.save(function (err) {
// //                     if (!err) count++;
// //                     callback(err);
// //                 });
// //             });
// //         }, (err) => {
// //             if (err) {
// //                 console.error(err);
// //             } else {
// //                 let message = (count === 0) ? 'No unique items found!' : `${count} unique items saved successfully!`;
// //                 message += (duplicateCount === 1) ? '  1 duplicate!' : `  ${duplicateCount} duplicates!`;

// //                 console.log(`${count} unique items saved successfully!`);
// //                 return res.status(201).json({
// //                     success: true,
// //                     message: message
// //                 });
// //             }
// //         });

// //     } catch (err) {
// //         return res.status(500).json({ success: false, message: err.message });
// //     }
// // });

// //Imp3
// // quiz.post('/', upload.single('xlsx'), (req, res) => {
// //     let path = req.file.path;
// //         var workbook = XLSX.readFile(path);
// //         var sheet_name_list = workbook.SheetNames;
// //         let jsonData = XLSX.utils.sheet_to_json(
// //             workbook.Sheets[sheet_name_list[0]]
// //         );
// //         if (jsonData.length === 0) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Sheet has no data",
// //             });
// //         }
// //     const { qid,question,option1,option2,option3,option4,coption } = req.file;
  
// //     const file = new Quiz({
// //       qid,
// //       question,
// //       option1,
// //       option2,
// //       option3,
// //       option4,
// //       coption
// //     });
  
// //     file.save().then(() => {
// //       res.json({ message: 'File uploaded successfully' });
// //     }).catch((error) => {
// //       console.error('Error saving file to MongoDB:', error);
// //       res.status(500).json({ message: 'Failed to upload file' });
// //     });
// //   });

// //imp4
// quiz.post('/', upload.single("xlsx"), async(req, res) => {
//     try{
//     let path = req.file.path;
//     var xlFile = XLSX.readFile(path);
//     let sheet = xlFile.Sheets[xlFile.SheetNames[0]]

//     let P_JSON = XLSX.utils.sheet_to_json(sheet)

//     await Quiz.insertMany(P_JSON).then((result)=>{
//         if(result.length>0){
//             res.send({status:200,message:'success',Count:result.length})

//         }else{
//             res.send(new ErrResponse(201,"No Data Found"))
//         }
//     })
//     }
//     catch(e){
//         res.send(new ErrResponse(404,e.message))
//     }
// })

// module.exports = quiz


const express = require('express')

const quiz = express()

const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const XLSX = require('xlsx');
const async = require('async');
const Quiz = require('../models/Quiz');
const QuizBundle = require('../models/QuizBundle')

// quiz.use(bodyParser.urlencoded({extended : true}))

// quiz.use(express.statiwc(path.resolve(__dirname,'public')))

quiz.get('/', async (req, res) => {
    try {
        const quiz = await QuizBundle.find();
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});


var upload = multer({storage:storage})

const quizController = require('../controller/quizController')
//Imp1
//quiz.post('/importQuiz',upload.single("xlsx"),quizController.importQuiz)

//Imp2
// quiz.post('/', upload.single("xlsx"), (req, res, next) => {
//     try {
//         let path = req.file.path;
//         var workbook = XLSX.readFile(path);
//         var sheet_name_list = workbook.SheetNames;
//         let jsonData = XLSX.utils.sheet_to_json(
//             workbook.Sheets[sheet_name_list[0]]
//         );
//         if (jsonData.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Sheet has no data",
//             });
//         }

//         let count = 0;
//         let duplicateCount = 0;
//         async.eachSeries(jsonData, (item, callback) => {
//             Candidate.findOne({ qid: item.qid }).count(function (err, num) {
//                 if (num > 0) {
//                     duplicateCount++;
//                     console.log(`Skipping duplicate item: ${item['qid']}`);
//                     return callback();
//                 }

//                 const quiz = new Quiz(item);
//                 quiz.save(function (err) {
//                     if (!err) count++;
//                     callback(err);
//                 });
//             });
//         }, (err) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 let message = (count === 0) ? 'No unique items found!' : `${count} unique items saved successfully!`;
//                 message += (duplicateCount === 1) ? '  1 duplicate!' : `  ${duplicateCount} duplicates!`;

//                 console.log(`${count} unique items saved successfully!`);
//                 return res.status(201).json({
//                     success: true,
//                     message: message
//                 });
//             }
//         });

//     } catch (err) {
//         return res.status(500).json({ success: false, message: err.message });
//     }
// });

//Imp3
// quiz.post('/', upload.single('xlsx'), (req, res) => {
//     let path = req.file.path;
//         var workbook = XLSX.readFile(path);
//         var sheet_name_list = workbook.SheetNames;
//         let jsonData = XLSX.utils.sheet_to_json(
//             workbook.Sheets[sheet_name_list[0]]
//         );
//         if (jsonData.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Sheet has no data",
//             });
//         }
//     const { qid,question,option1,option2,option3,option4,coption } = req.file;
  
//     const file = new Quiz({
//       qid,
//       question,
//       option1,
//       option2,
//       option3,
//       option4,
//       coption
//     });
  
//     file.save().then(() => {
//       res.json({ message: 'File uploaded successfully' });
//     }).catch((error) => {
//       console.error('Error saving file to MongoDB:', error);
//       res.status(500).json({ message: 'Failed to upload file' });
//     });
//   });

//imp4
// quiz.post('/', upload.single("xlsx"), async(req, res) => {
//     try{
    
//     // const { quizid } = req.body;   
//     let path = req.file.path;
//     var xlFile = XLSX.readFile(path);
//     let sheet = xlFile.Sheets[xlFile.SheetNames[0]]

//     let P_JSON = XLSX.utils.sheet_to_json(sheet)

//     await Quiz.insertMany(P_JSON).then((result)=>{
//         if(result.length>0){
//             res.send({status:200,message:'success',Count:result.length})

//         }else{
//             res.send(new ErrResponse(201,"No Data Found"))
//         }
//     })
//     }
//     catch(e){
//         res.send(new ErrResponse(404,e.message))
//     }
// })


// app.post('/api/endpoint', async (req, res) => {
//     try {
//       // Process the incoming request and retrieve the data
//       const { csvField, field1, field2 } = req.body;
  
//       // Convert the CSV field to JSON
//       const jsonArray = await csvtojson().fromString(csvField);
  
//       // Perform any necessary operations with the JSON data
//       // ...
  
//       // Send a response
//       res.json({ message: 'Request processed successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   });

//   app.post('/api/parents', async (req, res) => {
//     try {
//       // Extract the data from the request body
//       const { parentProperty1, parentProperty2, nestedData } = req.body;
  
//       // Create a new parent document
//       const parent = new ParentModel({
//         parentProperty1,
//         parentProperty2,
//         nestedData
//       });
  
//       // Save the parent document to the database
//       await parent.save();
  
//       res.status(201).json({ message: 'Parent document created successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   });

// quiz.post('/', upload.single("xlsx"), async(req, res) => {
//     try{
    
//     const { quizid,quiz } = req.body;   
//     const quizbundle = new QuizBundle({ quizid, quiz })
//     let path = req.file.path;
//     var xlFile = XLSX.readFile(path);
//     let sheet = xlFile.Sheets[xlFile.SheetNames[0]]

//     let P_JSON = XLSX.utils.sheet_to_json(sheet)

    

//     const ret = await quizbundle.save()

//     }
//     catch(e){
//         res.send(new ErrResponse(404,e.message))
//     }
// })

//new Imp
quiz.post('/', upload.single('xlsx'), async (req, res) => {
    try {
      const { quizid } = req.body;
      let path = req.file.path;
      var xlFile = XLSX.readFile(path);
      let sheet = xlFile.Sheets[xlFile.SheetNames[0]]
      let json = XLSX.utils.sheet_to_json(sheet)
  
      const questionData = json.map(q => ({
        qid: q.qid,
        question: q.question,
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
        coption: q.coption
      }));
  
      const parent = new QuizBundle({
        quizid,
        quiz : questionData
      });
  
      await parent.save();
  
      res.status(201).json({ message: 'Parent document created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  quiz.get('/:quizid', async (req, res) => {
    try {
      const { quizid } = req.params;
  
      const quiz = await QuizBundle.findOne({ quizid: quizid }).populate("quiz");
  
      if (quiz) {
        res.status(200).json(quiz);
      } else {
        res.status(404).json({ message: 'Quiz not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }

    
  });
module.exports = quiz