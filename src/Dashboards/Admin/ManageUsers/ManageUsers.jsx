import React, { useState } from 'react';
import useAxiosPublic from '../../../Hook/useAxiosPublic/useAxiosPublic';
import { useQuery } from 'react-query';

const ManageUsers = () => {
    const [usersData, setUsersData] = useState([]);

    const axiosPublic = useAxiosPublic();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/users/${user?.email}`);
            const res = await axiosPublic.get(`/users`);
            return setUsersData(res.data);
        }
    })

    const handleMakeAdmin = async (userId) => {
        console.log(userId);

        try {


                await axiosPublic.patch(`/users/${userId}`, {
                    role: 'Admin',
                });


                const updatedUsers = await axiosPublic.get(`/users`);
                setUsersData(updatedUsers.data);

        } catch (error) {
            console.error("Error publishing meal:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };


    console.log(usersData);

    return (
        <div>
            <div className='w-full min-h-screen flex justify-center items-center bg-[#1965a423]'>
                <div className="font-primary max-w-[1700px] w-full px-10 mx-auto duration-300">
                    <h1 className="text-xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-5 lg:mt-10 my-5 lg:my-10 px-10 duration-300">
                        <span className="">Your Requested </span>
                        <span className="text-[#B3845A]">Meals</span>
                    </h1>
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
                                                className='w-full mr-10 font-bold text-red-600 hover:text-red-400 duration-300'
                                                onClick={() => handleMakeAdmin(user._id)}
                                            >
                                                Make Admin
                                            </button>
                                            <h5 className="w-full mr-10">{user.badge}</h5>
                                            {/* <button onClick={(e) => handleCancel(e, users._id)} className="font-bold text-[#1965a4be] hover:text-red-400 duration-300">Cancel</button> */}
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

export default ManageUsers;