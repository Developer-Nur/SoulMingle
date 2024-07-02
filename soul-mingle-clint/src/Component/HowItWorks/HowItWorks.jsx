import SectionTitel from '../../Shared/SectionTitel/SectionTitel';
import { BsNewspaper } from "react-icons/bs";
import { FaConnectdevelop } from "react-icons/fa";
import { AiOutlineInteraction } from "react-icons/ai";
import { FaCreditCard } from "react-icons/fa";


const HowItWorks = () => {
    return (
        <div className='py-10'>
            <SectionTitel
                title="How it works"
                text='We simplify the process of connecting people through our platform.'>

            </SectionTitel>

            <div className='mt-16 grid lg:grid-cols-2 lg:items-start lg:gap-10'>


                <div className=''>
                    At <span className='theme-color font-semibold'>Soul Mingle</span>, we aim to make your journey to finding the perfect match both straightforward and secure. The process begins with you creating a detailed profile, sharing information about your background, lifestyle, interests, and what you are seeking in a partner. Our advanced matching algorithm uses this information to suggest profiles that align with your preferences. You can explore these personalized matches and express your interest through customized messages or pre-defined notifications, initiating meaningful connections.
                    <br /><br />
                    Our platform offers a secure messaging system for you to communicate safely and privately with potential matches. To deepen your connection, you can also use our video call feature for face-to-face interactions from the comfort of your home. When you're ready to take the next step, you can arrange in-person meetings using our convenient scheduling tools.
                    <br /><br />
                    Throughout this process, our dedicated customer support team is always available to assist you, ensuring a smooth and enjoyable experience. We prioritize your safety by verifying profiles to maintain an authentic and trustworthy environment.
                </div>

                {/* cards */}
                <div className='mt-5 grid lg:grid-cols-2 lg:items-start lg:gap-3'>

                    <div className='space-y-8 lg:space-y-3'>
                        <div className="p-3 rounded-lg border-2 border-[#532B79] hover:border-[#FA4D71] shadow-lg min-h-[180px]">
                            <span>
                                <BsNewspaper size={25} className='theme-color' />
                            </span>
                            <h2 className='text-2xl py-3'>Sign Up</h2>
                            <p className='text'>Register for free & put up your Matrimony Profile</p>
                        </div>

                        <div className="p-3 rounded-lg border-2 border-[#532B79] hover:border-[#FA4D71] shadow-lg min-h-[180px]">
                            <span>
                                <FaConnectdevelop size={25} className='theme-color' />
                            </span>
                            <h2 className='text-2xl py-3'>Connect</h2>
                            <p className='text'>Select & Connect with Matches you like
                            </p>
                        </div>
                    </div>

                    <div className='mt-10 space-y-8 lg:space-y-3'>
                        <div className="p-3 rounded-lg border-2 border-[#532B79] hover:border-[#FA4D71] shadow-lg min-h-[180px] ">
                            <span>
                                <AiOutlineInteraction size={25} className='theme-color' />
                            </span>
                            <h2 className='text-2xl py-3'>Interact</h2>
                            <p className='text'>Become a Premium Member & Start a Conversation.
                            </p>
                        </div>

                        <div className="p-3 rounded-lg border-2 border-[#532B79] hover:border-[#FA4D71] shadow-lg min-h-[180px]">
                            <span>
                                <FaCreditCard size={25} className='theme-color' />
                            </span>
                            <h2 className='text-2xl py-3'>Pay</h2>
                            <p className='text'>Pay to get the best from this site.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HowItWorks;