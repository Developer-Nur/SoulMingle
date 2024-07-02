import { Outlet } from "react-router-dom";
import NavMenu from "../../Shared/NavMenu/NavMenu";
import Footer from "../../Shared/Footer/Footer";


const Root = () => {
    return (
        <div>
            <NavMenu></NavMenu>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;