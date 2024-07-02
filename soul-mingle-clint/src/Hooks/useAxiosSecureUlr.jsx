import axios from "axios";

const axiosSecure = axios.create({
    // baseURL: 'https://soul-mingle-server-sigma.vercel.app'
    baseURL: 'https://soul-mingle-server-sigma.vercel.app'
})




const useAxiosSecureUlr = () => {
    return axiosSecure;
};

export default useAxiosSecureUlr;