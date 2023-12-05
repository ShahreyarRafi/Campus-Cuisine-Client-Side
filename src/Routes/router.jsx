import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Root from "../Layout/Root";
import Home from "../Pages/HomePage/Home";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ContactUsPage from "../Pages/ContactUsPage/ContactUsPage";
import CartPage from "../Pages/CartPage/CartPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AboutUsPage from "../Pages/AboutUsPage/AboutUsPage";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import MealsPage from "../Pages/MealsPage/MealsPage";
import UpcomingPage from "../Pages/UpcomingPage/UpcomingPage";
import UserDashboard from "../Dashboards/User/UserDashboard/UserDashboard";
import UserProfile from "../Dashboards/User/UserProfile/UserProfile";
import UserRequestedMeals from "../Dashboards/User/UserRequestedMeals/UserRequestedMeals";
import UserReviews from "../Dashboards/User/UserReviews/UserReviews";
import AdminDashboard from "../Dashboards/Admin/AdminDashboard/AdminDashboard";
import ManageUsers from "../Dashboards/Admin/ManageUsers/ManageUsers";
import AddMeal from "../Dashboards/Admin/AddMeal/AddMeal";
import AllReviews from "../Dashboards/Admin/AllReviews/AllReviews";
import ServeMeals from "../Dashboards/Admin/ServeMeals/ServeMeals";
import UpcomingMeals from "../Dashboards/Admin/UpcomingMeals/UpcomingMeals";
import AllMeals from "../Dashboards/Admin/AllMeals/AllMeals";
import AdminProfile from "../Dashboards/Admin/AdminProfile/AdminProfile";
import UpdateMeal from "../Dashboards/Admin/UpdateMeal/UpdateMeal";
import Payment from "../Dashboards/User/Payment/Payment";






const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('https://campus-cuisine.vercel.app/meals')
            },
            {
                path: 'register',
                element: <RegisterPage></RegisterPage>
            },
            {
                path: 'login',
                element: <LoginPage></LoginPage>
            },
            {
                path: 'contact-us',
                element: <ContactUsPage></ContactUsPage>
            },
            {
                path: 'about-us',
                element: <AboutUsPage></AboutUsPage>
            },
            {
                path: 'meals',
                element: <MealsPage></MealsPage>,
                loader: () => fetch('https://campus-cuisine.vercel.app/meals')
            },
            {
                path: 'upcoming',
                element: <UpcomingPage></UpcomingPage>,
            },
            {
                path: 'meals/:id',
                element: <DetailsPage></DetailsPage>,
            },
            {
                path: 'payment',
                element: (<PrivateRoute><Payment></Payment></PrivateRoute>)
            },


        ]
    },
    {
        path: 'dashboard',
        element: (
            <PrivateRoute>
                <UserDashboard></UserDashboard>
            </PrivateRoute>
        ),
        children: [
            {
                path: 'user/profile',
                element: (<PrivateRoute><UserProfile></UserProfile></PrivateRoute>)
            },
            {
                path: 'user/requested-meals',
                element: (<PrivateRoute><UserRequestedMeals></UserRequestedMeals></PrivateRoute>)
            },
            {
                path: 'user/reviews',
                element: (<PrivateRoute><UserReviews></UserReviews></PrivateRoute>)
            },
        ]
    },
    {
        path: 'admin/dashboard',
        element: (
            <PrivateRoute>
                <AdminDashboard></AdminDashboard>
            </PrivateRoute>
        ),
        children: [
            {
                path: 'admin-profile',
                element: (<PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>),
            },
            {
                path: 'manage-users',
                element: (<PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>),
            },
            {
                path: 'add-meal',
                element: (<PrivateRoute><AddMeal></AddMeal></PrivateRoute>),
            },
            {
                path: 'all-meals',
                element: (<PrivateRoute><AllMeals></AllMeals></PrivateRoute>),
            },
            {
                path: 'all-reviews',
                element: (<PrivateRoute><AllReviews></AllReviews></PrivateRoute>),
            },
            {
                path: 'serve-meals',
                element: (<PrivateRoute><ServeMeals></ServeMeals></PrivateRoute>),
            },
            {
                path: 'upcoming-meals',
                element: (<PrivateRoute><UpcomingMeals></UpcomingMeals></PrivateRoute>),
            },
            {
                path: 'update-meal/:id',
                element: (<PrivateRoute><UpdateMeal></UpdateMeal></PrivateRoute>),
            },

        ]
    },
])

export default router