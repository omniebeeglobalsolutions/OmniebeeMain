"use client";
const ContactMappage = () => {
  return (
    <div className="w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.588008582126!2d78.4238339736904!3d17.43154840153433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9117b2bca973%3A0xc489b8669c1ad38b!2sOmniebee%20Global%20Solutions%20Pvt.Ltd!5e0!3m2!1sen!2sin!4v1752133088776!5m2!1sen!2sin"
        width="1920px"
        height="300px"
        style={{ border: 1 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-md w-full"
      ></iframe>
    </div>
  );
};

export default ContactMappage;
