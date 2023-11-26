import { useContext, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { AuthContext } from '../../services/Firebase/AuthProvider';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';


const handleMealReq = (
    event,
    user_id,
    user_email,
    meal_id,
    image,
    title,
    description,
    ingredients,
    category,
    price,
    post_time,
    meal_status,
    ratings,
    review_count,
    liked_count,
    admin_name,
    admin_email
) => {

    event.preventDefault();

    const reqMealData = {
        user_id,
        user_email,
        meal_id,
        image,
        title,
        description,
        ingredients,
        category,
        price,
        post_time,
        meal_status,
        ratings,
        review_count,
        liked_count,
        admin_name,
        admin_email
    };

    console.log(reqMealData);

    // Send data to the server
    fetch('http://localhost:5000/api/request-meal', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(reqMealData)
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    title: 'Meal Requested!',
                    text: `You Requested for ${title}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        })
        .catch(error => {
            console.error("Error submitting application:", error);
            Swal.fire({
                title: 'Application Error',
                text: 'Failed to submit your application',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });

};



const Details = ({ meal }) => {
    const { user } = useContext(AuthContext);

    const {
        _id,
        image,
        title,
        description,
        ingredients,
        category,
        price,
        post_time,
        meal_status,
        ratings,
        review_count,
        reviews,
        liked_count,
        admin_name,
        admin_email
    } = meal || {};

    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const handleReviewSubmit = (event) => {
        event.preventDefault();

        // You may want to add validation for the form fields here
        const newReview = {
            review_id: uuidv4(),
            meal_id: _id,
            name: user?.displayName,
            email: user?.email,
            title: title,
            liked_count: liked_count,
            review_count: review_count,
            ratings: parseFloat(rating),
            review_text: comment,
        };

        const updatedReviews = [...reviews, newReview];

        // Send data to the server
        fetch('http://localhost:5000/api/add-review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                meal_id: _id,
                reviews: updatedReviews
            })
        })
            .then(res => res.json())
            .then(data => {
                // Assuming the server responds with the updated meal data
                // You may want to handle the response accordingly
                console.log(data);
            })
            .catch(error => {
                console.error("Error submitting review:", error);
                // Handle error
            });
    };




    return (
        <div>
            <div className='flex justify-center items-center py-10 font-primary'>
                <div className='flex'>
                    <img className='h-80 object-cover mb-5 w-1/2' src={meal.image} alt="" />
                    <div className="divider divider-horizontal"></div>
                    <div className='w-1/2'>
                        <h2 className='text-3xl font-bold mb-3'>{meal.title}</h2>
                        <p className='text-lg mb-2'>{meal.description}</p>
                        <p className='text-lg mb-1'><span className='font-bold mb-1 text-slate-700'>Ingredients: </span>  {meal.ingredients}</p>
                        <p className='text-lg mb-1'><span className='font-bold mb-1 text-slate-700'>Distributor: </span> {meal.admin_name}</p>
                        <p className='text-lg mb-1'><span className='font-bold mb-1 text-slate-700'>Post Time: </span> {meal.post_time}</p>
                        <p className='text-lg mb-1'><span className='font-bold mb-1 text-slate-700'>Meal Status: </span> {meal.meal_status}</p>
                        <div className='flex gap-1 text-lg mb-1'>
                            <p className='font-bold mb-1 text-slate-700'> Ratings: </p>
                            <div className='flex items-center truncate'>
                                <div className='flex gap-[1px] -mt-[2px] mr-1'>
                                    {Array.from({ length: Math.min(Math.floor(meal.ratings), 5) }, (_, index) => (
                                        <span key={index} className="text-yellow-400"><BsStarFill /></span>
                                    ))}
                                    {meal.ratings % 1 !== 0 && (
                                        <span className="text-yellow-400"><BsStarHalf /> </span>
                                    )}
                                    {Array.from({ length: Math.max(5 - Math.ceil(meal.ratings), 0) }, (_, index) => (
                                        <span key={index} className="text-gray-400"><BsStar /></span>
                                    ))}
                                </div>
                                <p> {Math.min(meal.ratings, 5)} {Math.min(meal.ratings, 5) > 1 ? ("Stars") : ("star")}</p>
                            </div>
                        </div>
                        <p className='text-lg mb-4'><span className='font-bold mb-1 text-slate-700'>Reviews: </span> {meal.review_count}</p>
                        <button
                            onClick={(event) => handleMealReq(event, user.uid, user.email, _id, image, title, description, ingredients, category, price, post_time, meal_status, ratings, review_count, liked_count, admin_name, admin_email)}
                            className=" bg-[#B3845A] hover:bg-[#ebb587] font-primary font-semibold text-xl text-white md:px-12 px-7 md:py-4 py-2 rounded"
                        >
                            Request This Meal
                        </button>
                    </div>
                </div>
            </div>

            {/* reviews section */}

            <div className='w-full'>
                <div className='max-w-[1300px] mx-auto'>
                    <h3 className="text-2xl font-bold mb-2">Reviews</h3>
                    {reviews && reviews.length > 0 ? (
                        <div>
                            {reviews.map((review) => (
                                <div key={review._id} className="mb-4">
                                    <p className="text-lg mb-1">
                                        <span className="font-bold mb-1 text-slate-700">User:</span> {review.name}
                                    </p>
                                    <div className='flex gap-1 text-lg mb-1'>
                                        <p className='font-bold mb-1 text-slate-700'> Ratings: </p>
                                        <div className='flex items-center truncate'>
                                            <div className='flex gap-[1px] -mt-[2px] mr-1'>
                                                {Array.from({ length: Math.min(Math.floor(review.ratings), 5) }, (_, index) => (
                                                    <span key={index} className="text-yellow-400"><BsStarFill /></span>
                                                ))}
                                                {review.ratings % 1 !== 0 && (
                                                    <span className="text-yellow-400"><BsStarHalf /> </span>
                                                )}
                                                {Array.from({ length: Math.max(5 - Math.ceil(review.ratings), 0) }, (_, index) => (
                                                    <span key={index} className="text-gray-400"><BsStar /></span>
                                                ))}
                                            </div>
                                            <p> {Math.min(review.ratings, 5)} {Math.min(review.ratings, 5) > 1 ? ("Stars") : ("star")}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg mb-1">
                                        <span className="font-bold mb-1 text-slate-700">Comment:</span> {review.review_text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews available.</p>
                    )}

                    {/* Review Form */}
                    <form onSubmit={handleReviewSubmit} className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Add Your Review</h3>
                        <div className="mb-2">
                            <label htmlFor="ratings" className="block text-gray-700 font-bold mb-1">Ratings:</label>
                            <input
                                type="number"
                                id="ratings"
                                name="ratings"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="border rounded-md py-2 px-3 w-full"
                                min="0"
                                max="5"
                                step="0.1"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="review_text" className="block text-gray-700 font-bold mb-1">Review:</label>
                            <textarea
                                id="review_text"
                                name="review_text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="border rounded-md py-2 px-3 w-full"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#B3845A] hover:bg-[#ebb587] font-primary font-semibold text-xl text-white md:px-12 px-7 md:py-4 py-2 rounded"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Details;