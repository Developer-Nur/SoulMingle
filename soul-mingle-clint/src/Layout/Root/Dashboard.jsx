import { GiHamburgerMenu } from "react-icons/gi";
import { FaEdit, FaEye, FaFileContract, FaPager, FaRegWindowClose, FaUsers } from "react-icons/fa";
import { GiEngagementRing } from "react-icons/gi";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import '../../index.css';
import useUserInfo from "../../Hooks/useUserInfo";
import Swal from "sweetalert2";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { IoIosContacts } from "react-icons/io";
import useAdmin from "../../Hooks/useAdmin";
import Spinner from "../../Shared/Spinner/Spinner";





const Header = () => {

    const [navMenu, setNavMenu] = useState(true);
    const { user, logOut, loader } = useUserInfo();

    const { admin, AdminLoading } = useAdmin();

    const isAdmin = admin?.role === "admin" && true

    // console.log("is admin or nit", isAdmin);

    // handle log out
    const userLogout = () => {
        logOut()
            .then()
            .catch(error => {
                console.log("logout erron is", error.message);
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Can't logout at this moment",
                    showConfirmButton: false,
                    timer: 5000
                });
            })
    }

    if (AdminLoading) {
        return <Spinner />
    }

    return (
        <div className="relative dashboard py-10 px-5 min-h-screen">
            <div>
                <div className="ml-5">
                    <button onClick={() => setNavMenu(true)} className="mb-5 p-4 rounded-lg header hover:bg-[#3E4152]  border-none hover:text-[#FA4D71] text-white">
                        <GiHamburgerMenu size={20} />
                    </button>
                </div>


                {/* side bar menu */}
                <div className={navMenu ? '' : 'hidden'}>

                    <aside className="z-10 fixed top-0 left-0 flex flex-col h-screen w-64 p-4 overflow-hidden theme-bg">

                        <div className="mr-5 w-full h-s text-right">
                            <button onClick={() => setNavMenu(false)} className="p-2 rounded-lg  hover:bg-[#3E4152]  border-none">
                                <FaRegWindowClose size={19} className=" primary-title " />
                            </button>
                        </div>

                        <NavLink onClick={() => setNavMenu(false)} className="mt-4 shadow-lg uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white 
                        rounded-md" to='/'>Back To Home</NavLink>

                        {

                            isAdmin ?
                                <>{/* dashboard menu for admin */}
                                    <nav className="mt-4 space-y-2">

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/admin-home'> <MdOutlineAdminPanelSettings size={20} /> Admin Dashboard</NavLink>

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/manage-users'> <FaUsers size={20} /> Manage Users</NavLink>

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/approved-premium'> <FcAcceptDatabase size={20} />Approved Premium</NavLink>

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/approved-contact-request'> <IoIosContacts size={27} /> Approved Contact Request</NavLink>

                                    </nav>
                                </>
                                :
                                <>
                                    {/* dashboard menu for regular user */}
                                    <nav className="mt-4 space-y-2">

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/edit-bio'> <FaEdit size={20} /> Edit Biodata</NavLink>

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/view-bio'> <FaEye size={20} /> View Biodata</NavLink>

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/contact-request'> <FaFileContract size={20} /> My Contact Request</NavLink>

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/fav-bio'> <FaPager size={20} /> Favourite Biodatas</NavLink>

                                        <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#FA4D71] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/got-married'> <GiEngagementRing size={20} />Got Married</NavLink>
                                    </nav>
                                </>
                        }





                        <button onClick={userLogout} className='flex items-center justify-start gap-3 button mt-20 bg-white theme-color px-2 py-2 rounded-lg '>
                            Logout
                            <FiLogOut />
                        </button>
                    </aside>

                </div>
            </div>

            <div>
                <Outlet></Outlet>
            </div>
        </div >
    );
};

export default Header;