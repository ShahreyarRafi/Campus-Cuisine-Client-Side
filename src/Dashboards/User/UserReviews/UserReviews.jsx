import React, { useState, useEffect, useContext } from 'react';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../../services/Firebase/AuthProvider';

const UserReviews = () => {
    const { user } = useContext(AuthContext);

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentReview, setCurrentReview] = useState(null);

    console.log(currentReview);


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


    // Delete a review
    const handleDeleteReview = async (mealId, reviewId) => {
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

    const handleEditReview = (review) => {
        setCurrentReview(review); // Set the current review when editing
        const modal = document.getElementById('editReviewModal');
        if (modal) {
            modal.showModal();
        }
    };

    // Function to handle updating the review
    const handleUpdateReview = async (ratings, reviewText) => {
        try {
            const axiosPublic = useAxiosPublic();

            // Adjust the API endpoint based on your server implementation
            await axiosPublic.put(`/meals/${currentReview?.meal_id}/reviews/${currentReview.review_id}`, {
                ratings,
                review_text: reviewText,
            });

            // Update the local state to reflect the updated review
            setLogs((prevLogs) =>
                prevLogs.map((log) => ({
                    reviews: log.reviews.map((review) =>
                        review?.meal_id === currentReview?.meal_id && review?.review_id === currentReview.review_id
                            ? { ...review, ratings, review_text: reviewText }
                            : review
                    ),
                }))
            );

            // Close the modal after updating
            const modal = document.getElementById('editReviewModal');
            if (modal) {
                modal.close();
            }
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };



    return (
        <div className='font-primary bg-[#1965a423]'>
            {loading ? (
                <div className='min-h-[69vh] flex justify-center items-center'>
                    <span className="loading loading-spinner text-[#B3845A] loading-lg"></span>
                </div>
            ) : (
                <div className='min-h-[69vh] pt-10'>
                    <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                        <span className="">Your </span>
                        <span className="text-[#B3845A]">Reviews</span>
                    </h1>
                    < body className="flex items-center justify-center">
                        <div className="container duration-300">
                            <div className="w-full bg-white rounded-2xl overflow-hidden sm:shadow-lg my-5 duration-300">
                                <div className="hidden xl:block bg-[#1965a44b] duration-300">
                                    <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                        <h5 className="w-[150%] mr-10">Meal Title</h5>
                                        <h5 className="w-full mr-10">Likes</h5>
                                        <h5 className="w-full mr-10">Reviews</h5>
                                        <h5 className="w-full mr-10">Ratings</h5>
                                        <h5 className="w-[120%] mr-10">Comment</h5>
                                        <h5 className="max-w-[80px] w-full mr-10">Edit</h5>
                                        <h5 className="max-w-[80px] w-full ">Delete</h5>
                                    </div>
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    {userReviews.map((review, index) => (
                                        <div key={index}>
                                            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between border border-gray-100 hover:bg-[#193ea417] px-10 py-5 duration-300">
                                                <h5 className="w-[150%] mr-10 text-lg font-semibold line-clamp-1 truncate" >{review.mealTitle}</h5>
                                                <h5 className="w-full mr-10">{review.liked_count}</h5>
                                                <h5 className="w-full mr-10">{review.review_count}</h5>
                                                <h5 className="w-full mr-10">{review.ratings}</h5>
                                                <h5 className="w-[120%] mr-10 truncate">{review.reviewText}</h5>
                                                <button
                                                    className='max-w-[80px] w-full mr-10 text-start font-bold text-[#1965a4be] hover:text-red-400 duration-300'
                                                    onClick={() => handleEditReview(review)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='max-w-[80px] w-full  text-start font-bold text-red-600 hover:text-red-400 duration-300'
                                                    onClick={() => handleDeleteReview(review.meal_id, review.review_id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
                                            <dialog id="editReviewModal" className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg">Hello!</h3>
                                                    <p className="py-4">Press ESC key or click the button below to close</p>
                                                    <div className="modal-action">
                                                        <form
                                                            method="dialog"
                                                            className='w-full '
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                handleUpdateReview(e.target.ratings.value, e.target.reviewText.value);
                                                            }}
                                                        >
                                                            <div className="w-full form-control mb-5">
                                                                <label className="label">
                                                                    <span className="text-black dark:text-slate-300 duration-300">Ratings</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="ratings"
                                                                    defaultValue={currentReview?.ratings}
                                                                    className="input input-bordered w-full bg-white duration-300"
                                                                    step="any"  // Allow any decimal value
                                                                    required
                                                                />

                                                                <div className="form-control mb-5">
                                                                    <label className="label">
                                                                        <span className="text-black dark:text-slate-300 duration-300">Comment</span>
                                                                    </label>
                                                                    <label className="rounded-lg">
                                                                        <textarea
                                                                            name="reviewText"
                                                                            defaultValue={currentReview?.reviewText}
                                                                            className="input input-bordered w-full h-40 bg-white duration-300"
                                                                            required
                                                                        />
                                                                    </label>
                                                                </div>
                                                                <button type="submit" className="btn">
                                                                    Update
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-error ml-2"
                                                                    onClick={() => {
                                                                        const modal = document.getElementById('editReviewModal');
                                                                        if (modal) {
                                                                            modal.close();
                                                                        }
                                                                    }}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
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
