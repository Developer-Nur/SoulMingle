import axios from "axios";


const axiosPublicUrl = axios.create({
    // baseURL: 'https://soul-mingle-server-sigma.vercel.app',
    baseURL: 'https://soul-mingle-server-sigma.vercel.app'
})

const usePublicUrl = () => {
    return axiosPublicUrl;
};

export default usePublicUrl;