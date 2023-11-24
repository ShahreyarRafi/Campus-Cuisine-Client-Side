import { BsStar, BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';

const Details = ({ meal }) => {

    console.log(meal);

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
                    <div className='flex gap-1  mb-1'>
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
                    <p className='text-lg'><span className='font-bold mb-1 text-slate-700'>Reviews: </span> {meal.review_count}</p></div>
            </div>
        </div>
    );
};

export default Details;