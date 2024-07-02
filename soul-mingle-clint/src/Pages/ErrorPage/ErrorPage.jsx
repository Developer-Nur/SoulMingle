import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import errorPage from "/public/LottyAnimations/errorAnimation.json";
import '../../index.css'

const ErrorPage = () => {
    return (
        <div className="relative max-w-7xl w-11/12 md:w-10/12  mx-auto py-20 text-center">
            <div className="w-full ">
                <Lottie className="w-full h-[500px]" animationData={errorPage}></Lottie>
            </div>
            <div className="text-[#FA4D71] absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-4xl font-semibold">404 page not found</p>
                <Link to={'/'}><button className="mt-2 rounded-lg py-2 px-2 button">Go Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;



