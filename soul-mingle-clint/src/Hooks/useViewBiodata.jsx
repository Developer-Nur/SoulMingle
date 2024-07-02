import { useQuery } from "@tanstack/react-query";
import useAxiosSecureUlr from "./useAxiosSecureUlr";
import useUserInfo from "./useUserInfo";

const useViewBiodata = () => {

    const { user } = useUserInfo ();
    const axiosSecure = useAxiosSecureUlr ();

    const { data: biodata = {}, isLoading  } = useQuery({
        queryKey: ["biodata", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-biodata?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });



    return {biodata, isLoading}
};

export default useViewBiodata;