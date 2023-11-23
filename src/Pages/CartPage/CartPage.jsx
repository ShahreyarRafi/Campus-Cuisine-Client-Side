import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Cart from "../../Components/Cart/Cart";

const CartPage = () => {
    const initialCartItems = useLoaderData();
    const [cartItems, setCartItems] = useState(initialCartItems);

    useEffect(() => {
        setCartItems(initialCartItems);
    }, [initialCartItems]);

    return (
        <div>
            <Cart cartItems={cartItems} setCartItems={setCartItems} ></Cart>
        </div>
    );
};

export default CartPage;
