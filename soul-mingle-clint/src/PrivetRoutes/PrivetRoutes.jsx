import { Navigate, useLocation } from "react-router-dom";
import useUserInfo from "../Hooks/useUserInfo";
import Spinner from "../Shared/Spinner/Spinner";

// eslint-disable-next-line react/prop-types
const PrivetRoutes = ({children}) => {

    const {user, loader} = useUserInfo();
    const location = useLocation();

    if (loader) {
        return <Spinner/>
    }
    if(user){
        return children;
    }


    return <Navigate to='/login'  state={{ from: location }} replace></Navigate>
};

export default PrivetRoutes;