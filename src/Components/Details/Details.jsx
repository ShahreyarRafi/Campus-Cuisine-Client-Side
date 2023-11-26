import { useContext } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { AuthContext } from '../../services/Firebase/AuthProvider';
import Swal from 'sweetalert2';


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
        liked_count,
        admin_name,
        admin_email
    } = meal || {};




    return (
        <div className='flex justify-center items-center py-10 font-primary h-[68vh]'>
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
    );
};

export default Details;