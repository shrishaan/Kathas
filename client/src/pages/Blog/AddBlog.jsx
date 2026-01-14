import React, { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import slugify from 'slugify';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AddBlog = () => {

    const formSchema = z.object({
            category: z.string().min(4,'Category must be at least 4 characters long.'),
            title: z.string().min(4,'Title must be at least 4 characters long.'),
            slug: z.string().min(3,'Slug must be at least 3 characters long.'),
            blogContent: z.string().min(3,'Blog content must be at least 3 characters long.'),
           
          });
        
          const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
              category:"",
              title:"",
              slug: "",
              blogContent: "",
              
            },
          });
          
          const blogTitle = form.watch("title");
    
          useEffect(() => {
            if (blogTitle) {
              const slug = slugify(blogTitle, { lower: true });
              form.setValue("slug", slug);
            }
          }, [blogTitle]);

          async function onSubmit(values) {
            // try {
            //   const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`,{
            //     method:'post',
            //     headers: {'Content-Type':'application/json'},
            //     body: JSON.stringify(values)
            //   })
    
            //   const data = await response.json();
    
            //   if(!response.ok){
            //     showToast('error', data.message );
            //     return;
            //   }
            //   form.reset();
            //   showToast('success', data.message );
            // } catch (error) {
            //           return showToast('error', error.message );
    
            // }
          }
          
    
  return (
      <Card className="pt-5 max-w-screen-md mx-auto">
        <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                     <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter blog title"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Slug"{...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
        
        <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>

        </CardContent>
      </Card>

  )
}

export default AddBlog;