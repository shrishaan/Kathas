import BlogCard from '@/components/ui/BlogCard';
import Loading from '@/components/ui/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'

const Index = () => {
  const { data: blogData, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all`, {
      method: "get",
      credentials: "include",
    });

  if(loading) return <Loading/>;
  return (
    <div className='max-w-7xl mx-auto px-6 py-10
                  grid gap-8
                  sm:grid-cols-1 
                  md:grid-cols-2 
                  lg:grid-cols-3'>
      {blogData && blogData.blog.length > 0 
      ?
      blogData.blog.map(blog => <BlogCard props={blog} />)
      :
      <div className="col-span-full text-center text-gray-500">Data Not Found.</div>
    }
    </div>
  )
}

export default Index;