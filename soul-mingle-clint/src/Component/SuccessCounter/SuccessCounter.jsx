import { BiObjectsHorizontalLeft } from "react-icons/bi";
import { FaFemale, FaMale } from "react-icons/fa";
import { FaConnectdevelop } from "react-icons/fa6";
import usePublicUrl from "../../Hooks/usePublicUrl";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Shared/Spinner/Spinner";





const SuccessCounter = () => {

    const axiosPublicUrl = usePublicUrl();

    const { data: sumOff = [], isLoading } = useQuery({
        queryKey: ["sum"],
        queryFn: async () => {
            const res = await axiosPublicUrl.get("/score")
            return res.data;
        }
    })
    // console.log("total score is", sumOff);

    const { total, Male, Female } = sumOff;

    if (isLoading) return <Spinner />

    return (
        <div className='my-10 pink-bg  p-6'>

            <div className="shadow-lg flex flex-col md:flex-row p-4 bg-white rounded-lg">

                <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <span>
                        <BiObjectsHorizontalLeft size={25} className='text-[#8d4dc9]' />
                    </span>
                    <div className="text-sm font-medium text-gray-500">Total Biodata</div>
                    <div className="text-2xl font-bold text-gray-900">{total}</div>
                </div>

                <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <FaMale size={25} className='text-[#7f1bdc]' />
                    <div className="text-sm font-medium text-gray-500">Total Male Biodata</div>
                    <div className="text-2xl font-bold text-green-500">{Male}</div>
                </div>

                <div className="flex-1 p-4">
                    <FaFemale size={25} className='text-[#18022d]' />
                    <div className="text-sm font-medium text-gray-500">Total Female Biodata</div>
                    <div className="text-2xl font-bold text-red-500">{Female}</div>
                </div>

                <div className="flex-1 p-4">
                    <FaConnectdevelop size={25} className='text-[#c384fe]' />
                    <div className="text-sm font-medium text-gray-500">Marriages completed</div>
                    <div className="text-2xl font-bold text-blue-600">0</div>
                </div>


            </div>
        </div>
    );
};

export default SuccessCounter;