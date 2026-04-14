import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import Loading from "@/components/ui/Loading";
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';

const RelatedBlog = ({ props,refresh }) => {
      const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${props.currentBlog}`,
        {
          method: "get",
          credentials: "include",
        },
        [refresh]
      );

    if(loading) return <Loading />;

  return (
    <div>
        <h2 className="text-2xl font-bold mb-5 relative inline-block">Related Blogs
          <span className="absolute left-0 -bottom-1 h-[3px] w-1/2 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full"></span>
        </h2>
        <div>
            {data && data.relatedBlog.length > 0
            ?
            data.relatedBlog.map(blog => {
                return (
                    <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)} >
                      <div className='flex items-center gap-2 mb-2 hover:bg-gray-100 p-2 rounded-lg transition'>
                        <div className="w-[90px] aspect-[4/3] overflow-hidden rounded-lg flex-shrink-0">
                          <img src={blog.featuredImage} className="w-full h-full object-cover opacity-100"/>
                        </div>
                        <h4 className='line-clamp-2 text-sm font-semibold'>{blog.title}</h4>
                      </div>
                    </Link>    

                )
            })
            :
            <div>
                No Related Blog.
            </div>
        }
            
        </div>
    </div>
  )
}

export default RelatedBlog