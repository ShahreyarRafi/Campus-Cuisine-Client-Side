import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic/useAxiosPublic";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../services/Firebase/AuthProvider";

const itemsPerPage = 10;

const ServeMeals = () => {
    const { user } = useContext(AuthContext);
    const [reqMealsData, setReqMealsData] = useState(null);
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: reqMeals = [] } = useQuery({
        queryKey: ['reqMeals'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/request-meal`);
            return setReqMealsData(res.data);
        }
    })

    const handleDelivery = async (e, mealId) => {
        e.preventDefault();

        try {
            const meal = reqMealsData.find(item => item._id === mealId);

            if (meal.delivery_status === "Delivered") {
                Swal.fire({
                    icon: 'info',
                    title: 'Already Served',
                    text: 'This meal has already been served.',
                });
            } else {
                await axiosPublic.patch(`/meal/${mealId}`, {
                    delivery_status: "Delivered"
                });

                const res = await axiosPublic.get(`/api/request-meal`);
                setReqMealsData(res.data);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Delivery Status Updated',
                    text: 'The delivery status has been successfully updated.',
                });
            }
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const handleCancel = (e, mealId) => {
        e.preventDefault();

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
                fetch(`https://campus-cuisine.vercel.app/api/request-meal/${mealId}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Item has been deleted.',
                                'success'
                            );
                            const remaining = reqMealsData.filter(item => item._id !== mealId);
                            setReqMealsData(remaining);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPublic.get(`/find-user-to-serve?searchQuery=${searchQuery}`);
            const searchedUsers = response.data;
            setReqMealsData(searchedUsers);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedReqMeals = reqMealsData?.slice(startIndex, endIndex);

    const totalPages = Math.ceil((reqMealsData?.length || 0) / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className='w-full min-h-screen flex justify-center items-center bg-[#1965a423]'>
                <div className="font-primary max-w-[1700px] w-full px-10 mx-auto duration-300">
                    <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                        <span className="">Your Requested </span>
                        <span className="text-[#B3845A]">Meals</span>
                    </h1>
                    <body className="flex items-center justify-center">
                        <div className="container duration-300">
                            <form onSubmit={handleSearch} className='w-full flex justify-center mb-7'>
                                <input
                                    type="text"
                                    className="bg-white dark:bg-zinc-800 text-black dark:text-white peer block min-h-[auto] w-[80vw] lg:w-[50vw] md:px-12 px-7 md:py-4 py-2 rounded-l border dark:border-zinc-700 border-stone-200 leading-[1.6] lg:drop-shadow-2xl outline-none transition-all duration-300 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput1"
                                    placeholder="Search User Here..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="text-lg px-3 md:text-xl pointer-events-none absolute left-3 bottom-[6px] md:bottom-4 mb-[2px] max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >Type Here...
                                </label>
                                <button type="submit" className="relative rounded-r bg-[#B3845A] hover:bg-[#ebb587] font-primary font-semibold text-[19px] text-white md:px-12 px-7 md:py-4 py-2">Search</button>
                            </form>
                            <div className="w-full bg-white rounded-2xl overflow-hidden sm:shadow-lg my-5 duration-300">
                                <div className="hidden xl:block bg-[#1965a44b] duration-300">
                                    <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                        <h5 className="w-[160%] mr-10">Meal Title</h5>
                                        <h5 className="w-full mr-10">User Email</h5>
                                        <h5 className="w-full mr-10">User Name</h5>
                                        <h5 className="w-full mr-10">Status</h5>
                                        <h5 className="max-w-[80px] w-full">Serve</h5>
                                        <h5 className="max-w-[80px] w-full">Cancel</h5>
                                    </div>
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    {paginatedReqMeals?.map((meal) => (
                                        <div key={meal._id} className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between border border-gray-100 hover:bg-[#193ea417] px-10 py-5 duration-300">
                                            <h5 className="w-[160%] mr-10 text-lg font-semibold line-clamp-1" data-tooltip-id="all-meal-page-meal-title" data-tooltip-content={meal.meal_title}>{meal.title}</h5>
                                            <h5 className="w-full mr-10">{meal.user_email}</h5>
                                            <h5 className="w-full mr-10">{meal.user_name}</h5>
                                            <h5 className="w-full mr-10">{meal.delivery_status}</h5>
                                            <button onClick={(e) => handleDelivery(e, meal._id)} className="max-w-[80px] w-full font-bold text-[#1965a4be] hover:text-red-400 duration-300">Serve</button>
                                            <button onClick={(e) => handleCancel(e, meal._id)} className="max-w-[80px] w-full font-bold text-[#1965a4be] hover:text-red-400 duration-300">Cancel</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                {/* Pagination buttons */}
                                {[...Array(totalPages).keys()].map((page) => (
                                    <button
                                        key={page + 1}
                                        className={`pb-1 m-1 border-2 rounded-full w-10 h-10 text-[18px] ${page + 1 === currentPage ? 'bg-slate-400 text-white' : 'bg-white text-slate-400'
                                            }`}
                                        onClick={() => handlePageChange(page + 1)}
                                    >
                                        {page + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </body>
                </div>
            </div>
        </div>
    );
};

export default ServeMeals;
