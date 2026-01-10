import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/ui/Loading";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";

const Profile = () => {

    const [filePreview, setPreview] = useState();
    const [file, setFile] = useState();

    const user = useSelector((state) => state.user);

  const {
    data: userData, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`, {
    method: "get",
    credentials: "include",
  });

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be at least 3 characters long"),
    password: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if(userData && userData.success){
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      })
    }
  }, [userData]);
  

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${user.user._id}`,
        {
          method: "put",
          //multi part form data is by default in header 
          credentials: "include", // to include cookies
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      dispatch(setUser(data.user));
      showToast("success", data.message);
    } catch (error) {
      return showToast("error", error.message);
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file); 
    setPreview(preview);
  }

  if(loading) return <Loading />;

  return (
    <Card className="max-w-screen-md mx-auto">
      
      <CardContent>
        <div className="flex justify-center items-center mt-10">

          <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Avatar className="w-28 h-28 relative">
            <AvatarImage src={filePreview ? filePreview : userData?.user?.avatar} />
            <div className="absolute z-10 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-black bg-opacity-10 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full border-2 border-blue-500">
              <IoCameraOutline color="#2563EB"/>
            </div>
          </Avatar>
      </div>
   
  )}
</Dropzone>

         
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your bio" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
