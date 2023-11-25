import { useContext } from "react";
import { AuthContext } from "../../../services/Firebase/AuthProvider";
import userPicPlaceholder from '../../../assets/images/userPicPlaceHolder.png';
import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic/useAxiosPublic"

const UserProfile = () => {

    const { user } = useContext(AuthContext);

    // const {data} = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:5000/users/${user?.email}`)
    //         return res.json();
    //     }
    // })
    // console.log(data);

    const axiosSecure = useAxiosPublic();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })

    // const { badge } = users[0];

    return (
        <div className='w-full h-[69vh] flex justify-center items-center font-primary'>
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
                    <div>
                        <p className="text-black text-lg text-center"><span className="font-bold">Name:</span> {user?.displayName}</p>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <p className="text-black text-lg text-center"><span className="font-bold">Email: </span> {user?.email}</p>
                    </div>
                    <div className="divider"></div>
                    {/* <div>
                    <p className="text-black text-lg text-center">Badge: {badge}</p>
                </div> */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;