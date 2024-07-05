const express = require('express')
const app = express();
const cors = require('cors')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const userlink = require('./userroutes/index')
app.use(cookieparser())
app.use(cors())
app.use(bodyparser.json())
app.use('/api/v1',userlink)
const port = 4000;
app.listen(port,()=>{
    console.log('listening to port 4000')
})