import NavBar from "@/components/navBar";
import Demo from "@/screens/demo";
import React from "react";

function Page() {
  return (
    <div>
      <NavBar />
      <div className=" lg:px-[15%] md:px-32 px-8 py-12">
        <Demo />
      </div>
    </div>
  );
}

export default Page;
