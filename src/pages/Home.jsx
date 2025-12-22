import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import ServiceCard from "../components/ServiceCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // হোমে মাত্র ৬টি সার্ভিস দেখানোর জন্য স্লাইস করা যেতে পারে
        axios.get('http://localhost:5000/services')
            .then(res => {
                setServices(res.data.slice(0, 6)); 
            });
    }, []);

    return (
        <div>
            {/* ১. ব্যানার সেকশন */}
            <Banner />

            {/* ২. পপুলার সার্ভিস সেকশন */}
            <section className="container mx-auto px-4 md:px-8 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-secondary mb-4">Our Popular Services</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Explore our top-rated decoration services designed to make your moments unforgettable.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/services" className="btn btn-primary btn-outline rounded-full px-10">
                        Show All Services
                    </Link>
                </div>
            </section>

            {/* ৩. স্ট্যাটস সেকশন (প্রজেক্ট ইমপ্যাক্ট) */}
            <section className="bg-secondary py-16 text-white mb-20">
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h3 className="text-4xl font-bold">500+</h3>
                        <p className="text-gray-300">Events Managed</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold">120+</h3>
                        <p className="text-gray-300">Expert Designers</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold">1500+</h3>
                        <p className="text-gray-300">Happy Clients</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold">4.9/5</h3>
                        <p className="text-gray-300">Client Ratings</p>
                    </div>
                </div>
            </section>

            {/* ৪. FAQ সেকশন (DaisyUI Accordion) */}
            <section className="container mx-auto px-4 md:px-8 pb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" defaultChecked /> 
                        <div className="collapse-title text-xl font-medium">How do I book a service?</div>
                        <div className="collapse-content"> 
                            <p>Simply browse our services, click on View Details, and if you are logged in, you can click "Book Now" to select your preferred date.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" /> 
                        <div className="collapse-title text-xl font-medium">Can I cancel my booking?</div>
                        <div className="collapse-content"> 
                            <p>Yes, you can manage and cancel your bookings from the "My Bookings" section in your profile.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;