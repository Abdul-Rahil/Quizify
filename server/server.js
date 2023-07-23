const express = require('express');
const app = express();
app.use(express.json())
const Student = require('./Models/StudentModel')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://rahilab1110:rahil1234@cluster0.4s4uo82.mongodb.net/')
.then(()=>
{
    console.log('connected sucess')
    app.listen(5501, ()=> {
        console.log('api running with port 5501')
    })
   
   
}).catch((error) => {
    console.log(error)
})
app.post('/register', async(req, res) => {
    try {
        
        const student = await Student.create(req.body)
        res.status(200).json(student);
                }
            catch (error){
                console.log(error.message);
                res.status(400).json({message: error.message})
            }
        })

 app.post('/login', async(req, res) => {
         try {
            //    let token ;
               const {id,password} = req.body;

               if(!id || !password){
                return res.status(400).json({error:"Please fill data"})
               }
               const userLogin = await Student.findOne({id});
               if(userLogin){
                const isMatch = await bcrypt.compare(password,userLogin.password)
                // console.log(isMatch)

                // token = await userLogin.generateAuthToken()
                // console.log(token);

                // res.cookie("jwtoken",token,{
                //     expires: new Date(Date.now() + 9999999999),
                //     httpOnly:true
                // });
                if(isMatch){
                    res.status(400).json({error:"Invalid Credentials"});
                }else{
                    res.json({message:"Student login successfull"})
                }
               }else{
                res.status(400).json({error:"Invalid credentials"})
               }
                    }catch (error){
                        console.log(error.message);
                        res.status(500).json({message: error.message})
                    }
                })

        app.get('/allStudents',async (req,res)=>{
            try{
                const allStudents = await Student.find({})
                res.send({data:allStudents})
                res.status(200).json(allStudents)
            }catch(error){
                console.log(error)
            }
        })