import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';

const AllReviews = () => {
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
                            review_id: review.review_id,
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
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Delete a review
    const handleDeleteReview = async (mealId, reviewId) => {
        console.log(mealId, reviewId);
        try {
            const axiosPublic = useAxiosPublic();
            // Adjust the API endpoint based on your server implementation
            await axiosPublic.delete(`/meals/${mealId}/reviews/${reviewId}`);

            // Update the local state to reflect the deleted review
            setLogs((prevLogs) =>
                prevLogs.map((log) => ({
                    reviews: log.reviews.filter((review) => !(review?.meal_id === mealId && review.review_id === reviewId)),
                }))
            );
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };


    return (
        <div className='font-primary bg-[#1965a423] px-5'>
            {loading ? (
                <div className='min-h-screen flex justify-center items-center'>
                    <span className="loading loading-spinner text-[#B3845A] loading-lg"></span>
                </div>
            ) : (
                <div className='min-h-screen pt-10'>
                    <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                        <span className="">All </span>
                        <span className="text-[#B3845A]">Reviews</span>
                    </h1>
                    <body className="flex items-center justify-center">
                        <div className="container duration-300">
                            <div className="w-full bg-white rounded-2xl overflow-hidden sm:shadow-lg my-5 duration-300">
                                <div className="hidden xl:block bg-[#1965a44b] duration-300">
                                    <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                        <h5 className="w-[160%] mr-10">Meal Title</h5>
                                        <h5 className="w-full mr-10">Likes</h5>
                                        <h5 className="w-full mr-10">Reviews</h5>
                                        <h5 className="w-full mr-10">Ratings</h5>
                                        <h5 className="w-[120%] mr-10">Comment</h5>
                                        <h5 className="max-w-[80px] w-full ">Delete</h5>
                                    </div>
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    {logs.flatMap((log, mealIndex) =>
                                        log.reviews.map((review, reviewIndex) => (
                                            <div key={`meal-${mealIndex}-review-${reviewIndex}`}>
                                                <div className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between border border-gray-100 hover:bg-[#193ea417] px-10 py-5 duration-300">
                                                    <h5 className="w-[160%] mr-10 text-lg font-semibold line-clamp-1 truncate" >{review.title}</h5>
                                                    <h5 className="w-full mr-10">{review.liked_count}</h5>
                                                    <h5 className="w-full mr-10">{review.review_count}</h5>
                                                    <h5 className="w-full mr-10">{review.ratings}</h5>
                                                    <h5 className="w-[120%] mr-10 truncate">{review.reviewText}</h5>
                                                    <button
                                                        className='max-w-[80px] w-full  text-start font-bold text-red-600 hover:text-red-400 duration-300'
                                                        onClick={() => handleDeleteReview(review.meal_id, review.review_id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </body>
                </div>
            )}
        </div>
    );
};

export default AllReviews;
