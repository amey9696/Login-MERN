const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongooose.Schema({//userSchema is instance of mongoose
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    }, 
    tokens: [
        {
            token: {
               type: String,
               required:true 
            }
        }
    ]
})

// we are hashing the password  
userSchema.pre('save', async function (next) {
    // console.log("Hii I am pre ");
    //this keyword not work in arrow function

    if (this.isModified('password')) {
        // console.log("Hii I am pre password ");
        this.password = await bcrypt.hash(this.password, 12);//(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12);//(this.cpassword, 12)
    }
    next();
});

// we are generating token 
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);//sign(payload, secret key)
        this.tokens = this.tokens.concat({ token: token });//(first is dbtoken,2nd generated token)
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}
// collection creation 
const User = mongooose.model('USER', userSchema);
module.exports = User;

// userSchema.methods.generateAuthToken = async function () {
//     try {
//         let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({ token: token });
//         await this.save();
//         return token;
//     } catch (err) {
//         console.log(err);
//     }
// }