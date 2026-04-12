import BlogCard from '@/components/ui/BlogCard';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchResult = () => {
const [searchParams] = useSearchParams();  
const q = searchParams.get('q');
const { data: blogData, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`, {
      method: "get",
      credentials: "include",
    });
  return (
    <>
    <div className='flex items-center gap-3 font-bold text-2xl border-b pb-3 mb-5'>
            
           <h4 className='text-2xl font-bold text-black-500'>Search Result For: {q} </h4> 
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

export default SearchResult