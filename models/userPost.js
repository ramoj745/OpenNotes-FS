import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true});

const Post = mongoose.model("Post", postSchema);
export default Post;
