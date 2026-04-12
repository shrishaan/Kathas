import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Comment from "@/components/ui/Comment";
import CommentList from "@/components/ui/CommentList";
import Loading from "@/components/ui/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { decode } from "entities";
import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CommentCount from "@/components/ui/CommentCount";
import LikeCount from "@/components/ui/LikeCount";

const SingleBlogDetails = () => {
  const { blog } = useParams();
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },
  );

  if (loading) return <Loading />;

  return (
    <div className="flex justify-between gap-20">
      {data && data.blog && (
        <>
          <div className="border rounded w-[70%] p-5">
            <h1 className="text-2xl font-bold p-2 mb-1">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                    <Avatar>
                        <AvatarImage src={data.blog.author.avatar} />
                    </Avatar>
                    <div>
                        <p className="font-bold">{data.blog.author.name}</p>
                        <p className="text-sm text-gray-500">{moment(data.blog.createdAt).format("MMMM Do YYYY")}</p>
                    </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                    <LikeCount props={{ blogid: data.blog._id }} />
                    <CommentCount props={{ blogid: data.blog._id }}/>
              </div>
            </div>
            <div className="my-5">
              <img
                src={data.blog.featuredImage}
                alt={data.blog.title}
                className="w-full h-full object-cover rounded my-5"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decode(data.blog.blogContent) || "",
              }}
            >
              {/* passing emty string to avoid error when blogContent is null or undefined */}
            </div>

            <div className="border-t mt-5 pt-5">
              <Comment props={{ blogid: data.blog._id }} />
            </div>

            <div className="border-t mt-5 pt-5">
              <CommentList props={{ blogid: data.blog._id }} />
            </div>
          </div>
        </>
      )}
      <div className="border rounded w-[30%]"> </div>
    </div>
  );
};

export default SingleBlogDetails;