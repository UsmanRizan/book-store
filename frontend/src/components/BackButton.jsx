import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftSquare } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link to={destination} className=" text-black px-4 py-1 rounded-lg w-fit">
        <BsArrowLeftSquare className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
