import React from "react";
import {
        SiBose,
        SiJbl,
        SiSennheiser,
        SiPioneerdj,
        SiAjv,
        SiAlgorand,
        SiAnchor,
        SiContao,
        SiDjango,
        SiAudioboom
} from "react-icons/si";

const LOGOS = [
    <SiSennheiser size={40} className=" text-primary" />,
    <SiAlgorand size={40} className="text-primary" />,
    <SiBose size={80} className="text-primary" />,
    <SiAjv size={40} className="text-primary" />,
    <SiAnchor size={40} className="text-primary" />,
    <SiPioneerdj size={40} className="text-primary" />,
    <SiContao size={40} className="text-primary" />,
    <SiJbl size={40} className="text-primary" />,
    <SiDjango size={40} className="text-primary" />,
    <SiAudioboom size={40} className="text-primary" />,
];
const Slider = () => {
    return (
        <div className="relative m-auto h-[80px] md:h-[100px] w-full bg-black bg-opacity-25 overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full  before:bg-[linear-gradient(to_right,black_0%,rgba(0,0,0,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full  after:-scale-x-100 after:bg-[linear-gradient(to_right,black_0%,rgba(0,0,0,0)_100%)] before:md:w-[200px] before:w-[80px] after:md:w-[200px] after:w-[80px] after:content-['']">
            <div className="animate-infinite-slider flex w-[calc(250px*10)]">
                {LOGOS.map((logo, index) => (
                    <div
                        className="slide flex w-full h-[100px] items-center justify-center"
                        key={index}
                    >
                        {logo}
                    </div>
                ))}
                {LOGOS.map((logo, index) => (
                    <div
                        className="slide flex w-full h-[100px] items-center justify-center"
                        key={index}
                    >
                        {logo}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
