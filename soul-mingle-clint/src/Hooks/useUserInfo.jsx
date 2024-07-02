import { useContext } from "react";
import { AuthInfo } from "../Provider/Provider";


const useUserInfo = () => {

    const {
        requestInfo,
        setRequestInfo,
        googleSingin,
        loader,
        user,
        singinUser,
        createUser,
        logOut,
        updaleProfileOfUser,
        setLoader
    } = useContext(AuthInfo)

    const userInfo = {
        requestInfo,
        setRequestInfo,
        googleSingin,
        loader,
        user,
        singinUser,
        createUser,
        logOut,
        updaleProfileOfUser,
        setLoader
    }

    return userInfo;
};

export default useUserInfo;