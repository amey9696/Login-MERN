const dotenv=require("dotenv"); //dotenv used for secure uname & pass or any importany data here mongodb link
const mongoose=require('mongoose');
const express =require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

dotenv.config({path:'./config.env'});//import .env file

require('./db/conn'); //import conn file
// const User=require('./model/userSchema'); 

app.use(express.json()); //these field show data in json format in postman output

app.use(require('./router/auth')); 


const PORT=process.env.PORT //import PORT NO

//******************** basic of middleware ***********************
// const middleware=(req,res,next)=>{
//     console.log("this is middleware");
//     next(); //suer logged then show middleware check user login or not if login then show about page
//     //if we not write next() then page loading continusely
// }
// middleware()

//**************************basic Routine **************************
// app.get('/',(req,res)=>{
//     res.send("Hello world from the server from app");
// });

// app.get('/about',(req,res)=>{
//     console.log("this is about page");
//     res.send("About page");
// });

app.get('/contact',(req,res)=>{
    // res.cookie("Test",'amey96')
    res.send("Contact here");
});

// app.get('/login',(req,res)=>{ 
//     res.send("Login here");
// });

app.get('/register',(req,res)=>{
    res.send("Register here");
});

app.listen(PORT,()=>{
    console.log(`server is runnign at port no ${PORT}`);
})