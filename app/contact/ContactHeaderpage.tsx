
"use client"

import Image from "next/image"
import { assetsDataMap } from "../utils/assetsDataMap"

const ContactHeaderpage = () => {
  const careerBanner = assetsDataMap["Career-Banner"]
  return (
    <>
      <div
        className= "relative w-full h-[150px] lg:h-[280px] bg-cover bg-center"
      style={{ backgroundImage: `url(${assetsDataMap["Career-Banner"]})` }}
      >
        {/* Gradient overlay on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b3f]/70 to-transparent">

          {/* Text over banner */}
          <h1 className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold font-poppins">
            Connect With Our Team
          </h1>
        </div>
      </div>
    </>
  )
}

export default ContactHeaderpage