import BlogCard from '@/components/ui/BlogCard';
import Loading from '@/components/ui/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { useParams } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";

const BlogByCategory = () => {
  const { category } = useParams();
  const { data: blogData, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`, {
      method: "get",
      credentials: "include",
    },[category]);

  if(loading) return <Loading />;
  return (
    <>
    <div className='flex items-center gap-3 font-bold text-2xl border-b pb-3 mb-5'>
        <BiCategory />
       <h4 className='text-2xl font-bold text-black-500'> {blogData && blogData.categoryData?.name} </h4> 
    </div>
    <div className='grid grid-cols-3 gap-10'>
      {blogData && blogData.blog.length > 0 
      ?
      blogData.blog.map(blog => <BlogCard props={blog} key={blog._id} />)
      :
      <div>Data Not Found.</div>
    }
    </div>
    </>
  )
}

export default BlogByCategory