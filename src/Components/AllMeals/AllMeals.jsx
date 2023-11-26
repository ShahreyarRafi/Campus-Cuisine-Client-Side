import { useState, useEffect } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

let tabs = [
    { id: "All", label: "All Meals" },
    { id: "Breakfast", label: "Breakfast" },
    { id: "Lunch", label: "Lunch" },
    { id: "Dinner", label: "Dinner" },
];

const AllMeals = ({ allMeals }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        // Function to load more meals when scrolling down
        const loadMoreMeals = () => {
            // Check if the user has scrolled to the bottom
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                // Increment the page number and fetch more meals
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        };

        // Add the event listener for scrolling
        window.addEventListener('scroll', loadMoreMeals);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', loadMoreMeals);
        };
    }, []);

    useEffect(() => {
        // Filter meals based on the selected category and exclude "Upcoming" meals
        const filtered = allMeals.filter(
            (meal) =>
                (activeTab === 'All' || meal.category.toLowerCase() === activeTab.toLowerCase()) &&
                meal.meal_status.toLowerCase() === 'ready'
        );

        // Filter meals based on the search input
        const searchFiltered = filtered.filter((meal) =>
            meal.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        // Slice the array to get only the meals for the current page
        const slicedMeals = searchFiltered.slice(0, pageNumber * 10);

        setFilteredMeals(slicedMeals);
    }, [allMeals, activeTab, searchValue, pageNumber]);



    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10 bg-[#1965a423] w-full font-primary">
                <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                    <span className="">Find Your </span>
                    <span className="text-[#B3845A]">Meal</span>
                </h1>
                <div className='w-full items-center flex justify-center lg:my-5'>
                    <div className="relative" data-te-input-wrapper-init>
                        <input
                            type="text"
                            className="bg-white dark:bg-zinc-800 text-black dark:text-white peer block min-h-[auto] w-[80vw] lg:w-[50vw] md:px-12 px-7 md:py-4 py-2 rounded-l border dark:border-zinc-700 border-stone-200 leading-[1.6] lg:drop-shadow-2xl outline-none transition-all duration-300 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput1"
                            placeholder="Search Here..."
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                        <label
                            htmlFor="exampleFormControlInput1"
                            className="text-lg px-3 md:text-xl pointer-events-none absolute left-3 bottom-[6px] md:bottom-4 mb-[2px] max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Type Here...
                        </label>
                    </div>
                    <div className="">
                        <select
                            className="relative rounded-r bg-[#B3845A] hover:bg-[#ebb587] font-primary font-semibold text-[19px] text-white md:px-12 px-7 md:py-4 py-2"
                            value={activeTab}
                            onChange={(e) => {
                                setActiveTab(e.target.value);
                            }}
                        >
                            {tabs.map((tab) => (
                                <option key={tab.id} value={tab.id}>
                                    {tab.label}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="font-primary max-w-[1500px] w-full py-10 px-10 mx-auto duration-300">
                    <body className="flex items-center justify-center">
                        <div className="container duration-300">
                            <div>
                                <div className="w-full grid grid-cols-4 gap-7">
                                    {filteredMeals.map((meal) => (
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
                    </body>
                </div>
            </div>
        </div>
    );
};

export default AllMeals;