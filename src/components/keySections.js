import React from "react";
import FeatureCards from "./featureCards";
import GesturePic from "../../public/assets/Depth 9, Frame 0 (1).svg";
import iotPic from "../../public/assets/Depth 9, Frame 0.svg";
import AIRec from "../../public/assets/Depth 9, Frame 0 (2).svg";
import RoboticImp from "../../public/assets/Depth 9, Frame 0 (3).svg";
import GlobalImg from "../../public/assets/Depth 9, Frame 0 (4).svg";
import HealthCare from "../../public/assets/Depth 9, Frame 0 (5).svg";
function KeySections() {
  const cards = [
    {
      title: "Gesture Control",
      bio: "Control Drones, Robots, and other devices with simple hand gestures.",
      img: GesturePic,
    },
    {
      title: "IoT connectivity",
      bio: "Connect to IoT devices and network from anywhere",
      img: iotPic,
    },
    {
      title: "AI Recognition",
      bio: "AI powered gesture recognition for precise control",
      img: AIRec,
    },
    {
      title: "Robotic interaction",
      bio: "Interact with robots and other machines using gestures",
      img: RoboticImp,
    },
    {
      title: "Global Applications",
      bio: "Use for fitness, gaming, virtual reality, and more",
      img: GlobalImg,
    },
    {
      title: "Healthcare usage",
      bio: "Use for sign language detection and healthcare applications",
      img: HealthCare,
    },
  ];
  return (
    <div>
      {/* Key Features */}
      <div className="  lg:my-12">
        <div className=" font-bold text-3xl my-5 ">Key Features</div>
        <div className=" text-xl my-8">
          The Cogni Glove AI hand gesture recognition glove is packed with
          advanced technology, making it the ultimate solution for hands-free
          control and interaction.
        </div>
        <div className=" my-5">
          <FeatureCards data={cards} />
        </div>
      </div>
    </div>
  );
}

export default KeySections;
