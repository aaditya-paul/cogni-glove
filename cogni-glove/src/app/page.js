import Footer from "@/components/footer";
import HeroSection from "@/components/heroSection";
import HowItWorks from "@/components/howItWorks";
import KeySections from "@/components/keySections";
import NavBar from "@/components/navBar";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      <NavBar />
      <div className=" lg:px-[15%] md:px-32 px-8 py-12">
        <HeroSection />
        <KeySections />
        <div className=" mt-8 mb-6">
          <HowItWorks />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Page;
