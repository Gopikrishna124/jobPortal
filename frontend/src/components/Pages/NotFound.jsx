import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import OopsImage from '../../assets/404-error-3060993_1280.png'

function NotFound() {
  return (
    <div className="flex  justify-center items-center my-10">
      <div className="flex gap-10 items-center">
        <div>
          <img src={OopsImage} className="w-[400px] h-[400px]" alt="oops_image" />
        </div>
        <div>
          <p className="text-red-500 text-xl mb-4">
            Something went wrong .Pls go back to Home
          </p>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
