import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure'
import useAuth from '../../../Hook/useAuth';
import { useQuery } from 'react-query';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';
import Swal from 'sweetalert2';



const CheckoutForm = ({ totalPrice, selectedPlan }) => {


    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const [usersData, setUsersData] = useState([]);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();



    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/users/${user?.email}`);
            const res = await axiosPublic.get(`/users`);
            return setUsersData(res.data);
        }
    })


    const currentUser = usersData.find((userData) => userData?.email.toLowerCase() === user?.email.toLowerCase());


    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])



    const handlePaymentSuccess = async () => {
        await axiosSecure.put(`/update-user-badge/${currentUser._id}`, {
            badge: selectedPlan,
        });
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 2000
          });
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        } else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                handlePaymentSuccess();
            }
        }
    }

    return (
        <div className='flex justify-center items-center my-20'>
            <div>
                <h3 className='text-2xl font-bold mb-3'>You have selected: {selectedPlan} package</h3>
                <h3 className='text-2xl font-bold mb-10'>You will be billed: ${totalPrice}</h3>
                <form onSubmit={handleSubmit}>
                    <CardElement className='border-[3px]  px-3 py-3 rounded-lg'
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
                    />
                    <button
                        className="btn btn-primary my-4 px-8 py-3 mt-8 text-[18px] text-center"
                        disabled={!currentUser?._id}
                    >
                        Pay
                    </button>

                    <p className='text-red-600'>{error}</p>
                    {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}

                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;