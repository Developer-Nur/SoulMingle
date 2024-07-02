import SectionTitel from "../../Shared/SectionTitel/SectionTitel";
import ContactBanner from "/public/sliderImages/contactusBanner.png"
import "../../index.css"
import { FaFacebook, FaInstagram, FaTwitch } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="my-10">

            <div className="w-full h-[500px]">
                <img className="w-full h-full object-cover rounded-lg" src={ContactBanner} alt="Banner Image" />
            </div>

            <div className="py-10">
                <SectionTitel title="Contact Us" text="Get the support you need, reach out today."></SectionTitel>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                    <p>
                        We are delighted that you’ve taken the time to visit our website and would love to hear from you! Your questions, feedback, and inquiries are invaluable to us, and we are committed to providing you with the best possible support and information. Whether you are curious about our products, need assistance with an order, or have any other questions, we are here to help.
                    </p>
                    <br />
                    <b>How to Reach Us:</b>
                    <br />
                    <br />
                    <ul className="contact-list">
                        <li>
                            Email: You can also email us directly at your-email@example.com. This is a great way to send us detailed questions or feedback, and we will get back to you as soon as possible.
                        </li>
                        <li>
                            Phone: If you prefer to speak with us directly, give us a call at <i>+0088 0171234567</i>. Our customer service representatives are available from <i>24/7</i> to assist you with any urgent matters or detailed queries.
                        </li>
                        <li>
                            Social Media: Connect with us on social media for the latest updates, news, and special offers. Feel free to send us a message on <i> Facebook, Twitter, Instagram</i> – we are always excited to engage with our community.
                        </li>
                    </ul>

                </div>

                <div className="register-section rounded-lg shadow-lg p-6">
                    <div className="text-center mb-7">
                        <h2 className="text-xl mb-4">Newsletter</h2>
                        <form >
                            <input className="w-full md:w-4/5 lg:w-3/5  rounded border-[#c3c3c3] focus:border-pink-500" type="text" placeholder="your email" />
                            <button className="-ml-24 bg-[#FA4D71] px-4 rounded-lg text-white hover:text-[#532B79]" type="submit" value="Submit">Submit</button>
                        </form>
                    </div>

                    <div className="text-center">
                        {/* <h2 className="text-xl mb-4">Find us on:</h2> */}
                        <div className="inline-flex gap-4">
                            <FaFacebook size={25} className="text-[#FA4D71] hover:text-[#532B79]" />
                            <FaInstagram size={25} className="text-[#FA4D71] hover:text-[#532B79]" />
                            <FaTwitch size={25} className="text-[#FA4D71] hover:text-[#532B79]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;