import Lottie from "lottie-react";
import loadingSpinner from "/public/LottyAnimations/spinner.json";

const Spinner = () => {
    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center fixed inset-0 z-50">
            <Lottie className="w-full h-screen" animationData={loadingSpinner} />
        </div>
    );
};

export default Spinner;
