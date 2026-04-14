import express from 'express';
import { addBlog, deleteBlog, editBlog, updateBlog, getAllBlog, getBlog, getRelatedBlog, getBlogByCategory, search, showAllBlogs } from '../controller/Blog.controller.js';
import upload from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js';
import { onlyadmin } from '../middleware/onlyadmin.js';

const BlogRoute = express.Router();

BlogRoute.post('/add',  upload.single('file'), addBlog);
BlogRoute.get('/edit/:blogid',  editBlog);
BlogRoute.put('/update/:blogid',   upload.single('file'), updateBlog);
BlogRoute.delete('/delete/:blogid',   deleteBlog);
BlogRoute.get('/get-all', getAllBlog);

BlogRoute.get('/get-blog/:slug', getBlog);
BlogRoute.get('/get-related-blog/:category/:blog', getRelatedBlog);
BlogRoute.get('/get-blog-by-category/:category', getBlogByCategory);
BlogRoute.get('/search', search);

BlogRoute.get('/blogs',  showAllBlogs);

export default BlogRoute;