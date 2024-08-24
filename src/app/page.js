import HeroSection from "@/components/heroSection";
import HowItWorks from "@/components/howItWorks";
import KeySections from "@/components/keySections";
import NavBar from "@/components/navBar";
import React from "react";

function Page() {
  return (
    <div>
      <NavBar />
      <div className=" lg:px-[15%] md:px-32 px-8 py-12">
        <HeroSection />
        <KeySections />
        <HowItWorks />
      </div>
    </div>
  );
}

export default Page;
