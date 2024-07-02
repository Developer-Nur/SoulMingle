import useUserInfo from "../../../Hooks/useUserInfo";
import SectionTitel from "../../../Shared/SectionTitel/SectionTitel";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './../CheckoutForm/CheckoutForm';
import "../../../index.css"
import Spinner from "../../../Shared/Spinner/Spinner";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);
const CheckoutPage = () => {

    // const axiosSecure = useAxiosSecureUlr();
    const { loader,requestInfo } = useUserInfo();
    

    if (loader) {
        return <Spinner/>
    }

    return (
        <div className="container">
            <SectionTitel title="Checkout Page" text="Almost there! Finalize your purchase."></SectionTitel>

            <div className="w-full p-2 md:w-4/5 lg:w-3/5 mx-auto">
                <h2 className="mt-10 text-right text-xl theme-color">Total amount is: $5</h2>
                <form className="mt-5">
                    <div>
                        <label>
                            <p>
                                You have request contact information for Biodata Id:
                            </p>
                            <input className="mt-2 border-2 border-[#c3c3c3] w-full theme-color text-xl p-2 rounded-xl" defaultValue={requestInfo?.biodataId} readOnly />
                        </label>

                        <label >
                            <p className="mt-5">
                                Your email is
                            </p>
                            <input className="mt-2 border-2 border-[#c3c3c3] w-full theme-color text-xl p-2 rounded-xl" defaultValue={requestInfo?.userEmail} readOnly />
                        </label>
                    </div>

                </form>
                <Elements stripe={stripePromise}>
                    <CheckoutForm  />
                </Elements>
            </div>


        </div>
    );
};

export default CheckoutPage;