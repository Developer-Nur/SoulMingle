import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useUserInfo from "../../../Hooks/useUserInfo";
import useAxiosSecureUlr from "../../../Hooks/useAxiosSecureUlr";
import "../../../index.css"
import Spinner from "../../../Shared/Spinner/Spinner";

// eslint-disable-next-line react/prop-types
const CheckoutForm = () => {
    // { requestContactInfo }
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState();
    const [paymentSuccess, setPaymentSuccess] = useState();
    const [clientSecret, setClientSecret] = useState();
    const axiosSecure = useAxiosSecureUlr();

    const { user, loader, requestInfo } = useUserInfo();
    const totalPrice = 5;
    // console.log("the ultimate total amount is", user.displayName);


    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log("Payment details", res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
                .catch(error => console.log("payment error is", error.message))
        }
    }, [axiosSecure, totalPrice])

    // handle payment submit
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
            console.log("Payment error");
        }
        else {
            setError("")
            // console.log("the payment is", paymentMethod);

        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName || 'anonymous',
                    email: user.email || 'anonymous',
                }
            }
        })
        if (confirmError) {
            console.log("Payment confirmation error",);
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Payment confirmation error. Try again later!",
                showConfirmButton: false,
                timer: 2500
            });
        }
        else {
            // after payment success
            if (paymentIntent.status === "succeeded") {
                setPaymentSuccess(paymentIntent.id)

                const paymentDetail = {
                    biodataId: requestInfo.biodataId,
                    transsectionId: paymentIntent.id,
                    paidAmount: totalPrice,
                    date: new Date(),
                    userEmail: user?.email,
                    paymentStatus: "pending",
                    name: user.displayName
                }

                try {
                    // post the payment detail to data base
                    const res = await axiosSecure.post('/payment', paymentDetail);
                    if (res.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }                 

                } catch (error) {
                    console.log("Error saving payment data", error.message);
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Try again later!",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            }
        }
    }

    if (loader) {
        return <Spinner />
    }

    return (
        <div>
            {
                paymentSuccess && <h2 className="mt-6">Your payment id is: {paymentSuccess} </h2>
            }
            <form className="mt-7" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="custom-input"
                />
                <button className="mt-5 button" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500 py-4">{error}</p>
            </form>
        </div>
    );
};



export default CheckoutForm;