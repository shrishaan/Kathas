import express from "express";
import { addcomment, getComments } from "../controller/Comment.controller.js";

const CommentRoute = express.Router();

CommentRoute.post("/add", addcomment);
CommentRoute.get("/get/:blogid", getComments);

export default CommentRoute;
