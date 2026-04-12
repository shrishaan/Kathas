import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteCommentDetails } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/ui/Loading";
import { useFetch } from "@/hooks/useFetch";

import { FaRegTrashAlt } from "react-icons/fa";
import { showToast } from "@/helpers/showToast";

import { deleteData } from "@/helpers/handleDelete";


const Comments = () => {

    const [refreshData, setRefreshData] = useState(false);


  const { data, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`, {
    method: "get",
    credentials: "include",
  }, [refreshData]);

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`); 
    if(response){
        setRefreshData(!refreshData);
        showToast('success', 'comment deleted successfully.');
    }else{
        showToast('error', 'Failed to delete comment.');
    }
  }

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
       
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>CommentedBy</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map(comment => (
                  <TableRow key={comment._id}>
                    <TableCell>{comment?.blogid?.title}</TableCell>
                    <TableCell>{comment?.user?.name}</TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    
                    <TableCell className="flex gap-3">
                        
                        <Button variant="outline" className="hover:bg-red-500 hover:text-white" onClick={() => handleDelete(comment._id)}>
                            <FaRegTrashAlt/>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data Not Found.</TableCell>
                </TableRow>
              )} 
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comments;


