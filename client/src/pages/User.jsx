import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
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
} from "@/components/ui/Table";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/ui/Loading";
import { useFetch } from "@/hooks/useFetch";

import { FaRegTrashAlt } from "react-icons/fa";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";
import usericon from "@/assets/images/user.png";

const User = () => {

    const [refreshData, setRefreshData] = useState(false);


  const { data, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/user/get-all-users`, {
    method: "get",
    credentials: "include",
  }, [refreshData]);

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`); 
    if(response){
        setRefreshData(!refreshData);
        showToast('success', 'user deleted successfully.');
    }else{
        showToast('error', 'Failed to delete user.');
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
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <img src={user.avatar || usericon  } className="w-10 rounded-full" />
                    </TableCell>
                    
                    <TableCell>{moment(user.createdAt).format('MMMM Do, YYYY')}</TableCell>
                    <TableCell className="flex gap-3">
                        
                        <Button variant="outline" className="hover:bg-red-500 hover:text-white" onClick={() => handleDelete(user._id)}>
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

export default User;


