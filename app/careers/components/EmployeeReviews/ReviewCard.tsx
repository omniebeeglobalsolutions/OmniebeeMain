import { assetsDataMap } from "@/app/utils/assetsDataMap";
import React from "react";

type Props = {
  name: string;
  text: string;
  avatar: string;
  date: string;
  blueTick: string;
  googleLogo: string;
};

const ReviewCard = ({name, text, avatar, date, blueTick, googleLogo,}: Props) => (
  <div
    className="w-full max-w-[370px] md:max-w-[320px] lg:max-w-[370px] mx-auto flex flex-col min-h-[180px] 
             bg-white shadow-[0_4px_15px_rgba(46,62,149,0.15)] hover:shadow-[0_6px_25px_rgba(46,62,149,0.2)] 
             transition duration-300 p-6 rounded-[10px]"
  >
    <div className="flex items-center w-full mb-2">
      <img
        src={avatar}
        alt={name}
        className="w-9 h-9 rounded-full mr-2 border-2 border-white shadow"
      />
      <span className="font-semibold text-[#222] text-sm mr-1 truncate max-w-[100px]">
        {name}
      </span>
      <img src={blueTick} alt="Verified" className="w-3 h-3 mr-2 align-left" />
      <span className="text-xs text-gray-400 ml-auto mr-2 whitespace-nowrap">
        {date}
      </span>
      <img
        src={assetsDataMap["career-googleOne"]}
        alt="Google"
        className="w-6 h-6 object-contain"
      />
    </div>

    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-[#FFD600] text-xl mr-1 last:mr-0">
          ★
        </span>
      ))}
    </div>

    <p
      style={{
        color: "black",
        fontSize: 13,
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: "18px",
        wordWrap: "break-word",
      }}
      className="mt-1 text-left"
    >
      {text}
    </p>
  </div>
);

export default ReviewCard;
