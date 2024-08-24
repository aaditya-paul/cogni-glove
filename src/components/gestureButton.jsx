import React from "react";

function GestureButton() {
  return (
    <div className=" grid md:grid-cols-4 grid-cols-2 gap-5">
      <div className=" p-5 border-2 text-center uppercase font-bold text-gray-700 border-gray-300 rounded-xl ">
        Up
      </div>
      <div className=" p-5 border-2 text-center uppercase font-bold text-gray-700 border-gray-300 rounded-xl ">
        Down
      </div>
      <div className=" p-5 border-2 text-center uppercase font-bold text-gray-700 border-gray-300 rounded-xl ">
        Left
      </div>
      <div className=" p-5 border-2 text-center uppercase font-bold text-gray-700 border-gray-300 rounded-xl ">
        Right
      </div>
    </div>
  );
}

export default GestureButton;
