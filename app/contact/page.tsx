// "use client"
import ContactHeaderpage from "../contact/ContactHeaderpage";
import ContactMappage from "../contact/ContactMappage"
import ContactFormpage from "../contact/ContactFormpage"

export const metadata = {
  title: "Contact Us | Omniebee Global Solutions",
  description:
    "Get in touch with Omniebee Global Solutions. Reach out for business inquiries, support, or collaboration opportunities.",
  keywords: [
    "contact Omniebee",
    "Omniebee Global Solutions",
    "business inquiries",
    "support Omniebee",
    "get in touch",
    "contact tech company",
  ],
  openGraph: {
    title: "Contact Omniebee Global Solutions",
    description:
      "We're here to help. Contact us for inquiries, support, or partnership discussions.",
    url: "https://omniebeeglobalsolutions.com/contact",
    siteName: "Omniebee Global Solutions",
    images: [
      {
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/your-folder/og-contact.jpg", // ✅ Replace with your Cloudinary image URL
        width: 1200,
        height: 630,
        alt: "Contact Omniebee Global Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const page = () => {
  return (
    <div> 
  <ContactHeaderpage/>
  <ContactFormpage/>
  <ContactMappage/>
    </div>
  )
}

export default page