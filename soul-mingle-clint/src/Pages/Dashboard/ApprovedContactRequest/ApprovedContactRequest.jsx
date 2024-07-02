import { useQuery } from "@tanstack/react-query";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import Spinner from "../../../Shared/Spinner/Spinner";
import Swal from "sweetalert2";


const ApprovedContactRequest = () => {


    const axiosSecure = useAxiosSecureUlr();

    const { data: paymentToApprove = [], isLoading, refetch } = useQuery({
        queryKey: ["premium"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-payments")
            return res.data
        }
    })

    // console.log("payments", paymentToApprove);

    // Handle Confirm Request
    const handleConfirmRequest = item => {
        // console.log("confirmatin email is", item.userEmail);
        axiosSecure.patch(`/approved-contact-request?biodataId=${item.biodataId}`)
            .then(res => {
                refetch()
                if (res.data?.modifiedCount > 0) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Approver!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                const paymentInfoData = {
                    biodataId: item.biodataId,
                    transsectionId: item.transsectionId,
                    paidAmount: item.paidAmount,
                    date: item.date,
                    userEmail: item.userEmail,
                    name: item.name,
                }

                axiosSecure.post("/payments", paymentInfoData)
                    .then()
                    .catch()
                refetch()

            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 2500
                });
            })

    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <SectionTitel title="Approved Contact Request" text="Optimized Oversight of Streamlined Connections"></SectionTitel>


            <div className="w-full lg:w-4/5 mx-auto mt-10">
                <h2 className="pl-2 border-[#FA4D71] border-l-2 text-xl ">Approved Contact Request</h2>

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
                                paymentToApprove && paymentToApprove.map((item, index) => <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.userEmail}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.biodataId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.paymentStatus === "approved" ? "Approved" : (
                                            <button onClick={() => handleConfirmRequest(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approved request</button>
                                        )}
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApprovedContactRequest;