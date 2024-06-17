// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import"./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = () => {
    const url ="http://localhost:4005"
    const [image,setImage]=useState(false)
    const [data,setdata]=useState({
        name:"",
        category:"White Pizza",
        price:"",
        description:""

    })

    const handlechnae=(event)=>{
        const name= event.target.name
        const value=event.target.value
        setdata(data=>({...data,[name]:value}))
    }
    
    const onSumbitHandler= async(ev)=>{
        ev.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(`${url}/api/food/add`,formData)
        if (response.data.success){
            setdata({
                name:"",
                category:"White Pizza",
                price:"",
                description:""
        
            })
            setImage(false)
            toast.success(response.data.message)

            
        }
        else{
                toast.error(response.data.message)
        }
        


    }
  return (
    <div className='add'>
        <form  className="flex-col" onSubmit={onSumbitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image): assets.upload} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
            </div>

            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={handlechnae} value={data.name} type="text" name='name' placeholder='Type-here' />

            </div>
            <div  className="add-product-description flex-col">
                <textarea onChange={handlechnae} value={data.description}  name='description' rows="6" placeholder='type here'></textarea>

            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select name="category" onChange={handlechnae} id="" className="category">
                        <option value="Meat Lover Pizza">Meat Lover Pizza</option>
                        <option value="White Pizza">White Pizza</option>
                        <option value="Vegetarian Pizza">Vegetarian Pizza</option>
                        <option value="Supreme Pizza">Supreme Pizza</option>
                        <option value="Pepperoni Pizza">Pepperoni Pizza</option>
                        <option value="Margherita Pizza">Margherita Pizza</option>
                        <option value="Hawaiian Pizza">Hawaiian Pizza</option>
                        <option value="BBQ Chicken Pizza">BBQ Chicken Pizza</option>
                    </select>
                   
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={handlechnae} value={data.price}  type="number" name='price' placeholder='$20' />

                </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
        </form>
        
    </div>
  )
}

export default Add