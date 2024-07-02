import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserInfo from "../../Hooks/useUserInfo";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Login = () => {

    const { singinUser, googleSingin, setLoader } = useUserInfo();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const onSubmit = (data) => {
        singinUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Email or password did not match",
                    showConfirmButton: false,
                    timer: 5000
                });
                setLoader(false)
            })


    };

    // handle google sing in
    const loginWithGoogle = () => {
        googleSingin()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Success",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 5000
                });
                setLoader(false)
            })
        navigate(from, { replace: true });
    }

    return (
        <div className=" mt-10 register-section shadow-2xl p-5 min-h-[650px]  ">

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className=" mt-16 w-full md:w-3/4 lg:w-3/5 mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3E4152] focus:outline-none focus:ring-0 focus:border-[#3E4152] peer ${errors.email ? 'border-red-500' : ''}`}
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="email"
                        className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3E4152] peer-focus:dark:text-[#3E4152] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${errors.email ? 'text-red-500' : ''}`}
                    >
                        Email address
                    </label>
                    {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        {...register('password', { required: true })}
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#3E4152] focus:outline-none focus:ring-0 focus:border-[#3E4152] peer ${errors.password ? 'border-red-500' : ''}`}
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="password"
                        className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#3E4152] peer-focus:dark:text-[#3E4152] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${errors.password ? 'text-red-500' : ''}`}
                    >
                        Password
                    </label>
                    {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
                </div>

                <button
                    type="submit"
                    className="button"
                >
                    Login
                </button>
            </form>


            {/* social sin g */}

            <div className="mt-5 w-full md:w-3/4 lg:w-3/5 mx-auto">
                <button onClick={loginWithGoogle} type="submit" className="button">
                    <span className="flex items-center gap-2">
                        <FcGoogle size={25} />
                        Login With Google</span>
                </button>

                <Link className="mt-4 block text-gray-500" to='/register'>Do not have an account?
                    <span className="ml-2 theme-color underline hover:text-[#532B79] cursor-pointer">Register</span>
                </Link>

            </div>

        </div>
    );
};

export default Login;