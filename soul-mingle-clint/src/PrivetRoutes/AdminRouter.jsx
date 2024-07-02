import { Navigate, useLocation } from "react-router-dom";
import useUserInfo from "../Hooks/useUserInfo";
import useAdmin from "../Hooks/useAdmin";
import Spinner from "../Shared/Spinner/Spinner";


// eslint-disable-next-line react/prop-types
const AdminRouter = ({ children }) => {

    const { user, loader, logOut } = useUserInfo();

    const { admin, AdminLoading } = useAdmin();

    const isAdmin = admin?.role === "admin" && true

    // console.log("is admin or nit", isAdmin);


    const location = useLocation();

    if (loader || AdminLoading) {
        return <Spinner/>
    }
    if (user && isAdmin) {
        return children;
    }
    else {
        logOut()
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default AdminRouter;