import Image from "next/image";
import React from "react";
import BannerImg from "../../public/assets/banner.png";
function HeroSection() {
  return (
    <div className="">
      <div>
        {/* banner */}
        <div className=" relative  rounded-xl shadow-lg  md:w-[70vw] w-full lg:h-[65vh] md:h-[30vh] h-[20vh] ">
          <Image
            src={BannerImg}
            alt="Banner"
            fill
            className=" object-cover rounded-xl "
          />
          <div className=" md:absolute hidden  bg-gradient-to-b from-transparent rounded-xl to-[#00000059] w-full"></div>
        </div>
        <div className=" md:absolute md:w-[60vw] w-full  flex-wrap text-wrap lg:top-[45%] md:top-[20%] top-[35%] lg:left-[18%] md:left-[19%]  ">
          <div className=" text-black md:text-white font-bold mt-8  mb-6 lg:text-4xl md:text-3xl text-2xl">
            The Glove That Knows
          </div>
          <div className=" text-black md:text-white w-full  lg:text-lg md:text-1xl text-xl">
            The Cogni Glove AI hand gesture recognition glove is the first of
            its kind. It&apos;s like having a keyboard on your fingertips. It
            can be used to control drones, robots, and other devices, as well as
            for gaming, fitness, and virtual reality. The AI glove can also be
            used to detect sign language, and it has applications in healthcare,
            manufacturing, and other industries.
          </div>
          <div className=" shadow-md my-5 font-medium max-w-32 text-center bg-[#2094F3] px-5 py-3 rounded-lg cursor-pointer active:scale-95 transition-all ease-linear text-white">
            Get Started
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
