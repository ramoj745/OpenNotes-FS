import bodyParser from "body-parser"
import express from "express"
import methodOverride from "method-override"
import mongoose from "mongoose";
import Post from "./models/userPost.js"
import { config } from 'dotenv';

const port = process.env.PORT || 3000;
const app = express();
config();

// Database Connection //
const dbURI = process.env.DATABASE_URL;
mongoose.connect(dbURI)
    .then (() => app.listen(port, () => {
        console.log(`Connection Established at port ${port}`)
    }) )
    .catch((err) => console.log(err));


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride('_method'));


app.get("/", (req, res) => {
    
    Post.find()
    .then (posts => {
        res.render("pages/root.ejs", {posts})
    })
    .catch (err => {
        console.error(err)
        res.status(500).send("Error retrieving posts.")
    })
})

app.get("/about", (req, res) => {
    res.render("pages/about.ejs")
})

app.post("/post", (req, res) => {
    const content = req.body.content;
    const userName = req.body.id;

    const newPost = new Post({
        userName: userName,
        content: content,
    })

    newPost.save()
    .then (() => {
        res.redirect("/")
    })
    .catch ((err) => {
        console.error(err);
        res.status(500).send("Error making post")
    })
})

app.put("/edit/:id", (req, res) => {
    const postId = req.params.id
    const userName = req.body.id;
    const content = req.body.content;

    Post.findById(postId)
    .then ((post) => {
        post.userName = userName
        post.content = content

        return post.save()
    })
    .catch ((err) => {
        console.error(err);
        res.send("Error finding post ID")
    })
    .then (() => {
        res.redirect("/")
    })
})

app.delete("/delete/:id", (req, res) => {
    const postId = req.params.id;

    Post.findByIdAndDelete(postId)
    .then(() => {
        res.redirect("/")
    })
    .catch (err => {
        console.error(err)
    })
})


