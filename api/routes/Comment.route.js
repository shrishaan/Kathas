import express from "express";
import { addcomment, commentCount, getComments } from "../controller/Comment.controller.js";

const CommentRoute = express.Router();

CommentRoute.post("/add", addcomment);
CommentRoute.get("/get/:blogid", getComments);
CommentRoute.get("/get-count/:blogid", commentCount);

export default CommentRoute;
