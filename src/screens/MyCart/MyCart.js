import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../BodyMain/BodyMain";

import './MyCart.css'

const Cart = () => {

    const [cartItems, setCartItems] = useState([])
    const [userDetails, setUserDetails] = useState([])

    const handleDelete = async (meal) => {
        const email = await localStorage.getItem('email')
        console.log(email)
        const user = await getDoc(doc(db, "users", email));
        if (user.exists()) {
            const data = user.data();
            const temp = {
                ...data,
                addToCart: data.addToCart.filter(i => i?.id !== meal?.id)
            }
            await setDoc(doc(db, "users", email), {
                ...temp
            })
            setCartItems(temp.addToCart)
        }
    }

    useEffect(() => {
        const init = async () => {
            const email = await localStorage.getItem('email')
            if (!email) {
                alert("Login Required")
                window.location.href = '/login'
                return;
            }
            const user = await getDoc(doc(db, "users", email));
            if (user.exists()) {
                const data = user.data();
                setCartItems(data.addToCart)
            }
        }
        init();
    }, [])
    return (
        <div id="addCartPage">
            {
                cartItems?.map((cartItem) => {
                    return (<div id="cartCard" key={cartItem?.id}>

                        <div id="nameCart">
                            {
                                cartItem?.name
                            }
                        </div>
                        <div id="priceCart">
                            Rs.{
                                cartItem?.price

                            }
                        </div>
                        <button id="deleteCartItem" onClick={() => handleDelete(cartItem)}>Delete</button>
                    </div>
                    )
                })
            }

        </div>
    );
};


export default Cart;
