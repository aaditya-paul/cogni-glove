"use client";

import Image from "next/image";
import React, {useState} from "react";
import Logo from "../../public/assets/logo.jpg";
import ProfilePic from "../../public/assets/profile.jpg";
import MenuPic from "../../public/assets/menu.png";
import Link from "next/link";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" border border-b-gray-300 border-opacity-40 border-transparent  flex items-center justify-between md:px-16 px-5 py-3 ">
      {/* Logo and Branding */}

      <Link href={"/"}>
        <div className=" flex items-center justify-between md:gap-5 gap-3">
          <div>
            <div className=" relative md:w-16 md:h-16 w-12 h-12">
              <Image
                alt="Logo"
                src={Logo}
                fill
                className=" rounded-full object-fill "
              />
            </div>
          </div>
          <div className=" font-bold md:text-xl text-md">Cogni Glove</div>
        </div>
      </Link>
      {/* Other Routes */}
      {/* //* For PC */}
      <div className=" lg:flex hidden items-center  font-medium gap-5">
        <div className=" gap-5 flex mx-5">
          <Link href={"/"}>
            <div>Technology</div>
          </Link>
          <Link href={"/"}>
            <div>Use Cases</div>
          </Link>
          <Link href={"/"}>
            <div>How it works</div>
          </Link>
        </div>

        <div className=" bg-[#2094F3] px-5 py-2 rounded-lg cursor-pointer active:scale-95 transition-all ease-linear text-white">
          SignUp
        </div>

        <div className=" bg-[#F0F2F5] px-5 py-2 rounded-lg cursor-pointer active:scale-95 transition-all ease-linear text-black ">
          Login
        </div>

        {/* <div className=" relative w-16 h-16">
          <Image
            src={ProfilePic}
            alt=" Profile Pic"
            fill
            className=" rounded-full object-fill"
          />
        </div> */}
      </div>
      {/* //*For mobile */}
      {/* haburger */}
      <div className="lg:hidden ">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className=" relative w-8 h-8"
        >
          <Image src={MenuPic} alt="Menu" fill className="cursor-pointer" />
        </div>
        <div>
          {isOpen && (
            <div className=" absolute top-14 right-2 w-40 h-fit bg-white z-50 shadow-lg rounded-lg">
              <div className=" flex flex-col gap-3 p-5">
                <Link href={"/"}>
                  <div>Technology</div>
                </Link>
                <Link href={"/"}>
                  <div>Use Cases</div>
                </Link>
                <Link href={"/"}>
                  <div>How it works</div>
                </Link>
                <div className=" text-center bg-[#2094F3] px-5 py-2 rounded-lg cursor-pointer active:scale-95 transition-all ease-linear text-white">
                  SignUp
                </div>

                <div className=" text-center bg-[#F0F2F5] px-5 py-2 rounded-lg cursor-pointer active:scale-95 transition-all ease-linear text-black ">
                  Login
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
