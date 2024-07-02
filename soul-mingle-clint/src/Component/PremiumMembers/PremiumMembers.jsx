import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner/Spinner";
import { FaLocationDot } from "react-icons/fa6";
import '../../index.css'
import { Link } from "react-router-dom";
import Select from 'react-select';
import { useEffect, useState } from "react";
import useAxiosSecureUlr from "../../Hooks/useAxiosSecureUlr";



const PremiumMembers = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const axiosSecure = useAxiosSecureUlr();

    // console.log(selectedOption.value);

    const options = [
        { value: 'old ', label: 'Old to young' },
        { value: 'young', label: 'Young to old' },
    ];

    // console.log("options", selectedOption)

    const { data: premiumMembers = [], isLoading, refetch } = useQuery({
        queryKey: ["premium"],
        queryFn: async () => {
            const res = await axiosSecure.get("/premium-biodatas");
            return res.data;
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            if (selectedOption && premiumMembers.length > 0) {
                const sortedData = [...premiumMembers]; 

                if (selectedOption.value === 'old') {
                    sortedData.sort((a, b) => b.age - a.age); // Descending
                } else if (selectedOption.value === 'young') {
                    sortedData.sort((a, b) => a.age - b.age); // Ascending
                }

                await refetch({ data: sortedData });
            }
        };

        fetchData();
    }, [selectedOption, premiumMembers, refetch]);


    if (isLoading) return <Spinner></Spinner>

    return (

        <div className="py-10">
            {/* selector */}
            <div className="py-5 w-full md:w-2/5 lg:w-1/5">
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
            </div>
            {/* Premium members card */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">

                {
                    premiumMembers && premiumMembers.filter(item => item.isPremium === 'premium').slice(0, 6).map((item, index) => <div className="text-xl md:text-base lg:text-base border-2 rounded-lg border-gray-200" key={index}>
                        <div className="-z-10 relative bg-[#30384B] w-full  py-20 md:py-12 lg:py-10 text-right rounded-lg">
                            <p className="text-white absolute bottom-1 right-1">Age: {item.age}</p>
                        </div>
                        <div className=" px-2 -mt-20 md:-mt-12 lg:-mt-10 space-y-1 z-10">
                            <img className="z-10 w-3/5 border-4 border-white rounded-full" src={item.profileImage} alt="Members" />

                            <p className="font-semibold">Profile ID: {item.biodataId}</p>
                            <p className="flex  items-center ">
                                <FaLocationDot className="text-[#FA4D71]" />
                                {item.permanentDivision}
                            </p>


                            <article className="flex justify-start items-center gap-2">
                                <p >{item.biodataType}</p>

                            </article>

                            <p >{item.occupation}</p>

                        </div>

                        <div className="w-full ml-3 py-4">
                            <Link to={`/viewdetails/${item.biodataId}`} >
                                <button className="py-1 px-2 rounded-lg theme-bg hover:text-[#DBDCDD] ">
                                    Details
                                </button>
                            </Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default PremiumMembers;