import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';



const Upcoming = () => {

    const { isPending, data: upcoming } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/Upcoming')
            return res.json();
        }
    })

    if (isPending) {
        return <div className='h-[69vh] flex justify-center items-center'><CircularProgress /></div>
    }

    return (
        <div className='min-h-[69vh] bg-[#1965a423] flex justify-center items-center font-primary w-full py-10 px-10 mx-auto duration-300'>
            <div className='max-w-[1500px]'>
                <h1 className="text-center text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                    <span className="text-[#B3845A]">Upcoming </span>
                    <span className="">Meals</span>
                </h1>
                <div className='w-full grid grid-cols-4 gap-7'>
                    {upcoming.map((meal) => (
                        <div key={meal._id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={meal.image}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <h5 className='text-2xl font-bold mb-3 text-slate-700 line-clamp-1'> {meal.title} </h5>
                                    <p className='text- mb-3 text-slate-700 line-clamp-2'> {meal.description} </p>
                                    <p className='font-bold mb-1 text-slate-700'> Category: {meal.category} </p>
                                    <p className='font-bold mb-1 text-slate-700'> Status: {meal.meal_status} </p>
                                    <div className='flex gap-1'>
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
                                    <p className='font-bold text-slate-700'> Price: ${meal.price} </p>
                                </CardContent>
                                <CardActions className='w-full text-center'>
                                    <Link className='w-full text-center' to={`/meals/${meal._id}`}>
                                        <button className='text-[#B3845A] font-bold mx-2 w-full text-center'>Show Details</button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Upcoming;