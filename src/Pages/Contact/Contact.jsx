import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto py-16 px-4 min-h-[60vh]">
      <h1 className="text-5xl font-extrabold text-center text-primary mb-8">
        Get in Touch
      </h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        We'd love to hear from you! Whether you have a question about services,
        pricing, or need support, our team is ready to help.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card shadow-lg bg-base-100 text-center p-6">
          <FaPhoneAlt className="text-4xl text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold">Call Us</h2>
          <p className="text-gray-600">+880 17XX XXX XXX</p>
          <p className="text-sm">Mon - Sat, 10am - 8pm</p>
        </div>

        <div className="card shadow-lg bg-base-100 text-center p-6">
          <FaEnvelope className="text-4xl text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold">Email Us</h2>
          <p className="text-gray-600">info@styledecor.com</p>
          <p className="text-sm">We typically reply within 24 hours.</p>
        </div>

        <div className="card shadow-lg bg-base-100 text-center p-6">
          <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold">Our Office</h2>
          <p className="text-gray-600">123 Gulshan Ave, Dhaka</p>
          <p className="text-sm">Appointment only</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6">Send Us a Message</h2>
      <form className="max-w-xl mx-auto space-y-4 p-8 bg-base-200 rounded-lg shadow-inner">
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="input input-bordered w-full"
          required
        />
        <textarea
          className="textarea textarea-bordered w-full h-32"
          placeholder="Your Message"
          required
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
