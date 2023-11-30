import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://campus-cuisine.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;


