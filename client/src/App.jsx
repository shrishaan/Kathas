import { Button } from "@/components/ui/button";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUser } from "./helpers/RouteName";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import EditBlog from "./pages/Blog/EditBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import AddBlog from "./pages/Blog/AddBlog";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comments";
import User from "./pages/User";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          {/* path will be dynamic */}
          <Route index element={<Index />} />

          <Route path={RouteProfile} element={<Profile />} />

          {/* Blog Category */}
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} /> 

          {/* Blog */}
          <Route path={RouteBlogAdd} element={<AddBlog />} />
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogEdit()} element={<EditBlog />} /> 
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} /> 
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} /> 
          <Route path={RouteSearch()} element={<SearchResult />} /> 
          <Route path={RouteCommentDetails} element={<Comments />} /> 
          <Route path={RouteUser} element={<User />} /> 
        </Route>
        
        <Route path={RouteSignUp} element={<SignUp />} />
        <Route path={RouteSignIn} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 