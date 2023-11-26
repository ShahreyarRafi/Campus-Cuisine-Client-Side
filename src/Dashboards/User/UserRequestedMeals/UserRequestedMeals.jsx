import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic/useAxiosPublic";
import { Link } from "react-router-dom";


const UserRequestedMeals = () => {


    const axiosSecure = useAxiosPublic();
    const { data: reqMeals = [] } = useQuery({
        queryKey: ['reqMeals'],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/users/${user?.email}`);
            const res = await axiosSecure.get(`/api/request-meal`);
            return res.data;
        }
    })


    console.log(reqMeals);


    return (
        <div>
            <div className='w-full h-[69vh] flex justify-center items-center bg-[#1965a423]'>
                <div className="font-primary max-w-[1700px] w-full py-10 px-10 mx-auto duration-300">
                    <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                        <span className="">Your Requested </span>
                        <span className="text-[#B3845A]">Meals</span>
                    </h1>
                    <body className="flex items-center justify-center">
                        <div className="container duration-300">
                            <div className="w-full bg-white rounded-2xl overflow-hidden sm:shadow-lg my-5 duration-300">
                                <div className="hidden xl:block bg-[#1965a44b] duration-300">
                                    <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                        <h5 className="w-full mr-10">Meal Title</h5>
                                        <h5 className="w-full mr-10">Likes</h5>
                                        <h5 className="w-full mr-10">Reviews</h5>
                                        <h5 className="w-full mr-10">Status</h5>
                                        <h5 className="">Action</h5>
                                    </div>
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    {reqMeals.map((meal) => (
                                        <div key={meal._id} className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between border border-gray-100 hover:bg-[#193ea417] px-10 py-5 duration-300">
                                            <h5 className="w-full mr-10 text-lg font-semibold line-clamp-1" data-tooltip-id="all-meal-page-meal-title" data-tooltip-content={meal.meal_title}>{meal.title}</h5>
                                            <h5 className="w-full mr-10">{meal.liked_count}</h5>
                                            <h5 className="w-full mr-10">{meal.review_count}</h5>
                                            <h5 className="w-full mr-10">Status Here</h5>
                                            <Link to={`/details/${meal._id}`}>
                                                <h5 className="font-bold text-[#1965a4be] hover:text-red-400 duration-300">Cancel</h5>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </body>
                </div>
            </div>
        </div>
    );
};

export default UserRequestedMeals;