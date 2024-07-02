import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";



// eslint-disable-next-line react/prop-types
const BiodataCard = ({ item }) => {



    const { permanentDivision, biodataId, biodataType, occupation, profileImage, age } = item || {};

    return (
        <div className="text-xl md:text-base lg:text-base border-2 rounded-lg border-gray-200" >
            <div className="-z-10 relative bg-[#30384B] w-full  py-20 md:py-12 lg:py-10 text-right rounded-lg">
                <p className="font-semibold text-[#FFF7FB] absolute bottom-4 right-4">Age: {age}</p>
            </div>
            <div className=" px-2 -mt-20 md:-mt-12 lg:-mt-10 space-y-1 z-10">
                <img className="z-10 w-3/5 border-4 border-white rounded-full" src={profileImage} alt="Profile Image" />

                <p className="font-semibold">Biodata ID: {biodataId}</p>
                <p className="flex  items-center ">
                    Permanent Division: {permanentDivision}
                    <FaLocationDot className="text-[#FA4D71]" />
                </p>


                <article className="flex justify-start items-center gap-2">
                    <p>Biodata Type: {biodataType}</p>

                </article>

                <p >Occupation: {occupation}</p>
            </div>

            
                <div className="w-full ml-3 py-4">
                    <Link className="py-1 px-2 rounded-lg theme-bg hover:text-[#DBDCDD] " to={`/viewdetails/${biodataId}`}>
                        Details
                    </Link>
                </div>
            

        </div>
    );
};

export default BiodataCard;