import React from "react";
import mealBox from "../../assets/mealBox.png";
import '../BodyMain/BodyMain.css';
import "../Signup/Signup.css";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const meals = [
    { id: 1, name: 'MEAL#1', price: 150 },
    { id: 2, name: 'MEAL#2', price: 200 },
    { id: 3, name: 'MEAL#3', price: 250 },
    { id: 4, name: 'MEAL#4', price: 300 },
    { id: 5, name: 'MEAL#5', price: 350 },
    { id: 6, name: 'MEAL#6', price: 400 },
    { id: 7, name: 'MEAL#7', price: 450 },
    { id: 8, name: 'MEAL#8', price: 500 },
];

const firebaseConfig = {
    apiKey: "AIzaSyCzLkc12IfROfn3SIfa44P0WZ8F8fgL-f4",
    authDomain: "mealboxsign.firebaseapp.com",
    projectId: "mealboxsign",
    storageBucket: "mealboxsign.appspot.com",
    messagingSenderId: "850073620732",
    appId: "1:850073620732:web:0feca263a73378ee5b8779"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


const BodyMain = () => {

    const handleAddToCart = async (meal) => {
        const email = localStorage.getItem('email')
        console.log(email)
        const user = await getDoc(doc(db, "users", email));
        if (user.exists()) {
            const data = user.data();
            for (let i = 0; i < data.addToCart.length; i++) {
                if (data.addToCart[i].id === meal.id) {
                    alert('Item Exists!!')
                    return;
                }
            }
            const temp = {
                ...data,
                addToCart: [...data.addToCart, meal]
            }
            await setDoc(doc(db, "users", email), {
                ...temp
            });
        }
    }

    const handleWatchList = async (meal) => {
        const email = localStorage.getItem('email')
        console.log(email)
        const user = await getDoc(doc(db, "users", email));
        if (user.exists()) {
            const data = user.data();
            const temp = {
                ...data,
                watchList: [...data.watchList, meal]
            }
            await setDoc(doc(db, "users", email), {
                ...temp
            });
        }
    }

    return (
        <div id="mainBody">
            <div id="meals">
                {meals.map((meal) => (
                    <div className="meal" id={`meal-${meal.id}`} key={`meal-${meal.id}`}>
                        <img id="mealBoxPic" src={mealBox} alt="" />
                        <div id="mealName">{meal.name}</div>
                        <div id="pricing">
                            <div id="price">Rs. {meal.price}</div>
                            <button id="addToCart" onClick={() => handleAddToCart(meal)}>+</button>
                            <button id="addToCart" onClick={() => handleWatchList(meal)}>&lt;3</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BodyMain;
