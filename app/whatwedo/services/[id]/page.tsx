import AnimatedBubbles from "@/app/about/Components/AnimatedBubbles";
import Form from "@/app/components/reusable/Form";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const buttonTextMap: Record<string, string> = {
  "6879f664ff8f487cbd3cf2c2": "Speak To Us", //Software Development
  "687a04e6ff8f487cbd3cf2d3": "Get Talent", // IT Consulting
  "687a112eff8f487cbd3cf2dd": "Consult With Us Today", //Business Consulting
  "6879fa0bff8f487cbd3cf2ca": "Get Support Now", //Technical Support
  "687a09c0ff8f487cbd3cf2d8": "Get Started Today", //Staffing Solutions
  "687a2e24e7dd05494d3087d9": "Start Learning Today", //Training
};

const buttonReqMap: Record<string, string> = {
  "6879f664ff8f487cbd3cf2c2": "Request Consultation",
  "687a04e6ff8f487cbd3cf2d3": "Request Support Now",
  "687a112eff8f487cbd3cf2dd": "Speak With Us",
  "6879fa0bff8f487cbd3cf2ca": "Speak With Us",
  "687a09c0ff8f487cbd3cf2d8": "Speak With Us",
  "687a2e24e7dd05494d3087d9": "Join a Program or Partner With Us",
};

const excellenceSectionMap: Record<
  string,
  "section4" | "section5" | "section6"
> = {
  "6879f664ff8f487cbd3cf2c2": "section6", // Software Development
  "687a2e24e7dd05494d3087d9": "section6", // Training
  "687a04e6ff8f487cbd3cf2d3": "section4", // IT Consulting
  // other services
  "687a112eff8f487cbd3cf2dd": "section5", //Business Consulting
  "6879fa0bff8f487cbd3cf2ca": "section5", //Technical Support
  "687a09c0ff8f487cbd3cf2d8": "section5", //Staffing Solutions
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(
    `https://omniebee-server.vercel.app/api/services/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      title: "Service Not Found",
    };
  }

  const service = await res.json();
  
  return {
    title: service.section1.title,
    description: service.section1.description,
  };
}

export async function generateStaticParams() {
  const res = await fetch("https://omniebee-server.vercel.app/api/services", {
    cache: "no-store",
  });

  const data = await res.json();
  // console.log("data::::", data);

  return data.map((service: any) => ({
    id: service._id,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `https://omniebee-server.vercel.app/api/services/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound(); // Have to show 404 page if data not found
  }

  const service = await res.json();
  const buttonText = buttonTextMap[params.id] || "Speak to Us";
  const buttonReqText = buttonReqMap[params.id] || "Request Consultation";
  const isITConsulting = params.id === "687a04e6ff8f487cbd3cf2d3";
  const sectionKey = excellenceSectionMap[params.id];
  const excellenceSection = service[sectionKey];

  return (
    <>
      <section>
        <div className="bg-white">
          <div
            className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[450px] bg-cover bg-center"
            style={{ backgroundImage: `url(${service.section1.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#2E3E95]/50 via-black/50 to-[#2E3E95]/60" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-4 leading-tight">
                {service.section1.title}
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 max-w-xl">
                {service.section1.description}
              </p>
              <a
                href="#services-form"
                className="button-tertiary px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium sm:font-semibold text-sm sm:text-base transition"
              >
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <AnimatedBubbles />
        <div>
          <section className="flex items-center justify-center bg-white px-4 mt-5">
            <h2 className="text-center text-2xl sm:text-3xl font-poppins font-bold text-[#2e3e95] max-w-[600px] italic">
              {service.section2.title}
            </h2>
          </section>

          <div className="flex justify-center my-5">
            <hr className="w-[170px] h-[5px] bg-[#2E3E95] border-none rounded-full" />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 px-4 mb-[50px] mt-9 max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2 text-justify text-base leading-6 sm:leading-7 font-normal">
              {service.section2.description}
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center mt-6 lg:mt-0">
              <img
                src={service.section2.image}
                alt=""
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[450px] h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mb-[45px]">
          <section className="flex items-center justify-center bg-white px-4 mt-5">
            <h2 className="text-center text-3xl font-poppins font-bold text-[#2e3e95] max-w-[600px] italic">
              {service.section3.title}
            </h2>
          </section>
          <div className="flex justify-center my-5">
            <hr className="w-[170px] h-[5px] bg-[#2E3E95] border-none rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.section3.items.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white shadow-[0_8px_30px_rgba(46,62,149,0.3)] hover:shadow-[0_12px_40px_rgba(46,62,149,0.5)] transition duration-300 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {params.id === "6879f664ff8f487cbd3cf2c2" && (
        <section>
          <div className="flex flex-col sm:flex-row items-center justify-center bg-[#479BC9] px-4 py-6 sm:py-8 gap-4 sm:gap-[80px] min-h-[150px]">
            <div className="text-white font-bold text-xl sm:text-2xl text-center sm:text-left w-full sm:max-w-[650px]">
              {service.section7.title}
            </div>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <a
                href="#services-form"
                className="button-tertiary px-6 py-2.5 rounded-lg font-medium sm:font-semibold text-sm sm:text-base text-white transition"
              >
                {buttonReqText}
              </a>
            </div>
          </div>
        </section>
      )}

      {!isITConsulting && (
        <section className="bg-gradient-to-b from-[#1E232A] to-[#2E3E95] pb-[50px]">
          <div className="flex items-center justify-center px-4">
            <h2 className="text-center text-3xl font-poppins font-bold text-[#fff] max-w-[600px] italic mt-4">
              {service.section4.title}
            </h2>
          </div>
          <div className="flex justify-center my-5">
            <hr className="w-[170px] h-[5px] bg-[#2E3E95] border-none rounded-full" />
          </div>
          <div className="max-w-xl mx-auto px-4 mb-[50px] mt-9">
            <p className="text-justify text-[16px] leading-[24px] sm:leading-[29px] font-normal text-[#fff]">
              {service.section4.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4 sm:px-6 max-w-7xl mx-auto">
            {service.section4.items.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white shadow-[0_8px_30px_rgba(46,62,149,0.3)] hover:shadow-[0_12px_40px_rgba(46,62,149,0.5)] transition duration-300 p-6 min-w-[280px]"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-[75px] h-[75px] mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      {isITConsulting && (
        <section className="bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white py-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Business & Career Benefits of Our IT Consulting Services
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b border-blue-400 pb-2">
                For Clients
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Access to pre-vetted, skilled talent</li>
                <li>Reduced hiring time and costs</li>
                <li>Payroll and compliance management</li>
                <li>Flexible hiring models (onsite/remote)</li>
                <li>Scalable team deployment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b border-blue-400 pb-2">
                For Candidates
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Job placements based on real-time tech demand</li>
                <li>Guidance on interviews and resume preparation</li>
                <li>Opportunities across top-tier companies</li>
                <li>Career growth in aligned domains</li>
                <li>Training & mentorship support (where applicable)</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {params.id !== "6879f664ff8f487cbd3cf2c2" && (
        <section>
          <div className="flex flex-col sm:flex-row items-center justify-center bg-[#479BC9] px-4 sm:px-6 py-6 sm:py-0 min-h-[150px] gap-6 sm:gap-[80px] text-center sm:text-left">
            <div className="text-white font-bold text-xl sm:text-2xl max-w-[90vw] sm:max-w-[650px]">
              {service.section7.title}
            </div>
            <div>
              <a href="#services-form" className="button-tertiary px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium sm:font-semibold text-sm sm:text-md transition text-white">
                {buttonReqText}
              </a>
            </div>
          </div>
        </section>
      )}

      {(params.id === "6879f664ff8f487cbd3cf2c2" ||
        params.id === "687a2e24e7dd05494d3087d9") && (
        <section>
          <div className="flex items-center justify-center px-4 mb-5">
            <h2 className="text-center text-3xl font-poppins font-bold text-[#2e3e95] max-w-[600px] italic mt-4">
              {service.section5.title}
            </h2>
          </div>
          <div className="flex justify-center my-5">
            <hr className="w-[170px] h-[5px] bg-[#2E3E95] border-none rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-[50px] mt-9">
            <p className="text-center text-[16px] leading-[24px] sm:leading-[29px] font-normal text-[#000]">
              {service.section5.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-center mb-10">
            {service.section5.items.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white hover:shadow-[0_12px_40px_rgba(46,62,149,0.5)] transition duration-300 p-6"
              >
                <div className="flex justify-center items-center">
                  <img src={item.image} alt="" className="w-[75px] h-[75px]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {excellenceSection && (
        <section className="bg-gradient-to-b from-[#121212] to-[#2e3e95] py-16">
          <div className="text-center text-white mb-10 px-4">
            <h2 className="text-3xl font-bold">{excellenceSection.title}</h2>
            <p className="text-sm sm:text-md mt-2 max-w-2xl mx-auto">
              {excellenceSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {excellenceSection.items.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-[#1e1e1e] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[140px] object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2e3e95] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.section9.faqs.map((faq: any, index: number) => (
              <details
                key={index}
                className="group border border-gray-300 rounded-lg p-4 transition-all open:shadow-md open:border-[#2e3e95]"
              >
                <summary className="flex justify-between items-center cursor-pointer text-lg font-medium text-[#2e3e95] group-open:font-bold">
                  {faq.question}
                  <span className="ml-2 text-xl font-bold text-[#2e3e95] group-open:hidden">
                    +
                  </span>
                  <span className="ml-2 text-xl font-bold text-[#2e3e95] hidden group-open:inline">
                    −
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <div id="services-form">
        <Form />
      </div>
    </>
  );
}
