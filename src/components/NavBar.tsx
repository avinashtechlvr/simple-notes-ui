import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Input } from "./ui/input";
import Profile from "./Profile";

const NavBar = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex flex-1 items-center justify-between sm:justify-start">
          <h1 className="text-3xl font-bold whitespace-nowrap ml-2 mr-2">Simple Notes</h1>
          <div className="flex sm:hidden space-x-4 ml-6"> {/* Visible only on mobile */}
            <ModeToggle />
            <Profile />
          </div>
        </div>
        
        {/* This search bar is visible only on small screens */}
        <div className="sm:hidden w-full mt-4">
          <Input type="search" placeholder="Search" className="w-full" />
        </div>
        
        {/* Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:flex flex-1 justify-start items-start mt-4 sm:mt-0">
          <Input type="search" placeholder="Search" className="w-full max-w-md" />
        </div>

        <div className="hidden sm:flex space-x-4 ml-2"> {/* Hidden on mobile */}
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
