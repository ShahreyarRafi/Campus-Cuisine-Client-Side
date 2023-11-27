import { useContext } from "react";
import { AuthContext } from "../../../services/Firebase/AuthProvider";
import userPicPlaceholder from '../../../assets/images/userPicPlaceHolder.png';
import { NavLink, Outlet } from "react-router-dom";



const AdminDashboard = () => {

    const { user } = useContext(AuthContext);


    return (
        <div className='flex w-full font-primary text-center'>
            <div className="w-64 bg-[#B3845A] h-screen pt-7">
                <div className="w-full flex justify-center">
                    <div>
                        <div className="mb-4">
                            {user?.photoURL ? (
                                <img
                                    src={user?.photoURL}
                                    alt="Profile"
                                    className="h-40 rounded-full"
                                />
                            ) : (
                                <img
                                    src={userPicPlaceholder}
                                    alt="Placeholder"
                                    className="h-32 rounded-full bg-gray-300"
                                />
                            )}
                        </div>
                        <div>
                            <p className="text-[#FFFFF6] text-lg text-center">{user?.displayName}</p>
                        </div>
                        <div className="divider mb-7"></div>
                        <div className=" flex flex-col justify-between items-center gap-7">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                Back To Home
                            </NavLink>
                            <NavLink
                                to="/admin/dashboard/admin-profile"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                Admin Profile
                            </NavLink>
                            <NavLink
                                to="/admin/dashboard/manage-users"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                Manage Users
                            </NavLink>
                            <NavLink
                                to="/admin/dashboard/add-meal"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                Add Meal
                            </NavLink>
                            <NavLink
                                to="/admin/dashboard/all-meals"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                All Meals
                            </NavLink>
                            <NavLink
                                to="/admin/dashboard/all-reviews"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                All Reviews
                            </NavLink>
                            <NavLink
                                to="/admin/dashboard/serve-meals"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                Serve Meals
                            </NavLink>
                            <NavLink
                                to="/admin/dashboard/upcoming-meals"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                Upcoming Meals
                            </NavLink>
                        </div>

                    </div>
                </div>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AdminDashboard;