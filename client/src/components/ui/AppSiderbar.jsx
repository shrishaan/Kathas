import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import React from 'react'
import { Link } from "react-router-dom"
import logo from "@/assets/images/logo-white.png"
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";

const AppSiderbar = () => {
  return (
    <Sidebar>
      <SidebarHeader classname="bg-white"> 
        <img src={logo} width={120} alt="" />
      </SidebarHeader>
      <SidebarContent classname="bg-white">
        <SidebarGroup>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeOutline />
                    <Link to="">Home</Link> {/* to means which route to pass */}
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiCategoryAlt />
                    <Link to="">Categories</Link> 
                </SidebarMenuButton>
            </SidebarMenuItem>
                <SidebarMenuButton>
                  <GrBlog />
                    <Link to="">Blogs</Link> 
                </SidebarMenuButton>
                <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegComments />
                    <Link to="">Comments</Link> 
                </SidebarMenuButton>
                <SidebarMenuItem>
                <SidebarMenuButton>
                  <LuUsers />
                    <Link to="">Users</Link> 
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenuItem>
            </SidebarMenuItem>
        </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Categories
          </SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <GoDot />
                    <Link to="">Category Item</Link> 
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSiderbar;