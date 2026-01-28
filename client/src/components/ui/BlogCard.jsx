import React from "react";
import { Card, CardContent } from "./card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const BlogCard = () => {
  const user = useSelector((state) => state.user);
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div></div>
          {user.user.role === "admin" && (
            <Badge variant="destructive" className="bg-blue-500">Admin</Badge>
          )}
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
