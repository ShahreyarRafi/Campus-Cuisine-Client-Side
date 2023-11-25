import { useContext } from "react";
import { AuthContext } from "../../../services/Firebase/AuthProvider";
import userPicPlaceholder from '../../../assets/images/userPicPlaceHolder.png';
import { NavLink } from "react-router-dom";



const UserDashboard = () => {

    const { user } = useContext(AuthContext);


    return (
        <div className='w-full mt-24 font-primary text-center'>
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
                                to="/user/profile"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                My Profile
                            </NavLink>
                            <NavLink
                                to="/user/requested-meals"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                Requested Meals
                            </NavLink>
                            <NavLink
                                to="/user/reviews"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#FFFFF6] bg-[#062230] px-5 py-2 rounded" : "text-[#FFFFF6] text-center"
                                }
                            >
                                My Reviews
                            </NavLink>
                        </div>

                    </div>
                </div>

            </div>
            <div>

            </div>

        </div>
    );
};

export default UserDashboard;