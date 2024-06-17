// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { cartItems, food_list, token, url, getTotalCartAmount } = useContext(StoreContext);
    const [data, setData] = useState({
        firstname: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = food_list.filter(item => cartItems[item._id] > 0).map(item => ({
            ...item,
            quantity: cartItems[item._id]
        }));

        const orderData = {
            userId: localStorage.getItem('userId'), // Ensure userId is available
            items: orderItems,
            amount: getTotalCartAmount() + 2,
            address: data
        };

        try {
            const response = await axios.post(`${url}/api/order/place`, orderData, {
                headers: {
                    token: token
                }
            });

            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order");
        }
    };
    const navigate = useNavigate();

    useEffect(()=>{
      if(!token){
          navigate("/cart")
      }
      else if(getTotalCartAmount()===0){
        navigate("/cart")
      }
    },[token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required type="text" placeholder='First name' name='firstname' onChange={onChangeHandler} value={data.firstname} />
                    <input required type="text" placeholder='Last name' name='lastName' onChange={onChangeHandler} value={data.lastName} />
                </div>
                <input required type="text" placeholder='Email address' name='email' onChange={onChangeHandler} value={data.email} />
                <input required type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street} />
                <div className="multi-fields">
                    <input required type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} />
                    <input required type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state} />
                </div>
                <div className="multi-fields">
                    <input required type="text" placeholder='Zipcode' name='zipcode' onChange={onChangeHandler} value={data.zipcode} />
                    <input required type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} />
                </div>
                <input required type='text' placeholder='Phone' name='phone' onChange={onChangeHandler} value={data.phone} />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>$2</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
