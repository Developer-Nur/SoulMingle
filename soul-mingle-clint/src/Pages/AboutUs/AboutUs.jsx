import SectionTitel from '../../Shared/SectionTitel/SectionTitel';
import "../../index.css";
import AboutUsBanner from "../../../public/sliderImages/aboutusBanner.png"
import usePublicUrl from '../../Hooks/usePublicUrl';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating';
import Spinner from '../../Shared/Spinner/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import '@smastrom/react-rating/style.css'

const AboutUs = () => {

    const axiosPublicUrl = usePublicUrl()

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosPublicUrl.get('/reviews');
            // console.log("review data", res.data);
            return res.data || [];
        }
    });

    if (isLoading) return <Spinner></Spinner>

    return (
        <div className='my-10'>
            <div className="w-full">
                <img className="w-full h-[450px] object-cover rounded-lg" src={AboutUsBanner} alt="Banner Image" />
            </div>

            <div className='py-10'>
                <SectionTitel title="About Us" text="Why we exist and what we stand for"></SectionTitel>
            </div>


            <p className=' md:px-10 lg:px-20'>
                Welcome to <i>Soul Mingle</i>, where we believe that true connections are made with heart and soul. Our platform is dedicated to helping you find your perfect match in a safe, friendly, and supportive environment. We understand that marriage is a significant and beautiful journey, and our mission is to assist you in finding a partner who complements your values, dreams, and lifestyle. With a focus on authenticity and integrity, we provide a seamless and personalized experience, ensuring that every profile is genuine and every interaction meaningful. Join us at [Your Website Name], where love begins with trust, and let us be a part of your beautiful love story.
            </p>

        
            <div className="pink-bg  md:p-10 lg:p-16 mt-10 rounded-lg">
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    loop={true}
                    className="mySwiper w-4/5">
                    {
                        reviews && reviews.map((items, index) => <SwiperSlide
                            className="text-center space-y-3"
                            key={index} >

                            <div className=" flex flex-col items-center space-y-3">
                                <img className=" w-[250px] fancy-border-radius" src={items.image} alt="" />
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={items.rating}
                                    readOnly
                                />
                            </div>
                            <p className="text-xl font-semibold">Marriage Date: {items.marriageDate}</p>
                            <p>{items.story}</p>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default AboutUs;