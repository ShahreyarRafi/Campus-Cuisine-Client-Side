import { useLocation } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from 'react';

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const [totalPrice, setTotalPrice] = useState(0)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedPlan = searchParams.get('checkout') || 'default';

    useEffect(() => {
        // Set the price based on the selected plan
        if (selectedPlan === 'Silver') {
          setTotalPrice(10);
        } else if (selectedPlan === 'Gold') {
          setTotalPrice(24);
        } else if (selectedPlan === 'Platinum') {
          setTotalPrice(35);
        } else {
          // Default case or handle other plans if needed
          setTotalPrice(0);
        }
      }, [selectedPlan, totalPrice]);
    

    return (
        <div className='flex justify-center py-20'>
            <div className='max-w-3xl'>
                <h2 className='text-3xl font-bold'>Payment Page</h2>
                <Elements stripe={stripePromise}>
                    <CheckoutForm totalPrice={totalPrice} selectedPlan={selectedPlan}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;