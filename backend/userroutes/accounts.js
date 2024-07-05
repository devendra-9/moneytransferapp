const express = require('express')
const router = express.Router();
const {user, account} = require('../dbschema/db')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const {JWT} = require('../config')
const {authmiddle} = require('../middleware/middle')
const mongoose = require('mongoose')


//==========================display details========================

router.get('/balance',authmiddle,async(req,res)=>{
const amount = await account.findOne({
    userId:req.userId
})
if(amount)
{
    res.json
    ({
        balance:amount.balance
    })   
}
else
{
    res.status(403).json({message:'No userfound'})
}
})


//=========================== transfer and receiving payment ==============================

router.post('/transfer',authmiddle,async(req,res)=>{
    const session = await mongoose.startSession();
    
    session.startTransaction();
    const{amount,to} = req.body;

    const finduser = await account.findOne({userId:req.userId}).session(session);
    if(!account || finduser.balance<amount)
        {
            await session.abortTransaction()
            res.status(400).json({
                success:false,
                msg:'Insufficient balance'
            })
            
        }
    else
        {
            const toacc = await account.findOne({userId:to}).session(session);
            if(!toacc)
                {
                    await session.abortTransaction();
                    return res.status(404).json({success:false,msg:'User not found'})
                }
            else
                {
                    await account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session();
                    await account.updateOne({userId:to},{$inc:{balance:amount}}).session();

                    await session.commitTransaction();
                    res.status(200).json({
                        success:true,
                        msg:'Payment Successful'
                    })
                }
        }
})


module.exports = router