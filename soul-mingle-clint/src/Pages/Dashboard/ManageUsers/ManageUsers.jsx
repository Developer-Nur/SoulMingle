import { useQuery } from '@tanstack/react-query';
import useAxiosSecureUlr from '../../../Hooks/useAxiosSecureUlr';
import SectionTitel from '../../../Shared/SectionTitel/SectionTitel';
import Spinner from '../../../Shared/Spinner/Spinner';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const ManageUsers = () => {

    const [userByName, setUserByName] = useState('');
    const axiosSecure = useAxiosSecureUlr();

    const { data: allUser = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data
        }
    })



    // console.log("see if found user", userByName);

    // handle make a user admin
    const handleMakeAdmin = email => {
        // console.log("user email is", email);
        axiosSecure.patch(`/admin-users?email=${email}`)
            .then(res => {
                refetch()
                refetchViaName()
                if (res.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Admin Created!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: `Could not make Admin!${error.message}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            })
    }


    // handle make a user premium
    const handleMakePremium = email => {
        console.log("user email is", email);
        axiosSecure.patch(`/premium-users?email=${email}`)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    refetch()
                    refetchViaName()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Premium Member added!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: `Could not make premium!${error.message}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            })
    }





    const { data: userViaName = [], isLoading: loadingViaName, refetch: refetchViaName } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/search-user?username=${userByName}`);
            return res.data
        },
        enabled: !!userByName
    });

    // handle find user by name
    const handleSerchByName = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        setUserByName(name);
        e.target.reset();
    };

    if (userViaName.message) {
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: userViaName.message,
            showConfirmButton: false,
            timer: 2500
        });
    }

    useEffect(() => {
        if (userByName) {
            refetchViaName();
        }

        if (userByName && userViaName.message) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: userViaName.message,
                showConfirmButton: false,
                timer: 2500
            });
        }
    }, [userByName, userViaName, refetchViaName]);

    if (isLoading || loadingViaName) return <Spinner />

    return (
        <div>
            <SectionTitel title="Manage Users" text="User Management, Simplify and Control Access"></SectionTitel>

            <div className="w-full lg:w-4/5 mx-auto mt-10">
                <h2 className="pl-2 border-[#FA4D71] border-l-2 text-xl ">Manage All Users</h2>
                <div className="text-center my-7">
                    <form onSubmit={handleSerchByName}>
                        <input name='name' className="w-full md:w-4/5 lg:w-3/5  rounded border-[#c3c3c3] focus:border-pink-500" type="text" placeholder="Find a user by Name" />
                        <button className="-ml-16 bg-[#FA4D71] px-2 py-1 rounded-lg text-white hover:text-[#532B79]" type="submit" value="Submit">Find</button>
                    </form>
                </div>
                <div className="mt-7 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Make Admin
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Make Premium
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {userViaName.length > 0 ? (
                                userViaName.map((item, index) => (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.role === "admin" ? "Admin" : (
                                                <button onClick={() => handleMakeAdmin(item.email)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Make Admin</button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.isPremium === "premium" ? "Premium User" : (
                                                <button onClick={() => handleMakePremium(item.email)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Make Premium</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                Array.isArray(allUser) && allUser.length > 0 ? (
                                    allUser.map((item, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.role === "admin" ? "Admin" : (
                                                    <button onClick={() => handleMakeAdmin(item.email)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Make Admin</button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.isPremium === "premium" ? "Premium User" : (
                                                    <button onClick={() => handleMakePremium(item.email)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Make Premium</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>



                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;