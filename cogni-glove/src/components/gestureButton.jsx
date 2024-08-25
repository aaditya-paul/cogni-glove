import React, {useEffect} from "react";

function GestureButton({intent}) {
  // var arr = [];
  const actions = [
    {
      name: "Up",
      action: "Scroll Up",
    },

    {
      name: "Down",
      action: "Scroll Down",
    },
    {
      name: "Heart",
    },
    {
      name: "S",
    },
    {
      name: "C",
    },
    {
      name: "I",
    },
    {
      name: "1",
    },
    {
      name: "Right",
    },
    {
      name: "Left",
    },
    {
      name: "OK",
    },
  ];

  // arr.push(intent);
  // arr.length = 5;

  // useEffect(() => {
  //   console.log(arr);
  // }, [arr]);

  // if (
  //   arr[0] == "i" &&
  //   arr[1] == "heart" &&
  //   arr[2] == "s" &&
  //   arr[3] == "c" &&
  //   arr[4] == "1"
  // ) {
  //   console.log("I love sc1");

  //   arr = [];
  // } else {
  //   arr = [];
  // }
  return (
    <div className=" grid md:grid-cols-4 grid-cols-2 gap-5">
      {actions.map((action) => (
        <div
          key={action.name}
          className={` p-5 border-2 text-center uppercase font-bold text-gray-700 ${
            action.name.toLowerCase() == intent
              ? "bg-blue-400 border-transparent"
              : "bg-transparent"
          } border-gray-300 rounded-xl `}
        >
          {action.name}
        </div>
      ))}
    </div>
  );
}

export default GestureButton;
