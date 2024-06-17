/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems,setCartItems] = useState({})
    // eslint-disable-next-line no-unused-vars
    const [token,settoken]=useState("")
    const [food_list,setFoodList]= useState([])
    const url="http://localhost:4005";

    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
          await axios.post("http://localhost:4005/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async(itemId) =>  {
        if (cartItems[itemId] > 0) {
          setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }
        if(token){
          await axios.post("http://localhost:4005/api/cart/remove",{itemId},{headers:{token}})
        }
      };

      const loadcartdata= async(token)=>{
      const response=  await axios.post("http://localhost:4005/api/cart/get",{},{headers:{token}})
      setCartItems(response.data.cartData) 

      }

      const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
          if (cartItems[itemId] > 0) {
            // Coerce itemId to string for comparison
            const itemInfo = food_list.find((product) => String(product._id) === itemId);
            if (itemInfo) {
              totalAmount += itemInfo.price * cartItems[itemId];
            }
          }
        }
        return totalAmount;
      };
      const fetchFoodList= async()=>{
         const response = await axios.get('http://localhost:4005/api/food/listfood');
         setFoodList(response.data.data)
      }
      useEffect(()=>{
   
        
        async function loadData(){
          await fetchFoodList()
          if(localStorage.getItem("token")){
            settoken(localStorage.getItem("token"))
            await loadcartdata(localStorage.getItem("token"))
          }
        }
        loadData()
        
      })
      
    const contextValue = {
        getTotalCartAmount,
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        settoken,
        token,
        url
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
