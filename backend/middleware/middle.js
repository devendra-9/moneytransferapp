const { JWT } = require("../config")
const jwt = require('jsonwebtoken')

const authmiddle = (req,res,next)=>{

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer'))
    {
        res.status(403).json({msg:'No token found'})
    }

    else
    {
        const token=authHeader.split(' ')[1];
        try
        {
            const decode = jwt.verify(token,JWT) 
            req.userId = decode.userId
            next()
        }
        catch(err)
        {
            res.status(403).json({msg:"Reached in error"})
        }
    }

}

module.exports = {authmiddle}