"use client";
import useWebSocket from "@/app/hooks/useWebSocket";
import GestureButton from "@/components/gestureButton";
import React, {useEffect, useState} from "react";

// import Doc from "../../public/assets/medical store app.pdf";
function Demo() {
  const [inputMessage, setInputMessage] = useState("");
  const {messages, sendMessage} = useWebSocket("ws://localhost:8080"); // Adjust the URL to match your WebSocket server
  const [intent, setIntent] = useState("");
  useEffect(() => {
    console.log(messages);
    setIntent(messages);
  }, [messages]);
  const handleSendMessage = (msg) => {
    sendMessage(msg);
    // setInputMessage("");
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Add your condition checking logic here
  //     fetch("http://localhost:3000/api/data")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(JSON.parse(JSON.stringify(data.dataRec.gesture_name)));
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //     // console.log("Checking condition");
  //   }, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

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
        <GestureButton intent={intent} />
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
          <div
            id="content"
            className=" flex-wrap flex overflow-y-auto text-clip break-words max-h-[80%]"
          >
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum Lorem ipsum
            odor amet, consectetuer adipiscing elit. Nam sapien montes pulvinar
            dis convallis libero himenaeos. Nostra urna massa sed, vel dictumst
            imperdiet etiam quis. Erat tincidunt donec consequat hendrerit in ut
            porta aliquam nostra. Sapien a nam placerat ridiculus montes
            maximus. Phasellus nisl tristique iaculis phasellus nunc praesent
            suscipit. Rutrum inceptos molestie nisl malesuada dignissim curae.
            Ante amet imperdiet eget cras donec at. Orci quis odio eleifend quis
            placerat nunc. Ac id risus laoreet magna magnis ligula eleifend
            viverra. Eros ligula id dis nunc vestibulum mus varius. Tempor
            congue arcu amet dolor laoreet. Ad pharetra arcu finibus nullam
            sollicitudin blandit auctor mi. Semper proin cras sed torquent massa
            felis ultrices. Tortor at velit iaculis magnis velit libero? Ut
            class ipsum euismod magna lacus. Adipiscing lobortis ornare
            efficitur euismod himenaeos ad. Natoque nec dui rutrum varius
            parturient tortor. Ultrices nostra lectus faucibus; vel etiam
            pulvinar nibh purus. Dui tellus suscipit tempus, metus leo mauris.
            Id integer at ornare tellus rutrum natoque placerat. Penatibus
            dapibus amet ad justo maecenas vitae. Dictum dapibus et at porta
            magna elit purus. Vehicula egestas hac purus aliquam euismod platea.
            Libero conubia mi a dui risus commodo fringilla scelerisque risus.
            Leo dapibus aliquet blandit enim cras quam adipiscing dui donec. Ut
            quisque suspendisse nam fusce turpis nibh molestie. Litora consequat
            in primis ac nibh. Tortor consectetur sodales finibus id magna;
            egestas aenean quam ultrices. Sollicitudin amet orci pharetra justo
            convallis enim. Nostra conubia sed adipiscing platea scelerisque
            primis pulvinar. Vitae ut nibh ad suscipit vel rutrum litora
            sollicitudin. Ullamcorper nibh dui lacus; montes orci ex. Nostra
            quisque dignissim sagittis orci tellus mattis donec. Commodo
            facilisi dolor libero ad sem habitant habitant lectus. Posuere nunc
            fusce convallis bibendum turpis donec tincidunt. Placerat nam sit
            etiam posuere parturient fringilla egestas. Consequat euismod
            pharetra consectetur est mollis hendrerit potenti vulputate? Nostra
            ex gravida eu facilisis dignissim. Vulputate nisl felis elementum
            volutpat lobortis. Facilisi lacus platea taciti blandit molestie
            efficitur suspendisse euismod fusce. Nec nisi metus cras nullam
            porttitor nulla adipiscing. Vel ipsum dignissim aliquet sem velit
            amet.
          </div>
        </div>
        <div className="border-2 border-gray-300 p-5 rounded-xl lg:h-[72vh] h-[72vh]">
          <div className="font-bold text-xl">Gemini AI</div>
          <div className="text-gray-500">Action 2</div>
          <div className="border-2 border-transparent border-b-gray-200 my-3"></div>
          <div>
            <div
              onClick={() => {
                // setInputMessage("open");
                handleSendMessage("hihih");
              }}
            >
              press
            </div>
          </div>
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
