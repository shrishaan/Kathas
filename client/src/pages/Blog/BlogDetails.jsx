import React from 'react'
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd } from '@/helpers/RouteName';


const BlogDetails = () => {
  return (
     <div>
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {categoryData && categoryData.category.length > 0 ? (
                categoryData.category.map(category => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-3">
                        <Button variant="outline" className="hover:bg-blue-500 hover:text-white ">
                            <Link to={RouteEditCategory(category._id)}>
                            <FiEdit/>
                            </Link>
                        </Button>
                        <Button variant="outline" className="hover:bg-red-500 hover:text-white" onClick={() => handleDelete(category._id)}>
                            <FaRegTrashAlt/>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data Not Found.</TableCell>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogDetails;