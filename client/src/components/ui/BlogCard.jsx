import React from "react";
import { Card, CardContent } from "./card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "./avatar";
import { FaRegCalendarDays } from "react-icons/fa6";
import usericon from "@/assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const BlogCard = ({ props }) => {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="pt-5">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center gap-2">
              <Avatar>
                <AvatarImage src={props.author.avatar || usericon} />
              </Avatar>
              <span>{props.author.name}</span>
            </div>
            {props.author.role === "admin" && (
              <Badge variant="outline" className="bg-blue-500">
                Admin
              </Badge>
            )}
          </div>
          {/* Featured Image */}
          <div className="my-2">
            <img
              src={props.featuredImage}
              alt="Featured Image"
              className="rounded"
            />
          </div>
          {/* Title & Date  */}
          <div>
            <p className="flex items-center gap-2 mb-2">
              <FaRegCalendarDays />
              <span>{moment(props.createdAt).format("MMMM Do, YYYY")}</span>
            </p>
            <h2 className="text-2xl font-bold line-clamp-2">{props.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
export default BlogCard;
