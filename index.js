import bodyParser from "body-parser"
import express from "express"

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("pages/root.ejs")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
