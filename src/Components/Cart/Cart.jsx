import React, { useContext } from "react";
import { AuthContext } from "../../services/Firebase/AuthProvider";
import Swal from "sweetalert2";

const Cart = ({ cartItems, setCartItems }) => {
    const { user } = useContext(AuthContext);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const UserCartItems = cartItems.filter(item => item.userEmail === user.email);

    const handleDelete = (e, cartItemId) => {
        e.preventDefault();
        console.log(cartItemId);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-10-server-biymh8jny-shahreyar-rafis-projects.vercel.app/cartItems/${cartItemId}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Item has been deleted.',
                                'success'
                            );

                            const remaining = cartItems.filter(item => item._id !== cartItemId);
                            setCartItems(remaining);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    };

    return (
        <div className='font-primary min-h-[80vh] flex items-center justify-center px-4 py-10 bg-[#090b11]'>
            {UserCartItems.length > 0 ? (
                <div>
                    <div className="max-w-6xl grid grid-cols-1 xl:grid-cols-2 gap-4 mx-auto">
                        {UserCartItems.map(cartItem => (
                            <div key={cartItem._id} className="mx-auto max-w-md md:max-w-3xl bg-[#1e2127] rounded text-gray-100">
                                <div className="h-full w-full flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl dark:hover-bg-gray-700">
                                    <img className=" object-cover w-full rounded-t-lg h-96 md:h-full md:w-60 md:rounded-none md:rounded-l-md" src={cartItem.photo} alt="" />
                                    <div className="w-full">
                                        <div className="flex flex-col justify between p-4 leading-normal">
                                            <div className="mx-auto mb-5">
                                                <h5 className="md:min-w-[300px] max-w-[300px] truncate  overflow-hidden mb-2 text-2xl font-medium text-gray-100">{cartItem.name}</h5>
                                                <p className="text-sm text-slate-400 p-1 flex justify-between w-72 border-b border-[#353a4a]"><span className="">Brand:</span> <span className="">{capitalizeFirstLetter(cartItem.brand)}</span></p>
                                                <p className="text-sm text-slate-400 p-1 flex justify-between w-72 border-b border-[#353a4a]"><span className="">Type:</span> <span className="">{cartItem.type}</span></p>
                                                <p className="text-sm text-slate-400 p-1 flex justify-between w-72 border-b border-[#353a4a]"><span className="">Engine Type:</span> <span className="">{cartItem.engine_type}</span></p>
                                                <p className="text-sm text-slate-400 p-1 flex justify-between w-72 border-b border-[#353a4a]"><span className="">Transmission:</span> <span className="">{cartItem.transmission}</span></p>
                                                <p className="text-sm text-slate-400 p-1 flex justify-between w-72 border-b border-[#353a4a]"><span className="">Drive System:</span> <span className="">{cartItem.drive_system}</span></p>
                                                <p className="text-sm text-slate-400 p-1 flex justify-between w-72 "><span className="">Price:</span> <span className="">${cartItem.price}</span></p>
                                            </div>
                                            <div className="mx-auto w-auto md:w-72">
                                                <button onClick={(e) => handleDelete(e, cartItem._id)} className="bg-[#c9363f] hover-bg-[#f14e59] px-3 py-2 text-white text-sm rounded">Remove From Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='h-[80vh] flex items-center justify-center'>
                    <p className='text-2xl font-bold font-primary text-white'>Empty Cart</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
