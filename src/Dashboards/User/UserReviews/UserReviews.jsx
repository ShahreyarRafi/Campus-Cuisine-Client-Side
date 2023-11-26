import React, { useState, useEffect, useContext } from 'react';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../../services/Firebase/AuthProvider';

const UserReviews = () => {
    const { user } = useContext(AuthContext);

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const axiosPublic = useAxiosPublic();
                const { data: meals = [] } = await axiosPublic.get(`/meals`);

                const mealLogs = meals.map((meal) => {
                    return {
                        reviews: meal.reviews.map((review) => ({
                            meal_id: review.meal_id,
                            reviewerName: review.name,
                            reviewerEmail: review.email,
                            mealTitle: review.title,
                            liked_count: review.liked_count,
                            review_count: review.review_count,
                            ratings: review.ratings,
                            reviewText: review.review_text,
                        })),
                    };
                });

                setLogs(mealLogs);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Filter reviews based on the current user's email
    const userReviews = logs.flatMap((log) =>
        log.reviews.filter((review) => review.reviewerEmail === user?.email)
    );



    console.log(userReviews);

    return (
        <div className=''>
            {loading ? (
                <div className='min-h-[69vh] flex justify-center items-center'>
                    <span className="loading loading-spinner text-[#B3845A] loading-lg"></span>
                </div>
            ) : (
                <div className='min-h-[69vh] mt-36'>
                    <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                        <span className="">Your </span>
                        <span className="text-[#B3845A]">Reviews</span>
                    </h1>
                    < body className="flex items-center justify-center">
                        <div className="container duration-300">
                            <div className="w-full bg-white rounded-2xl overflow-hidden sm:shadow-lg my-5 duration-300">
                                <div className="hidden xl:block bg-[#1965a44b] duration-300">
                                    <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                        <h5 className="w-full mr-10">Meal Title</h5>
                                        <h5 className="w-full mr-10">Likes</h5>
                                        <h5 className="w-full mr-10">Reviews</h5>
                                        <h5 className="w-full mr-10">Ratings</h5>
                                        <h5 className="w-full mr-10">Comment</h5>
                                    </div>
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    {userReviews.map((review, index) => (
                                        <div key={index} className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between border border-gray-100 hover:bg-[#193ea417] px-10 py-5 duration-300">
                                            <h5 className="w-full mr-10 text-lg font-semibold line-clamp-1 truncate" >{review.mealTitle}</h5>
                                            <h5 className="w-full mr-10">{review.liked_count}</h5>
                                            <h5 className="w-full mr-10">{review.review_count}</h5>
                                            <h5 className="w-full mr-10">{review.ratings}</h5>
                                            <h5 className="w-full mr-10 truncate">{review.reviewText}</h5>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </body>
                </div>
            )
            }
        </div >
    );
};

export default UserReviews;
