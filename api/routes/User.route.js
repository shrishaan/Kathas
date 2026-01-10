import express from "express";
import { getUser, updateUser } from "../controller/User.controller.js";
import upload from "../config/multer.js";

const UserRoute = express.Router();

UserRoute.get("/get-user/:userid", getUser);
UserRoute.put("/update-user/:userid", upload.single(), updateUser);

export default UserRoute;
