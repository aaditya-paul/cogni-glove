import Image from "next/image";
import React from "react";

function FeatureCards({data}) {
  return (
    <div>
      <div className=" grid md:gap-5 gap-2 lg:grid-cols-5 lg:grid-rows-2 md:grid-cols-3 md:grid-rows-2 grid-cols-2 ">
        {data.map((e) => {
          return (
            <div
              key={e.title}
              className=" transition-all ease-linear hover:border-[#2094F3] border-2 border-[#F0F2F5] p-5 rounded-lg gap-2 flex flex-col"
            >
              {" "}
              <div>
                <div className=" relative w-8 h-8">
                  <Image src={e.img} alt={e.title} fill />
                </div>
              </div>
              <div className=" font-bold md:text-xl text-lg">{e.title}</div>
              <div className=" md:text-md text-xs">{e.bio}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeatureCards;
