import React from "react";
import CardPulse from "./UI/CardPulse";
import Slider from "./UI/Slider";

const Hero = () => {
  return (
    <div>
      <div className="">
        <h1 className="text-[3.8rem] px-2 sm:text-[6rem] md:text-[9rem] text-center mt-10 font-secundario text-primary font-bold h-[115px] md:h-[190px] ">
          Amplify
          <span className="font-secundario text-6xl text-pink-300">.hh</span>
        </h1>
        <h2 className="text-[1.5rem] text-center font-principal font-thin text-primary">
          Sonido e iluminación de élite en tus manos.
        </h2>
      </div>
      <div>
        <CardPulse />
        <div className="mt-20">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Hero;
