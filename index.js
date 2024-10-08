import bodyParser from "body-parser"
import express from "express"
import methodOverride from "method-override"


const port = 3000;
const app = express();
let posts = [];
let postCounter = 0

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use(methodOverride('_method'));


app.get("/", (req, res) => {
    res.render("pages/root.ejs", {posts});
})

app.post("/post", (req, res) => {
    const content = req.body.content;
    const userName = req.body.id;

    const newPost = {
        postId: postCounter++,
        userName: userName,
        content: content,
        createdAt: new Date(),
    };

    posts.push(newPost);
    console.log(posts)

    res.redirect('/');

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, 
        timeZoneName: 'short', 
    };
    
    newPost.createdAt = newPost.createdAt.toLocaleString('en-US', options);

})

app.put("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const userName = req.body.id;
    const content = req.body.content;
    const post = posts.find(p => p.postId === postId);

    post.userName = userName;
    post.content = content;
    console.log(`Post with ID ${postId} updated:`, post);

    res.redirect("/")

})

app.delete("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.postId === postId);

    posts.splice(postIndex, 1)
    console.log(`Post ID: ${postId} Removed`)

    res.redirect("/")

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


