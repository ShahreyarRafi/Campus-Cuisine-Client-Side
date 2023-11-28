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
                loader: () => fetch('http://localhost:5000/meals')
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
                loader: () => fetch('http://localhost:5000/meals')
            },
            {
                path: 'upcoming',
                element: <UpcomingPage></UpcomingPage>,
            },
            {
                path: 'meals/:id',
                element: <DetailsPage></DetailsPage>,
                loader: ({ params }) => fetch(`http://localhost:5000/meals/${params.id}`)
            },


            {
                path: 'cart',
                element: (
                    <PrivateRoute>
                        <CartPage></CartPage>
                    </PrivateRoute>
                ),
                // loader: () => fetch('http://localhost:5000/cartItems'),
            },

        ]
    },
    {
        path: 'dashboard',
        element: <UserDashboard></UserDashboard>,
        children: [
            {
                path: 'user/profile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'user/requested-meals',
                element: <UserRequestedMeals></UserRequestedMeals>
            },
            {
                path: 'user/reviews',
                element: <UserReviews></UserReviews>
            },
            {
                path: 'user/payment',
                element: <Payment></Payment>
            },
        ]
    },
    {
        path: 'admin/dashboard',
        element: <AdminDashboard></AdminDashboard>,
        children: [
            {
                path: 'admin-profile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'add-meal',
                element: <AddMeal></AddMeal>
            },
            {
                path: 'all-meals',
                element: <AllMeals></AllMeals>
            },
            {
                path: 'all-reviews',
                element: <AllReviews></AllReviews>
            },
            {
                path: 'serve-meals',
                element: <ServeMeals></ServeMeals>
            },
            {
                path: 'upcoming-meals',
                element: <UpcomingMeals></UpcomingMeals>
            },
            {
                path: 'update-meal/:id',
                element: <UpdateMeal></UpdateMeal>
            },

        ]
    },
])

export default router