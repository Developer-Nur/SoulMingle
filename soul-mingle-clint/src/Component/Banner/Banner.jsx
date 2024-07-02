import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Slider1 from '/sliderImages/slider1.png'
import Slider2 from '/sliderImages/slider2.png'
import Slider3 from '/sliderImages/slider3.png'
import Slider4 from '/sliderImages/slider4.png'
import Slider5 from '/sliderImages/slider5.png'
import Slider6 from '/sliderImages/slider6.png'
import { Link } from 'react-router-dom';



const Banner = () => {
    return (
        <div>
            <Swiper


                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-[500px] rounded-2xl my-10">

                {/* Slider 1 */}
                <SwiperSlide>
                    <div className='relative w-full h-full'
                        style={{
                            backgroundImage: `url(${Slider1})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        <div className='w-full h-full absolute bg-gradient-to-r from-[#51515173] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7 '>


                            <h1 className=' text-xl md:text-3xl lg:text-6xl font-semibold '>Find Your Perfect Match</h1>
                            <p className='px-10 lg:w-2/4 text-center text-base md:text-[18px] text-white'>
                                Discover thousands of profiles tailored to your preferences.
                            </p>

                            <Link to='/'>
                                <button className='button bg-[#FA4D71] p-3 rounded-lg text-white'>
                                    Your Mate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slider 2*/}
                <SwiperSlide>
                    <div className='relative w-full h-full'
                        style={{
                            backgroundImage: `url(${Slider2})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        <div className='w-full h-full absolute bg-gradient-to-r from-[#51515173] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7 '>


                            <h1 className=' text-xl md:text-3xl lg:text-6xl font-semibold '>Love Knows No Boundaries</h1>
                            <p className='px-10 lg:w-2/4 text-center text-base md:text-[18px] text-white'>
                                Connect with singles worldwide and embrace diverse cultures.
                            </p>

                            <Link to='/'>
                                <button className='button bg-[#FA4D71] p-3 rounded-lg text-white'>
                                    Your Mate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slider 3*/}
                <SwiperSlide>
                    <div className='relative w-full h-full'
                        style={{
                            backgroundImage: `url(${Slider3})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        <div className='w-full h-full absolute bg-gradient-to-r from-[#51515173] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7 '>


                            <h1 className=' text-xl md:text-3xl lg:text-6xl font-semibold '>Trusted by Millions</h1>
                            <p className='px-10 lg:w-2/4 text-center text-base md:text-[18px] text-white'>
                                Join a secure and reliable community of hopeful singles.
                            </p>

                            <Link to='/'>
                                <button className='button bg-[#FA4D71] p-3 rounded-lg text-white'>
                                    Your Mate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>


                {/* Slider 4*/}
                <SwiperSlide>
                    <div className='relative w-full h-full'
                        style={{
                            backgroundImage: `url(${Slider4})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        <div className='w-full h-full absolute bg-gradient-to-r from-[#51515173] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7 '>


                            <h1 className=' text-xl md:text-3xl lg:text-6xl font-semibold '>Personalized Matches Just for You</h1>
                            <p className='px-10 lg:w-2/4 text-center text-base md:text-[18px] text-white'>
                                Get recommendations based on your unique personality.
                            </p>

                            <Link to='/'>
                                <button className='button bg-[#FA4D71] p-3 rounded-lg text-white'>
                                    Your Mate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>



                {/* Slider 5*/}
                <SwiperSlide>
                    <div className='relative w-full h-full'
                        style={{
                            backgroundImage: `url(${Slider5})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        <div className='w-full h-full absolute bg-gradient-to-r from-[#51515173] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7 '>


                            <h1 className=' text-xl md:text-3xl lg:text-6xl font-semibold '>Success Stories Await</h1>
                            <p className='px-10 lg:w-2/4 text-center text-base md:text-[18px] text-white'>
                                Be inspired by countless couples who found love here.
                            </p>

                            <Link to='/'>
                                <button className='button bg-[#FA4D71] p-3 rounded-lg text-white'>
                                    Your Mate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>



                {/* Slider 6*/}
                <SwiperSlide>
                    <div className='relative w-full h-full'
                        style={{
                            backgroundImage: `url(${Slider6})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        <div className='w-full h-full absolute bg-gradient-to-r from-[#51515173] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7 '>


                            <h1 className=' text-xl md:text-3xl lg:text-6xl font-semibold '>Start Your Journey to Forever</h1>
                            <p className='px-10 lg:w-2/4 text-center text-base md:text-[18px] text-white'>
                                Sign up now and find the one who completes you.
                            </p>

                            <Link to='/'>
                                <button className='button bg-[#FA4D71] p-3 rounded-lg text-white'>
                                    Your Mate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>



            </Swiper>
        </div >
    );
};

export default Banner;