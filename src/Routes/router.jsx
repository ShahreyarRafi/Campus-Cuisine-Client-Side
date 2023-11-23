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






const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                // loader: () => fetch('http://localhost:5000/products')
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
                path: 'cart',
                element: (
                    <PrivateRoute>
                        <CartPage></CartPage>
                    </PrivateRoute>
                ),
                // loader: () => fetch('http://localhost:5000/cartItems'),
            },

        ]
    }
])

export default router