import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const itemsPerPage = 10;

const AllMeals = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [mealsCount, setMealsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const axiosPublic = useAxiosPublic();

    const { data: allMeals = [], isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals`);
            return res.data;
        },
    });

    const { data = [] } = useQuery({
        queryKey: ['mealsCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/mealsCount`);
            return res?.data;
        },
        onSuccess: (data) => {
            setMealsCount(data.count);
        },
    });

    useEffect(() => {
        // Filter meals based on the search input and category
        const searchFiltered = allMeals.filter((meal) =>
            meal.title.toLowerCase().includes(searchValue.toLowerCase()) &&
            (activeTab === 'All' || meal.category.toLowerCase() === activeTab.toLowerCase())
        );

        // Calculate pagination based on the filtered meals
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageFilteredMeals = searchFiltered.slice(startIndex, endIndex);
        setFilteredMeals(pageFilteredMeals);
    }, [allMeals, mealsCount, currentPage, searchValue, activeTab]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const pages = Array.from({ length: Math.ceil(mealsCount / itemsPerPage) }, (_, index) => index);


    const handleDelete = async (mealId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
    
            if (result.isConfirmed) {
                // Send a request to delete the meal with the given ID
                await axiosPublic.delete(`/meals/${mealId}`);
    
                // Update the filtered meals by removing the deleted meal
                setFilteredMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== mealId));
    
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Meal has been deleted.',
                    icon: 'success'
                });
            }
        } catch (error) {
            console.error('Error deleting meal:', error);
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
                                    <option value="All">All Meals</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
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
                                        <div>
                                            {/* Pagination buttons */}
                                            {pages.map((page) => (
                                                <button
                                                    key={page}
                                                    className={`pb-1 m-1 border-2 rounded-full w-10 h-10 text-[18px] ${page + 1 === currentPage ? 'bg-slate-400 text-white' : 'bg-white text-slate-400'
                                                        }`}
                                                    onClick={() => handlePageChange(page + 1)}
                                                >
                                                    {page + 1}
                                                </button>
                                            ))}
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
