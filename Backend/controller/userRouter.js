const express = require("express")
const { UserModel } = require("../model/userModel")
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router
userRouter.use(express.json())


userRouter.get("/", (req, res) => {
    try {
        const data = UserModel.find()
        console.log(data)
        res.send("All users")
    }
    catch (err) {
        res.send({ "msg": "could not get details of user, something went wrong" })
    }
})



userRouter.post("/register", (req, res) => {
    const { name, email, password, gender } = req.body
    try {
        bcrypt.hash(password, 8, async (err, newSecuredPassword) => {
            if (err) {
                console.log("err occured while hashing")
            } else {
                const user = new UserModel({ name, email, password: newSecuredPassword, age })
                await user.save()
                console.log(user)
                res.send(user)
            }
        })
    }

    catch (err) {
        res.send(res.send({ "msg": "could not Signup, something went wrong" }))
    }

})





userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email })

      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, function (err, result) {
          if (result) {
            const token = jwt.sign({ userId: user[0]._id }, 'deeksha');
            res.send({ "msg": "Login Successfull", "token": token })
          } 
          else { res.send("Wrong Credntials") }
        });
      } else {
        res.send("Wrong Credntials")
      }
  
    } catch (err) {
      console.log("Something went wrong");
      res.send("Could not Login");
    }
  })





module.exports = {
    userRouter
}