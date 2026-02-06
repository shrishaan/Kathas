import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Loading from '@/components/ui/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { decode } from 'entities';
import React from 'react'
import { useParams } from 'react-router-dom';

const SingleBlogDetails = () => {
    const { blog } = useParams();
    const {data, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`, {
        method: "get",
        credentials: "include",
    });


    if(loading) return <Loading />;

  return (
    <div className='flex justify-between gap-20'>
        {data && data.blog && 
            <>
                <div className='border rounded w-[70%] p-5'>
                <h1 className='text-2xl font-bold p-4 mb-5'>{data.blog.title}</h1>
                    <div className='flex justify-between items-center'>
                      <div className='flex justify-between items-center gap-5'>
                         <Avatar>
                             <AvatarImage src={data.blog.author.avatar} />
                         </Avatar>
                         <span>{data.blog.author.name}</span>
                        </div>
                    </div>
                    <div className='my-5'>
                        <img src={data.blog.featuredImage} alt={data.blog.title} className='w-full h-full object-cover rounded my-5' />
                    </div>
                    <div dangerouslySetInnerHTML={{__html: decode(data.blog.blogContent) || "" }}>
                    {/* passing emty string to avoid error when blogContent is null or undefined */}
                    </div>
                </div>
               
            </>
        }
        <div className='border rounded w-[30%]'> </div>
    </div>
  )
}

export default SingleBlogDetails;