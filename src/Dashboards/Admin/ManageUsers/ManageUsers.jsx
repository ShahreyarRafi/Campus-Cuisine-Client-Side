import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from 'react-query';

const itemsPerPage = 10;

const ManageUsers = () => {
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    useEffect(() => {
        // Update usersData based on the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setUsersData(users.slice(startIndex, endIndex));
    }, [users, currentPage]);

    const handleMakeAdmin = async (userId) => {
        console.log(userId);

        try {
            await axiosSecure.patch(`/users/${userId}`, {
                role: 'Admin',
            });

            const updatedUsers = await axiosSecure.get(`/users`);
            setUsersData(updatedUsers.data);
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            console.log('Search query:', searchQuery);
            const response = await axiosSecure.get(`/find-user?searchQuery=${searchQuery}`);
            const searchedUsers = response.data;
            setUsersData(searchedUsers);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const pages = Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => index + 1);

    return (
        <div>
            <div className='w-full min-h-screen flex justify-center items-center bg-[#1965a423]'>
                {isLoading ? (
                    <div className='min-h-screen flex justify-center items-center'>
                        <span className="loading loading-spinner text-[#B3845A] loading-lg"></span>
                    </div>
                ) : (
                    <div className="font-primary max-w-[1700px] w-full px-10 mx-auto duration-300">
                        <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                            <span className="">Manage </span>
                            <span className="text-[#B3845A]">Users</span>
                        </h1>

                        <form onSubmit={handleSearch} className='w-full flex justify-center mb-7'>
                            <input
                                type="text"
                                className="bg-white dark:bg-zinc-800 text-black dark:text-white peer block min-h-[auto] w-[80vw] lg:w-[50vw] md:px-12 px-7 md:py-4 py-2 rounded-l border dark:border-zinc-700 border-stone-200 leading-[1.6] lg:drop-shadow-2xl outline-none transition-all duration-300 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput1"
                                placeholder="Search User Here..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="text-lg px-3 md:text-xl pointer-events-none absolute left-3 bottom-[6px] md:bottom-4 mb-[2px] max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Type Here...
                            </label>
                            <button type="submit" className="relative rounded-r bg-[#B3845A] hover:bg-[#ebb587] font-primary font-semibold text-[19px] text-white md:px-12 px-7 md:py-4 py-2">Search</button>
                        </form>
                        <body className="flex items-center justify-center">
                            <div className="container duration-300">
                                <div className="w-full bg-white rounded-2xl overflow-hidden sm:shadow-lg my-5 duration-300">
                                    <div className="hidden xl:block bg-[#1965a44b] duration-300">
                                        <div className="flex items-center justify-between font-semibold border border-gray-100 px-10 py-5">
                                            <h5 className="w-[160%] mr-10">User name</h5>
                                            <h5 className="w-full mr-10">User email</h5>
                                            <h5 className="w-full mr-10">Role</h5>
                                            <h5 className="w-full mr-10">Make admin</h5>
                                            <h5 className="w-full mr-10">Subscription Status(Membership)</h5>
                                        </div>
                                    </div>
                                    <div className="flex-1 sm:flex-none">
                                        {usersData?.map((user) => (
                                            <div key={user._id} className="flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-between border border-gray-100 hover:bg-[#193ea417] px-10 py-5 duration-300">
                                                <h5 className="w-[160%] mr-10 text-lg font-semibold line-clamp-1" >{user.name}</h5>
                                                <h5 className="w-full mr-10">{user.email}</h5>
                                                <h5 className="w-full mr-10">{user.role}</h5>
                                                <button
                                                    className={`w-full mr-10 font-bold text-red-600 hover:text-red-400 duration-300 ${user.role === 'Admin' ? 'cursor-not-allowed opacity-50' : ''}`}
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    disabled={user.role === 'Admin'}
                                                >
                                                    Make Admin
                                                </button>
                                                <h5 className="w-full mr-10">{user.badge}</h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Pagination buttons */}
                                <div className="flex justify-center mt-4">
                                    {pages.map((page) => (
                                        <button
                                            key={page}
                                            className={`pb-1 m-1 border-2 rounded-full w-10 h-10 text-[18px] ${
                                                page === currentPage ? 'bg-slate-400 text-white' : 'bg-white text-slate-400'
                                            }`}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </body>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
