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
import Details from "../Components/Details/Details";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import AllMealsPage from "../Pages/AllMealsPage/AllMealsPage";
import UpcomingPage from "../Pages/UpcomingPage/UpcomingPage";
import UserDashboard from "../Dashboards/User/UserDashboard/UserDashboard";
import UserProfile from "../Dashboards/User/UserProfile/UserProfile";
import UserRequestedMeals from "../Dashboards/User/UserRequestedMeals/UserRequestedMeals";
import UserReviews from "../Dashboards/User/UserReviews/UserReviews";






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
                element: <AllMealsPage></AllMealsPage>,
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
        ]
    },
])

export default router