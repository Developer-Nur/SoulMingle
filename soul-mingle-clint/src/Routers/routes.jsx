import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import BiodatasPage from "../Pages/BiodatasPage/BiodatasPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivetRoutes from "../PrivetRoutes/PrivetRoutes";
import Dashboard from "../Layout/Root/Dashboard";
import EditBiodata from "../Pages/Dashboard/EditBiodata/EditBiodata";
import ViewBiodata from "../Pages/Dashboard/ViewBiodata/ViewBiodata";
import ContactRequest from "../Pages/Dashboard/ContactRequest/ContactRequest";
import FavouritesBiodata from "../Pages/Dashboard/FavouritesBiodata/FavouritesBiodata";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import AdminRouter from "../PrivetRoutes/AdminRouter";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequest from "../Pages/Dashboard/ApprovedContactRequest/ApprovedContactRequest";
import BiodataDetails from "../Component/BiodataDetails/BiodataDetails";
import CheckoutPage from "../Pages/Dashboard/CheckoutPage/CheckoutPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import GotMarried from "../Pages/Dashboard/GotMarried/GotMarried";



const router = createBrowserRouter([
    //Regular Routes for Nav Menu
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "biodata",
                element: <BiodatasPage></BiodatasPage>,
                loader: () => fetch("https://soul-mingle-server-sigma.vercel.app/biodatalength")
            },
            {
                path: "aboutus",
                element: <AboutUs></AboutUs>
            },
            {
                path: "contactus",
                element: <ContactUs></ContactUs>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "viewdetails/:id",
                element: <PrivetRoutes><BiodataDetails></BiodataDetails></PrivetRoutes>,
            },
        ],
    },

    // routes for regular users
    {
        path: "dashboard",
        element: <PrivetRoutes><Dashboard></Dashboard></PrivetRoutes>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "edit-bio",
                element: <EditBiodata></EditBiodata>
            },
            {
                path: "view-bio",
                element: <ViewBiodata></ViewBiodata>,
            },
            {
                path: "contact-request",
                element: <ContactRequest></ContactRequest>
            },
            {
                path: "fav-bio",
                element: <FavouritesBiodata></FavouritesBiodata>
            },
            {
                path: "payment",
                element: <PrivetRoutes><CheckoutPage></CheckoutPage></PrivetRoutes>
            },
            {
                path: "got-married",
                element: <PrivetRoutes><GotMarried></GotMarried></PrivetRoutes>
            },

            // routes for admin only
            {
                path: "admin-home",
                element: <AdminRouter><AdminDashboard></AdminDashboard></AdminRouter>,
            },
            {
                path: "manage-users",
                element: <AdminRouter><ManageUsers></ManageUsers></AdminRouter>,
            },
            {
                path: "approved-premium",
                element: <AdminRouter><ApprovedPremium></ApprovedPremium></AdminRouter>,
            },
            {
                path: "approved-contact-request",
                element: <AdminRouter><ApprovedContactRequest></ApprovedContactRequest></AdminRouter>,
            },
        ]

    }


]);

export default router;