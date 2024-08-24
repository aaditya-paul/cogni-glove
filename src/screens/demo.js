import GestureButton from "@/components/gestureButton";
import React from "react";

function Demo() {
  return (
    <div className=" ">
      <div className=" font-medium text-3xl my-5 mb-9">
        This is a live demo :-
      </div>
      <div className=" text-xl">Some Gestures available are :</div>
      <div className=" text-xs text-slate-600">
        &#9432; The intent recieved via the Glove will be highlighted
      </div>
      <div className=" my-5">
        <GestureButton />
      </div>
      <div className="md:text-2xl text-lg font-medium">
        The actions performed in multiple apps according to the intent will be
        displayed here :
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-5 my-5 ">
        <div className="border-2 border-gray-300 p-5 rounded-xl h-[72vh] lg:h-[72vh] ">
          <div className="font-bold text-xl">Websites / Webpages / PDF</div>
          <div className="text-gray-500">Action 1</div>
          <div className="border-2 border-transparent border-b-gray-200 my-3"></div>
          {/* <WebSite */}
        </div>
        <div className="border-2 border-gray-300 p-5 rounded-xl lg:h-[72vh] h-[72vh]">
          <div className="font-bold text-xl">Spotify Playback</div>
          <div className="text-gray-500">Action 2</div>
          <div className="border-2 border-transparent border-b-gray-200 my-3"></div>
        </div>
        {/* <div className="border-2 border-gray-300 p-5 rounded-xl">
          <div className="font-bold text-xl">App 3</div>
          <div className="text-gray-500">Action 3</div>
        </div>
        <div className="border-2 border-gray-300 p-5 rounded-xl">
          <div className="font-bold text-xl">App 4</div>
          <div className="text-gray-500">Action 4</div>
        </div> */}
      </div>
    </div>
  );
}

export default Demo;
