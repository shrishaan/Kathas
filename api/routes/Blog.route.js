import express from 'express';
import { addBlog, deleteBlog, editBlog, updateBlog, getAllBlog, getBlog } from '../controller/Blog.controller.js';
import upload from '../config/multer.js';

const BlogRoute = express.Router();

BlogRoute.post('/add', upload.single('file'), addBlog);
BlogRoute.get('/edit/:blogid',  editBlog);
BlogRoute.put('/update/:blogid',upload.single('file'), updateBlog);
BlogRoute.delete('/delete/:blogid', deleteBlog);
BlogRoute.get('/get-all', getAllBlog);
BlogRoute.get('/get-blog/:slug', getBlog);

export default BlogRoute;