// Verify.js
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            console.log(success,orderId)
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            console.log(response)
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div className='verify'>
            <div className="spinner">
                {/* You can add a loading spinner or message here */}
                <p>Verifying payment...</p>
            </div>
        </div>
    );
};

export default Verify;
