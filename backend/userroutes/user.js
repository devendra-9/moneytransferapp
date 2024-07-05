const express = require('express')
const router = express.Router();
const {user,account} = require('../dbschema/db')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const {JWT} = require('../config')
const {authmiddle} = require('../middleware/middle')

//==============================signup section===========================

const signupbody = zod.object({
    email:zod.string().email(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})

router.post('/signup',async(req,res)=>{
    const {success} = signupbody.safeParse(req.body)
    console.log(req.body)
    if(!success)
    {
        res.status(411).json({
            msg:'incorrect data format'
        })
    }
    else
    {
        const checkexisting = await user.findOne({
            email:req.body.email
        })
        if(checkexisting)
        {
            res.status(411).json({
                msg:'User already exist'
            })
        }
        else
        {
            const createuser = await user.create({
                email:req.body.email,
                password:req.body.password,
                firstname:req.body.firstname,
                lastname:req.body.lastname
            })
            const userId = createuser._id

            await account.create({
                userId,
                balance:1+Math.random()*10000
            })

            const token = jwt.sign({
                userId
            },JWT)

            res.json({
                message:'User created successfully',
                token
            })

        }
    }
})


//==============================signin section==========================

const signinbody = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

router.post('/signin',async(req,res)=>{
    const {success} = signinbody.safeParse(req.body)

    if(!success)
    {
        res.status(411).json({
            msg:'invalid credentials'
        })
    }
    else
    {
        const finduser = await user.findOne({
            email:req.body.email
        })

        if(finduser)
        {
            const upassword = finduser.password === req.body.password

            
            if(upassword)
            {
                const userId = finduser._id

                const token = jwt.sign({
                    userId
                },JWT)

                res.json({
                    token
                })
            } 
            
            else
            {
                res.status(411).json({
                    msg:'Invalid credentials'
                })
            }
            
        }
    }

})


//================================updating data for users===============================

const updateuser = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})

router.put('/update',authmiddle, async(req,res)=>{

    const {success} = updateuser.safeParse(req.body)
    if(!success)
    {
        res.status(411).json({
            msg:'failed to update'
        })
    }
    else
    {
        const updatedata = await user.updateOne(req.body,
            {
                _id:req.userId
            }
        )

        if(updatedata)
        {
            res.json({
                msg:'Updated Successfully'
            })
        }
        else
        {
            res.json({
                msg:'Something went wrong'
            })
        }
    }

    })

    //==================================get user details============================


    router.get('/oneuser',authmiddle,async(req,res)=>{
        const id = req.userId
        const userfind = await user.findOne({
            _id:id
        })
        if(userfind)
        {
            res.json({
                userfind
            })
        }
        else
        {
            res.json({msg:'User Not found'})
        }
    })



    //=================================searchimg for users===========================

    router.get('/alluser',async(req,res)=>{
        const filter = req.query.filter || "";
        
        const users = await user.find({
            $or:
            [{
                    firstname:
                    {
                        "$regex":filter
                    }
                },
                {
                    lastname:
                    {
                        "$regex":filter
                    }
                }  
    ]})
        res.json
        ({
            user: users.map(user => ({
                email:user.email,
                firstname:user.firstname,
                lastname:user.lastname,
                _id:user._id
            }))
        })

    })

module.exports = router