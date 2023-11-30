import { useContext } from "react";
import { AuthContext } from "../../../services/Firebase/AuthProvider";
import userPicPlaceholder from '../../../assets/images/userPicPlaceHolder.png';
import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic/useAxiosPublic"
import bronze from "../../../assets/images/Bronze.png"
import silver from "../../../assets/images/Silver.png"
import gold from "../../../assets/images/gold.png"
import platinum from "../../../assets/images/Platinum.png"

const AdminProfile = () => {



    const { user } = useContext(AuthContext);

    console.log(user);

    const axiosPublic = useAxiosPublic();

    const { data: allMeals = [], isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals`);
            return res.data;
        },
    });


    // const {data} = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:5000/users/${user?.email}`)
    //         return res.json();
    //     }
    // })
    // console.log(data);


    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            // const res = await axiosSecure.get(`/users/${user?.email}`);
            const res = await axiosPublic.get(`/users`);
            return res.data;
        }
    })


    const currentUser = users.find(userData => userData.email === user?.email);


    const addedByAdmin = allMeals.map(meal => meal?.admin_email === currentUser?.email);


    let badgeImage;
    switch (currentUser?.badge) {
        case 'Bronze':
            badgeImage = bronze;
            break;
        case 'Silver':
            badgeImage = silver;
            break;
        case 'Gold':
            badgeImage = gold;
            break;
        case 'Platinum':
            badgeImage = platinum;
            break;
        default:
            badgeImage = null; 
    }


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
                        <p className="text-black text-lg text-center"><span className="font-bold">Admin Name: </span> {user?.displayName}</p>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <p className="text-black text-lg text-center"><span className="font-bold">Admin Email: </span> {user?.email}</p>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <p className="text-black text-lg text-center"><span className="font-bold">Total Meals Added: </span> {addedByAdmin?.length}</p>
                    </div>
                    <div className="divider"></div>
                    <div className=" flex justify-center items-center gap-1">
                        <div>
                            <p className="text-black text-lg text-center"><span className="font-bold">Badge: </span> {currentUser?.badge}</p>
                        </div>
                        <img className="w-5" src={badgeImage} alt="Badge" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;