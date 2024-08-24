"use client";

import React from "react";

function Footer() {
  return (
    <div className=" w-full flex justify-center items-center p-12 py-24">
      Insomniacs &copy; {new Date().getFullYear()}{" "}
    </div>
  );
}

export default Footer;
