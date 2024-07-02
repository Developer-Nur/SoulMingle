import { useQuery } from "@tanstack/react-query";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";
import useUserInfo from "../../../Hooks/useUserInfo";
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import Spinner from "../../../Shared/Spinner/Spinner";
import Swal from "sweetalert2";


const FavouritesBiodata = () => {


    const { user, loader } = useUserInfo();
    const axiosSecure = useAxiosSecureUlr();

    const { data: favoriteBio = [], isLoading, refetch } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorite?email=${user?.email}`)
            return res.data || [];
        }
    });

    // console.log("favorite Biodata is", favoriteBio);




    // Handle Delete Request
    const handleDeleteRequest = id => {
        // console.log("detele biodata request id is", id);
        axiosSecure.delete(`/delete-favorite/${id}`)
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

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <SectionTitel title="Favourites Biodata"></SectionTitel>


            <div className="w-full lg:w-4/5 mx-auto mt-10">
                <h2 className="pl-2 border-[#FA4D71] border-l-2 text-xl ">Review all your Favorite Biodatas</h2>

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
                                    Permanent Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Occupation
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(favoriteBio) && favoriteBio.length > 0 ? (
                                    favoriteBio.map((item, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.biodataId}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.permanentDivision}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.occupation}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleDeleteRequest(item.biodataId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            No favorite biodata found.
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

export default FavouritesBiodata;