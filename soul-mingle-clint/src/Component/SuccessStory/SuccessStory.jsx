import SectionTitel from "../../Shared/SectionTitel/SectionTitel";
import { Rating } from '@smastrom/react-rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import '@smastrom/react-rating/style.css'
import { Spinner } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import '../../index.css'
import usePublicUrl from "../../Hooks/usePublicUrl";

const SuccessStory = () => {

    const axiosPublicUrl = usePublicUrl()

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosPublicUrl.get('/reviews');
            // console.log("Tuuuuuuuuuuuuuuuuuuuuuuu", res.data); 
            return res.data || [];
        }
    });


    if (isLoading) return <Spinner ></Spinner>

    return (
        <div className="py-10">
            <SectionTitel
                title='Couples Success Story'
                text='Individuals who discovered their partner through our services'>

            </SectionTitel>

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

export default SuccessStory; 