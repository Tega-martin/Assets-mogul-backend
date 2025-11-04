const express = require("express")
const compression = require ('compression')
const helmet = require ('helmet')
const morgan = require('morgan')
const app = express()
const PORT = 2430
app.use(express.json())
const cors = require('cors')
const fileUploader = require('express-fileupload')
const db = require('./config/db')
const router = require('./routers/userRouter')
const depositRouter = require('./routers/depositRouter')
const investmentRouter = require('./routers/investmestRouter')
const kycVerification = require('./routers/kycRouter')
const Ticket = require('./routers/ticketRouter')
const twoFactorAuthRoutes = require('./routers/2faRouter');




app.use(compression()); 
app.use(morgan('combined')); 
app.use(helmet()); 
app.use(cors({origin:"*"}));
require('./croneJobs')


app.use(fileUploader({
    useTempFiles: true,
}))
app.use(router)
app.use(depositRouter)
app.use(investmentRouter)
app.use(kycVerification)
app.use(Ticket)

app.use('/', twoFactorAuthRoutes);



app.listen(PORT, ()=>{
    console.log(`app is listening to ${PORT}`)
})
