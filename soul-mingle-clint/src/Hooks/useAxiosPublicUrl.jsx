import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'https://soul-mingle-server-sigma.vercel.app'
    baseURL: 'https://soul-mingle-server-sigma.vercel.app'
})

const useAxiosPublicUrl = () => {
    return axiosPublic;
};

export default useAxiosPublicUrl;