import { useQuery } from "@tanstack/react-query";
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";
import Spinner from "../../../Shared/Spinner/Spinner";
import Swal from "sweetalert2";

const ApprovedPremium = () => {

    const axiosSecure = useAxiosSecureUlr();

    const { data: premiumBio = [], isLoading, refetch } = useQuery({
        queryKey: ["premium"],
        queryFn: async () => {
            const res = await axiosSecure.get("/premium-biodatas")
            return res.data
        }
    })

    // console.log("premium biodata found", premiumBio);



    const handleMakePremium = (email) => {
        // console.log("Request to make premium for:", email);
        axiosSecure.patch(`/make-premium-biodata?email=${email}`)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    refetch()
                    Swal.fire("Success!");
                }
            })
            .catch(error => {
                Swal.fire(error.message)
            });
    };



    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <SectionTitel title="Approved Premium" text="Verified and Enhanced Access"></SectionTitel>


            <div className="w-full lg:w-4/5 mx-auto mt-10">
                <h2 className="pl-2 border-[#FA4D71] border-l-2 text-xl ">Manage  Premium Biodatas</h2>

                <div className="mt-7 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Biodata ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                premiumBio && premiumBio.map((item, index) => <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.biodataId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.isPremium === "premium" ? "Premium User" : (
                                            <button onClick={() => handleMakePremium(item.email)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Make Premium</button>
                                        )}
                                    </td>
                                </tr>

                                )
                            }




                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApprovedPremium;