import React, { useState } from "react";
import logo from "@/assets/images/logo-white.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import usericon from "@/assets/images/user.png";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { FaSearch } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
import { useSidebar } from './Sidebar';

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  console.log(user.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      dispatch(removeUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      return showToast("error", error.message);
    }
  };


  const toggleSearch = () => {
    setShowSearch(!showSearch);
  }

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">

       <div className='flex justify-center items-center gap-2'>
                <button onClick={toggleSidebar} className='md:hidden' type='button'>
                    <BsListUl size={27}/>
                </button>
                <Link to={RouteIndex}>
                  <img src={logo} size={30} onClick={() => navigate(RouteIndex)} className="md:w-auto w-48 cursor-pointer" />
                </Link>
      </div>
                                                                          
      <div className="w-[500px]">
        <div className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
        <SearchBox />
        </div>
      </div>

      <div className="flex items-center gap-5">
        
        <button onClick={toggleSearch} type='button' className='md:hidden block'>
          <FaSearch size={26} />
        </button>

        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <MdLogin />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="
        relative h-9 w-9 cursor-pointer
        ring-2 ring-blue-500/60
        transition-all duration-300
        hover:ring-4 hover:ring-blue-600
        hover:scale-105
        focus:outline-none
        focus:ring-4 focus:ring-blue-600
      " >
                <AvatarImage
                  src={user?.user?.avatar ? user.user.avatar : usericon}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = usericon;
                  }}
                />
                {/* <AvatarFallback>
                  {user.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback> */}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user?.user?.name}</p>
                <p className="text-sm">{user?.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteProfile}>
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteBlogAdd}>
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <IoLogOutOutline color="red" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
            {/* 🔥 PREMIUM MOBILE SEARCH OVERLAY */}
      {showSearch && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center"
          onClick={toggleSearch}
        >
          <div 
            className="w-full p-4 animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
              
              <FaSearch className="text-gray-500" />

              <div className="flex-1">
                <SearchBox />
              </div>

              <button 
                onClick={toggleSearch}
                className="text-gray-500 text-sm font-medium"
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Topbar;

