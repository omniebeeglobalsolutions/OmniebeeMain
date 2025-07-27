"use client"
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Image from "next/image";
import { useEffect, useState } from "react";

const INFO_API_URL = "https://omniebee-server.vercel.app/api/info";

type Info = {
  employees: number;
  clients: number;
  partners: number;
  projects: number;
};

const useCountUp = (target: number | undefined, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (typeof target !== "number" || target === 0) {
      setCount(0);
      return;
    }
    let start = 0;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      setCount(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    setCount(0);
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
};

const Clients = () => {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const res = await fetch(INFO_API_URL);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setInfo({
            employees: data[0].employees,
            clients: data[0].clients,
            partners: data[0].partners,
            projects: data[0].projects,
          });
        }
      } catch (e) {
        setInfo(null);
      }
    }
    fetchInfo();
  }, []);

  const employees = useCountUp(info?.employees);
  const clients = useCountUp(info?.clients);
  const partners = useCountUp(info?.partners);
  const projects = useCountUp(info?.projects);

  return (
    <div className="w-full max-w-[1250px] mx-auto p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-8 sm:gap-30">
      <div className="flex-shrink-0 rounded-full overflow-hidden w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] relative">
        <Image
          src={assetsDataMap["Omniebee-footerlogo"]}
          alt="Omniebee Logo"
          width={400}
          height={400}
        />
      </div>

      <div className="flex flex-col justify-center ml-4 ">
        <h2 className="text-2xl sm:text-2xl font-bold text-[#2E3E95] leading-snug">
          Omniebee <br />
          <span className="text-[#479BC9] text-2xl">Global Solutions</span>
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <div className="text-lg text-[#000000] font-semibold border-b border-[#2E3E95]  pb-1 w-[80px]">
              {info ? `${employees}+` : "-"}
            </div>
            <div className="pl-2 text-sm text-gray-500 mt-1">Employees</div>
          </div>

          <div>
            <div className="text-lg text-[#000000] font-semibold border-b border-[#2E3E95] pb-1 w-[80px]">
              {info ? `${clients}+` : "-"}
            </div>
            <div className="pl-2 text-sm text-gray-500 mt-1">Clients</div>
          </div>

          <div>
            <div className="text-lg text-[#000000] font-semibold border-b border-[#2E3E95] pb-1 w-[80px]">
              {info ? `${partners}+` : "-"}
            </div>
            <div className="pl-2 text-sm text-gray-500 mt-1">Partners</div>
          </div>

          <div>
            <div className="text-lg text-[#000000] font-semibold border-b border-[#2E3E95] pb-1 w-[80px]">
              {info ? `${projects}+` : "-"}
            </div>
            <div className="pl-2 text-sm text-gray-500 mt-1">Projects</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
