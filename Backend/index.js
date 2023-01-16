const express = require("express")
const {autenticate}=require("./middleware/authenticate")
require('dotenv').config()
const {connect} =require("./config/db")
const {userRouter}=require("./controller/userRouter");
const {postRouter}=require("./controller/postRouter")
const app = express()
let cors = require("cors");



app.use(cors());
app.use(cors({origin:"*"}))

app.use("/users", userRouter)

app.use(autenticate)
app.use("/posts", postRouter)

app.listen(process.env.port, async() => {
    try {
        await connect
        console.log(`server started on port ${process.env.port}`)
    }
    catch (err) {
        console.log(`ee while starting the port on ${process.env.port}`)
    }
})




