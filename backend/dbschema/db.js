const mongoose = require('mongoose')

const conurl = 'mongodb+srv://devendrakandpal07:admin123@cluster0.x3zl6sc.mongodb.net/paytm'
const result = mongoose.connect(conurl)
if(result)
{
    console.log('connected to database')    
}

const userdata = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:
    {
        type:String,
        required:true,
        minLength:6
    },
    firstname:
    {
        type:String,
        required:true,
        trim:true,
        maxLength:50

    },
    lastname:
    {
        type:String,
        required:true,
        trim:true,
        maxLength:50

    }
})

const accountdetails = new mongoose.Schema({
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance:
    {
        type:Number,
        required:true
    }
})

const user = mongoose.model('user',userdata);
const account = mongoose.model('account',accountdetails);
module.exports = {user,account}