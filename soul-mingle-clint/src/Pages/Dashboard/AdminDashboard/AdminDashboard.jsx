import { useQuery } from "@tanstack/react-query";
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import Spinner from "../../../Shared/Spinner/Spinner";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";

const AdminDashboard = () => {

    const axiosSecure = useAxiosSecureUlr();

    const { data: sumOff = [], isLoading } = useQuery({
        queryKey: ["sum"],
        queryFn: async () => {
            const res = await axiosSecure.get("/score")
            return res.data;
        }
    })

    const { total, Male, Female } = sumOff;

    const { data: theTotal = [], isLoading: totalisLoading } = useQuery({
        queryKey: ["theSum"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allinfo")
            return res.data;
        }
    })

    // console.log("the total is", theTotal);


    const { totalPaidAmount, totalPremiumBiodataCount
         } = theTotal;

    if (isLoading || totalisLoading) return <Spinner />

    return (
        <div>
            <SectionTitel title="Admin Dashboard" text="Streamlined Control and Insights"></SectionTitel>



            <div className="w-full lg:w-4/5 mx-auto mt-10">
                <h2 className="pl-2 my-10 border-[#FA4D71] border-l-2 text-xl ">The Admin Dashboard</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center" >
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl">Total  Biodata: <span className="text-[#FA4D71]"> {total}</span></h2>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl">Total Male Biodata: <span className="text-[#FA4D71]"> {Male}</span></h2>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl">Total Female Biodata: <span className="text-[#FA4D71]"> {Female}</span></h2>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl">Total Premium Biodata: <span className="text-[#FA4D71]"> {totalPremiumBiodataCount}</span></h2>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl">Total Revenue: <span className="text-[#FA4D71]"> ${totalPaidAmount}</span></h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;