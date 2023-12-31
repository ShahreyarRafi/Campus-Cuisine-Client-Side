import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';
import { Link } from 'react-router-dom';

const itemsPerPage = 10;

const AllReviews = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState({
        field: 'liked_count', // Default sort by likes
        order: 'desc', // Default order is descending
    });
    const [currentPage, setCurrentPage] = useState(1);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async () => {
            try {

                const { data: meals = [] } = await axiosPublic.get(`/meals`);

                const mealLogs = meals.map((meal) => ({

                    reviews: meal.reviews.map((review) => ({
                        review_id: review.review_id,
                        meal_id: review.meal_id,
                        title: review.title,
                        reviewerName: review.name,
                        reviewerEmail: review.email,
                        liked_count: review.liked_count,
                        review_count: review.review_count,
                        ratings: review.ratings,
                        reviewText: review.review_text,
                    })),
                }));

                setLogs(mealLogs);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteReview = async (mealId, reviewId) => {
        try {
            const axiosPublic = useAxiosPublic();
            await axiosPublic.delete(`/meals/${mealId}/reviews/${reviewId}`);

            setLogs((prevLogs) =>
                prevLogs.map((log) => ({
                    ...log,
                    reviews: log.reviews.filter((review) => !(review?.meal_id === mealId && review.review_id === reviewId)),
                }))
            );
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleSort = (field) => {
        setSortBy((prevSort) => ({
            field,
            order: prevSort.field === field && prevSort.order === 'asc' ? 'desc' : 'asc',
        }));
    };
    const sortedLogs = [...logs].sort((a, b) => {
        const orderMultiplier = sortBy.order === 'asc' ? 1 : -1;

        const fieldA = sortBy.field === 'liked_count' ? a.liked_count : sortBy.field === 'review_count' ? a.review_count : a[sortBy.field];
        const fieldB = sortBy.field === 'liked_count' ? b.liked_count : sortBy.field === 'review_count' ? b.review_count : b[sortBy.field];

        if (fieldA < fieldB) return -1 * orderMultiplier;
        if (fieldA > fieldB) return 1 * orderMultiplier;
        return 0;
    });


    // Calculate the total number of reviews (including meals and individual reviews)
    const totalReviews = sortedLogs.reduce((acc, log) => acc + log.reviews.length, 0);

    // Calculate the total number of pages based on the number of reviews
    const totalPages = Math.ceil(totalReviews / itemsPerPage);

    // Calculate the starting index for the paginated logs
    const startIndex = (currentPage - 1) * itemsPerPage;

    // Calculate the ending index for the paginated logs
    const endIndex = Math.min(startIndex + itemsPerPage, totalReviews);

    // Extract the paginated logs based on the calculated indices
    const paginatedLogs = sortedLogs
        .flatMap((log) => log.reviews)
        .slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                                        <h5
                                            className={`w-[140%] mr-10 cursor-pointer ${sortBy.field === 'mealTitle' && 'active'}`}
                                            onClick={() => handleSort('mealTitle')}
                                        >
                                            Meal Title
                                        </h5>
                                        <button
                                            className={`sort-button max-w-[80px] w-full mr-10 ${sortBy.field === 'liked_count' && 'active'}`}
                                            onClick={() => handleSort('liked_count')}
                                        >
                                            Likes
                                            {sortBy.field === 'liked_count' && (
                                                <span className={`arrow ${sortBy.order === 'asc' ? 'up' : 'down'}`}>
                                                    {sortBy.order === 'asc' ? '▲' : '▼'}
                                                </span>
                                            )}
                                        </button>
                                        <button
                                            className={`sort-button max-w-[80px] w-full mr-10 ${sortBy.field === 'review_count' && 'active'}`}
                                            onClick={() => handleSort('review_count')}
                                        >
                                            Reviews
                                            {sortBy.field === 'review_count' && (
                                                <span className={`arrow ${sortBy.order === 'asc' ? 'up' : 'down'}`}>
                                                    {sortBy.order === 'asc' ? '▲' : '▼'}
                                                </span>
                                            )}
                                        </button>
                                        <h5 className="max-w-[80px] w-full mr-10">Ratings</h5>
                                        <h5 className="w-[140%] mr-10">Comment</h5>
                                        <h5 className="max-w-[80px] w-full mr-5">View Meal</h5>
                                        <h5 className="max-w-[80px] w-full ">Delete</h5>
                                    </div>
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    {paginatedLogs.map((review, index) => (
                                        <div key={index} className="flex items-center justify-between border-t border-gray-100 py-3">
                                            <h5 className="w-[140%] mr-10 text-black">{review.title}</h5>
                                            <h5 className="max-w-[80px] w-full mr-10">{review.liked_count}</h5>
                                            <h5 className="max-w-[80px] w-full mr-10">{review.review_count}</h5>
                                            <h5 className="max-w-[80px] w-full mr-10">{review.ratings}</h5>
                                            <h5 className="w-[140%] mr-10 truncate">{review.reviewText}</h5>
                                            <Link
                                                to={`/meals/${review.meal_id}`}
                                                className='max-w-[80px] w-full mr-5 font-bold text-[#1965a4be] hover:text-sky-400  duration-300'
                                            >
                                                View Meal
                                            </Link>
                                            <button
                                                className='max-w-[80px] w-full mr-10 font-bold text-red-600 hover:text-red-400 duration-300'
                                                onClick={() => handleDeleteReview(review.meal_id, review.review_id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                {/* Pagination buttons */}
                                {[...Array(totalPages).keys()].map((page) => (
                                    <button
                                        key={page + 1}
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
            )}
        </div>
    );
};

export default AllReviews;
