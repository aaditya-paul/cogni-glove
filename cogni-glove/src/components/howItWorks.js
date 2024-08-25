import Image from "next/image";
import React from "react";
import Step1 from "../../public/assets/step1.jpg";
import Step2 from "../../public/assets/connet.jpg";
import Step3 from "../../public/assets/control.jpg";
import Link from "next/link";
function HowItWorks() {
  return (
    <div>
      {/* <Link href={"#HowItWorks"}> */}
      <div className=" font-bold text-3xl my-5 " id="HowItWorks">
        How It Works
      </div>
      {/* </Link> */}
      {/* cards */}
      <div className=" self-center  grid lg:grid-rows-1 lg:grid-cols-3 md:grid-rows-2 md:grid-cols-2 grid-rows-3 grid-cols-1 md:text-left md:justify-normal text-center justify-center  gap-5">
        {/* ... */}
        <div>
          <div className=" relative w-full md:w-72 h-72 shadow-md">
            <Image
              src={Step1}
              alt="Step1"
              fill
              className=" hover:grayscale-0 hover:scale-105 transition-all ease cursor-pointer duration-300 lg:grayscale rounded-lg object-cover "
            />
          </div>
          <div className=" flex flex-col gap-1 leading-5 my-5">
            <div className=" font-bold text-xl">Step 1: Wear the glove</div>
            <div className=" ">Put on the gesture recognition Cogni Glove </div>
          </div>
        </div>
        {/* ... */}
        <div>
          <div className="  relative w-full md:w-72 h-72 shadow-md">
            <Image
              src={Step2}
              alt="Step2"
              fill
              className=" hover:grayscale-0 hover:scale-105 transition-all ease cursor-pointer duration-300 lg:grayscale rounded-lg object-cover "
            />
          </div>
          <div className=" flex flex-col gap-1 leading-5 my-5">
            <div className=" font-bold text-xl">Step 2: Connect to Devices</div>
            <div>Connect to drones, robots, VR systems, and more </div>
          </div>
        </div>
        {/* ... */}
        <div>
          <div className="  relative w-full md:w-72 h-72 shadow-md">
            <Image
              src={Step3}
              alt="Step3"
              fill
              className=" hover:grayscale-0 hover:scale-105 transition-all ease cursor-pointer duration-300 lg:grayscale rounded-lg object-cover "
            />
          </div>
          <div className=" flex flex-col gap-1 leading-5 my-5">
            <div className=" font-bold text-xl">
              Step 3: Control with Gestures
            </div>
            <div>
              Use hand gestures to control devices and interact with stuff.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
