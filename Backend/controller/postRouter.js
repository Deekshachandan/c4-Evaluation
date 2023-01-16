const { PostModel } = require("../model/postModel")
const { authenticate } = require("../middleware/authenticate")


const express = require("express")
const postRouter = express.Router()
postRouter.use(express.json())
postRouter.use(authenticate)



postRouter.get("/", async(req, res) => {
    try {
        let userID = req.body.userID;
        let queries = req.query;
        queries = { ...queries, userID };
        let post = await PostModel.find(queries);
        console.log("Post found");
        res.status(200).send(post);
      } catch (err) {
        console.log(err);
        res.status(400).send({ err: "Something went wrong" });
      }
})



postRouter.post("/create", async (req, res) => {
  try {
    let payload = req.body;
    let post = new PostModel(payload);
    await post.save();
    res.status(201).send({ msg: "Post created" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Something went wrong" });
  }
})







postRouter.patch("/update/:postID", async (req, res) => {
  try {
    let id = req.params.postID;
    let data = req.body;
    const user_id_doc = PostModel.findOne({ "_id":id })
    const user_Id_Note = user_id_doc.userID
    const userID_making_req = req.body.userID

      if (userID_making_req !== user_Id_Note) {
        res.send({ "msg": "you are not authorized to do so" })
      } else {
        console.log(notes);
        res.send(` Document with ${id} has been updated `);
      }

  }
catch (err) {
      console.log(err);
      res.send(err.message);
    }
  })
  




  postRouter.delete("/delete/:postID", async (req, res) => {
  let id = req.params.postID;
  try {
    let id = req.params.postID;
    let data = req.body;
    const user_id_doc = NoteModel.findOne({ "_id": id })
    const user_Id_Note = user_id_doc.userID
    const userID_making_req = req.body.userID

    if (userID_making_req !== user_Id_Note) {
      res.send({ "msg": "you are not authorized to dod so" })
    }else{
      let notes = await NoteModel.findByIdAndDelete({ _id: id }, data);
      res.send(`id ${id} has been deeleted from DataBase`);
      console.log(notes);
    }
     } catch (err) {
    console.log(err);
    res.send(err.message);
  }
})




module.exports = {
    postRouter
}
