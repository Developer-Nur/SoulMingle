import { useQuery } from "@tanstack/react-query";
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";
import Spinner from "../../../Shared/Spinner/Spinner";
import useUserInfo from "../../../Hooks/useUserInfo";
import Swal from "sweetalert2";

const ContactRequest = () => {
    const { user } = useUserInfo();
    const axiosSecure = useAxiosSecureUlr();

    const { data: contacts = [], isLoading, refetch } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paid-contact?email=${user?.email}`)
            return res.data;
        }
    });

    if (isLoading) {
        return <Spinner />;
    }

    const { result, paymentRecords } = contacts;

    // Handle Delete Request
    const handleDeleteRequest = id => {
        console.log("detele biodata request id is", id);
        axiosSecure.delete(`/delete-request/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Try again please!",
                    showConfirmButton: false,
                    timer: 2500
                });
            })
    }

    return (
        <div>
            <SectionTitel title="Contact Requests" text="Manage and Review Your Connection Requests"></SectionTitel>

            <div className="w-full lg:w-4/5 mx-auto mt-10">
                <h2 className="pl-2 border-[#FA4D71] border-l-2 text-xl">Review all your Contact Requests</h2>

                <div className="mt-7 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Biodata Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mobile No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {result && result.map((item, index) => {
                                const paymentStatus = paymentRecords[index]?.paymentStatus || "N/A";
                                return (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.name}
                                        </th>

                                        <td className="px-6 py-4">
                                            {item.biodataId}
                                        </td>

                                        <td className="px-6 py-4">
                                            {paymentStatus}
                                        </td>

                                        <td className="px-6 py-4">
                                            {paymentStatus === "approved" ? item.mobileNumber : "....."}
                                        </td>

                                        <td className="px-6 py-4">
                                            {paymentStatus === "approved" ? item.email : "....."}
                                        </td>

                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDeleteRequest(item.biodataId)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactRequest;
