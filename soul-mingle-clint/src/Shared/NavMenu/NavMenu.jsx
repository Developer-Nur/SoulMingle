import { Link, NavLink, useLocation } from 'react-router-dom';
import '../../index.css'
import { useState } from 'react';
import useUserInfo from '../../Hooks/useUserInfo';
import Spinner from '../Spinner/Spinner';
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';
import useAdmin from '../../Hooks/useAdmin';

const NavMenu = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logOut, loader } = useUserInfo();
    const { admin} = useAdmin();

    const isAdmin =  admin?.role === "admin" && true

    // console.log("is admin or nit", isAdmin);


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
    if (loader) {
        return <Spinner />;
    }
    return (
        <header className="header text-white py-3 rounded-lg">
            <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    <div className="flex items-center">
                        <img src="/logo/menu-Soul-Mingle.png" className="mr-3  w-12 rounded-full" alt="Soul Mingle Logo" />

                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden md:block">Soul Mingle</span>
                    </div>

                    <div className="flex items-center lg:order-2 gap-2 md:gap-4 ">

                        {/* menu left button */}
                        {
                            user && <Tooltip title={user.displayName} arrow>
                                <img className='cursor-pointer rounded-full w-14' src={user.photoURL} alt='User Profile' />
                            </Tooltip>
                        }

                        {user && location.pathname !== '/dashboard' && (
                            <button onClick={userLogout} className='bg-white theme-color px-2 py-2 rounded-lg hover:text-gray-700'>
                                Logout
                            </button>
                        )}

                        {!user && (
                            <Link to='/login'>
                                <button className='p-2 border-2 border-white rounded-lg hover:text-gray-700'>
                                    Log in
                                </button>
                            </Link>
                        )}

                        {/* small devise menu */}
                        <button

                            onClick={toggleMobileMenu}
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded={isMobileMenuOpen}>

                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">

                                <path
                                    fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg
                                className={`w-6 h-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg" >


                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>


                    {/* Menu for large devises */}
                    <div
                        className={`${isMobileMenuOpen ? 'block' : 'hidden'
                            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1 `}
                        id="mobile-menu-2">
                        <nav className="flex flex-col mt-4 lg:flex-row lg:space-x-4 lg:mt-0">

                            <NavLink className=' hover:text-[#FA4D71]  hover:bg-white rounded-lg ' to='/'>Home</NavLink>

                            <NavLink className='  hover:text-[#FA4D71] hover:bg-white rounded-lg ' to='/biodata'>Biodatas</NavLink>

                            <NavLink className='  hover:text-[#FA4D71] hover:bg-white rounded-lg ' to='/aboutus'>About Us</NavLink>

                            <NavLink className='  hover:text-[#FA4D71] hover:bg-white rounded-lg ' to='/contactus'>Contact Us</NavLink>

                            {/* admin dashboard home page */}
                            {
                                user && isAdmin && <NavLink className='hover:text-[#FA4D71] hover:bg-white rounded-lg ' to='/dashboard/admin-home'>Dashboard</NavLink>
                            }
                            {/* user dashboard home page */}
                            {
                                user && !isAdmin && <NavLink className='hover:text-[#FA4D71] hover:bg-white rounded-lg ' to='/dashboard/view-bio'>Dashboard</NavLink>
                            }

                        </nav>
                    </div>
                </div>
            </nav>
        </header >
    );
};

export default NavMenu;