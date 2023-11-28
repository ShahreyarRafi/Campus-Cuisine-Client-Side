import { useState, useEffect } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';
import { useQuery } from 'react-query';

let tabs = [
    { id: "All", label: "All Meals" },
    { id: "Breakfast", label: "Breakfast" },
    { id: "Lunch", label: "Lunch" },
    { id: "Dinner", label: "Dinner" },
];

const AllMeals = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [pageNumber, setPageNumber] = useState(1);

    const axiosPublic = useAxiosPublic();
    const { data: allMeals = [], isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/users/${user?.email}`);
            const res = await axiosPublic.get(`/meals`);
            return res.data;
        }
    })

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
                (activeTab === 'All' || meal.category === activeTab) &&
                meal.meal_status === 'Ready'
        );

        // Filter meals based on the search input
        const searchFiltered = filtered.filter((meal) =>
            meal.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        // Slice the array to get only the meals for the current page
        const slicedMeals = searchFiltered.slice(0, pageNumber * 10);

        setFilteredMeals(slicedMeals);
    }, [allMeals, activeTab, searchValue, pageNumber]);

    const handleDelete = async (mealId) => {
        try {
            // Send a request to delete the meal with the given ID
            await axiosPublic.delete(`/meals/${mealId}`);

            // Update the filtered meals by removing the deleted meal
            setFilteredMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== mealId));
        } catch (error) {
            console.error("Error deleting meal:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };


    return (
        <div>
            <div className="flex flex-col items-center justify-center py-10 bg-[#1965a423] w-full font-primary">
                {isLoading ? (
                    <div className='min-h-screen flex justify-center items-center'>
                        <span className="loading loading-spinner text-[#B3845A] loading-lg"></span>
                    </div>
                ) : (
                    <>
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
                        <div className='w-full min-h-screen flex justify-center items-center bg-[#1965a423]]'>
                            <div className="font-primary max-w-[1700px] w-full px-10 mx-auto duration-300">
                                <body className="flex items-center justify-center">
                                    <div className="container duration-300">
                                        <div className="w-full bg-white rounded-2xl overflow-hidden sm:shadow-lg my-5 duration-300">
                                            <div className="hidden xl:block bg-[#1965a44b] duration-300">
                                                <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                                    <h5 className="w-[160%] mr-10">Title</h5>
                                                    <h5 className="w-full mr-10">Likes</h5>
                                                    <h5 className="w-full mr-10">Reviews</h5>
                                                    <h5 className="w-full mr-10">Admin Name</h5>
                                                    <h5 className="w-full mr-10">Admin Email</h5>
                                                    <h5 className="w-full mr-10">Update</h5>
                                                    <h5 className="w-full mr-10">Delete</h5>
                                                    <h5 className="w-full mr-10">View Meal</h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 sm:flex-none">
                                                {filteredMeals?.map((meal) => (
                                                    <div key={meal._id} className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between border border-gray-100 hover:bg-[#193ea417] px-10 py-5 duration-300">
                                                        <h5 className="w-[160%] mr-10 text-lg font-semibold line-clamp-1" >{meal.title}</h5>
                                                        <h5 className="w-full mr-10">{meal.liked_count}</h5>
                                                        <h5 className="w-full mr-10">{meal.review_count}</h5>
                                                        <h5 className="w-full mr-10">{meal.admin_name}</h5>
                                                        <h5 className="w-full mr-10">{meal.admin_email}</h5>
                                                        <Link className='w-full mr-10 text-center' to={`/admin/dashboard/update-meal/${meal._id}`}>
                                                            <button className='text-[#B3845A] w-full font-bold mx-2text-center'>Update</button>
                                                        </Link>
                                                        <button
                                                            className="text-[#B3845A] w-full mr-10 font-bold mx-2 text-center"
                                                            onClick={() => handleDelete(meal._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <Link className='w-full mr-10 text-center' to={`/meals/${meal._id}`}>
                                                            <button className='text-[#B3845A] w-full font-bold mx-2text-center'>View Details</button>
                                                        </Link>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </body>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllMeals;