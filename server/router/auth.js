const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

//******************* save data into db using promises *************
// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: `please filled the field properly` });
//     }
//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: `Email already Exist..` });
//             }
//             //new user entry
//             const user = new User({ name, email, phone, work, password, cpassword });
//             user.save().then(() => {
//                 res.status(201).json({ message: `user registered successfully..!` });
//             }).catch((err) => {
//                     res.status(500).json({ error: "Failed to registered..!" })
//                 });
//         }).catch((err) => {
//             console.log(err)
//         })
// });

// router.post('/login', (req, res) => {
//     // console.log(req.body);
//     // res.json({message:"sucessfully login"});

//     const { email, password } = req.body;

//         if (!email || !password ) {
//             return res.status(400).json({ error: `please filled the field properly` });
//         }

//         User.findOne({ email: email })
//             .then((userLogin)=>{
//                 if (!userLogin) {
//                     return res.status(400).json({ error: `Invalid details` });
//                 }
//                 else{
//                     console.log(userLogin);
//                     return res.status(200).json({message:"user login sucessfully"})     
//                 }
//             }) 
//             .catch((err) => {
//                     console.log(err)
//             })
// });

//******************* save data into db using asynch await appraoch *************
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword} = req.body;
    
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
             return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
             return res.status(422).json({ error: "password are not matching" });
        } else {
             const user = new User({ name, email, phone, work, password, cpassword });
            
             //*********** Bcrypt passwordn(its middleware)
            await user.save();
            res.status(201).json({ message: "user registered successfuly" });
        }
        
    } catch (err) {
        console.log(err);
    }

});

// login route 
router.post('/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({error:"Plz Filled the data"})
        }

        const userLogin = await User.findOne({ email: email });//(dbEmail:userEnterEmail)

        // console.log(userLogin);

        if (userLogin) {
            //decrypt user password
            const isMatch = await bcrypt.compare(password, userLogin.password);//(dbpass,userEnterPass)

           

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credientials " });
        } else {
                //JWT AUTHENICATION and token generated here
             // need to genereate the token and stored cookie after the password match 
            token = await userLogin.generateAuthToken();
            console.log(token);

            //cookie generated
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),//user automatic logout means token expire in 30 days
                httpOnly:true
            });
            
            res.json({ message: "user Signin Successfully" });
        }
        } else {
             res.status(400).json({ error: "Invalid Credientials " });
        }

    } catch (err) {
        console.log(err);
    }
});

//about us page
router.get('/about', authenticate ,(req, res) => {
    // console.log(`Hello my About`);
    res.send(req.rootUser);
});

//contact us page
router.get('/getdata',authenticate ,(req, res) => {
    res.send(req.rootUser);
})

module.exports = router;