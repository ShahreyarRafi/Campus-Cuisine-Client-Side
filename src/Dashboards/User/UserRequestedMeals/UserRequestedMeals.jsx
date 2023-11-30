import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic/useAxiosPublic";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../services/Firebase/AuthProvider";

const itemsPerPage = 10;

const UserRequestedMeals = () => {
    const { user } = useContext(AuthContext);
    const [reqMealsData, setReqMealsData] = useState(null);
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: reqMeals = [] } = useQuery({
        queryKey: ['reqMeals'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/request-meal`);
            const userReqMeals = res.data.filter(meal => meal.user_email === user?.email);
            setReqMealsData(userReqMeals);
            return userReqMeals;
        },
        enabled: Boolean(user?.email),
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedReqMeals = reqMealsData?.slice(startIndex, endIndex);

    const handleDelivery = async (mealId) => {
        try {
            await axiosPublic.patch(`/meal/${mealId}`, {
                delivery_status: "Delivered"
            });

            const remaining = await axiosPublic.get(`/api/request-meal`);
            setReqMealsData(remaining);
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const pages = Array.from({ length: Math.ceil((reqMealsData?.length || 0) / itemsPerPage) }, (_, index) => index + 1);

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
                            <div className="w-full bg-white rounded-2xl overflow-hidden sm:shadow-lg my-5 duration-300">
                                <div className="hidden xl:block bg-[#1965a44b] duration-300">
                                    <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                        <h5 className="w-[160%] mr-10">Meal Title</h5>
                                        <h5 className="w-full mr-10">Likes</h5>
                                        <h5 className="w-full mr-10">Reviews</h5>
                                        <h5 className="w-full mr-10">Status</h5>
                                        <h5 className="">Action</h5>
                                    </div>
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    {paginatedReqMeals?.map((meal) => (
                                        <div key={meal._id} className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between border border-gray-100 hover:bg-[#193ea417] px-10 py-5 duration-300">
                                            <h5 className="w-[160%] mr-10 text-lg font-semibold line-clamp-1" data-tooltip-id="all-meal-page-meal-title" data-tooltip-content={meal.meal_title}>{meal.title}</h5>
                                            <h5 className="w-full mr-10">{meal.liked_count}</h5>
                                            <h5 className="w-full mr-10">{meal.review_count}</h5>
                                            <h5 className="w-full mr-10">{meal.delivery_status}</h5>
                                            <button onClick={(e) => handleCancel(e, meal._id)} className="font-bold text-[#1965a4be] hover:text-red-400 duration-300">Cancel</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                {pages.map((page) => (
                                    <button
                                        key={page}
                                        className={`pb-1 m-1 border-2 rounded-full w-10 h-10 text-[18px] ${page === currentPage ? 'bg-slate-400 text-white' : 'bg-white text-slate-400'
                                            }`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
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

export default UserRequestedMeals;
