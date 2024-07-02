import { useQuery } from '@tanstack/react-query';
import useUserInfo from './useUserInfo';
import useAxiosSecureUlr from './useAxiosSecureUlr';

const useAdmin = () => {

    const { user } = useUserInfo();
    const axiosSecure = useAxiosSecureUlr();

    // calling the user admin api
    const { data: admin = {}, isLoading: AdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/${user.email}`)
            return res.data
        }
    });

    return { admin, AdminLoading}

    
};

export default useAdmin;








   

