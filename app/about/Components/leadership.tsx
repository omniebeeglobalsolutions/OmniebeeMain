import Image from "next/image";

interface Member {
  id?: string | number;
  employeeName: string;
  role?: string;
  designation?: string;
  image?: {
    secure_url: string;
    public_id?: string;
  } | null;
}

export default async function LeadershipSection() {
  const res = await fetch(
    "https://omniebee-server.vercel.app/api/employees/all",
    { next: { revalidate: 60 } }
  );
  const members: Member[] = await res.json();

  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-[32px] sm:text-[40px] font-bold italic text-[#2E3E95] mb-2 font-poppins">
        Leadership
      </h2>
    <hr className="w-[150px] mx-auto border-t-[3px] border-[#2e3e95] mb-[30px]" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 sm:px-6 max-w-3xl mx-auto">
        {members?.map((member, index) => {
          const imageSrc =
            member.image && member.image.secure_url
              ? member.image.secure_url
              : "/profile.jpg"; // fallback local image

          return (
            <div
              key={member.id ?? index}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mb-4">
                <Image
                  src={imageSrc}
                  alt={member.employeeName || "Team Member"}
                  width={160}
                  height={160}
                  className="rounded-full object-cover w-full h-full border"
                />
              </div>
              <p className="text-[#479BC9] text-[18px] sm:text-[16px] md:text-[24px] font-bold font-inter">
                {member.employeeName}
              </p>
              <p className="text-[#479BC9] text-[14px] sm:text-[14px] md:text-[22px] italic">
                {member.role || member.designation}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
