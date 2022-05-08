import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import axios from 'axios';
import DishTypeButton from "./DishTypeButton";
import pizzaImg from "../imgs/pieceOfPizza.png";
import sandwichImg from "../imgs/sandwich3.png";
import soupImg from "../imgs/soup.png";
import "./Order.css";

function Order() {
  const [dishType, setDishType] = useState();
  const { register, handleSubmit, formState: {errors} } = useForm();

  const dishTypeNames = ["pizza", "soup", "sandwich"];
  
  const dishTypeObj = {
    type: dishTypeNames[dishType]
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  const prepareAndPostData = (d) =>{
    
    let dataObj = {...d, ...dishTypeObj};

     // converting strings to Numbers to reach the type requirement on POST 
     dataObj.spiciness_scale = Number(dataObj.spiciness_scale);
     dataObj.no_of_slices = Number(dataObj.no_of_slices);
     dataObj.diameter = Number(dataObj.diameter);
     dataObj.slices_of_bread = Number(dataObj.slices_of_bread);

    if (dishType===0){ 
      var {spiciness_scale, slices_of_bread, ...newDataObj} = dataObj;
      
     };

     if (dishType===1){ 
      var {no_of_slices, diameter, slices_of_bread , ...newDataObj} = dataObj;
      
     };

     if (dishType===2){ 
      var {spiciness_scale, no_of_slices, diameter, ...newDataObj} = dataObj;
      
     };

    axios.post('https://frosty-wood-6558.getsandbox.com:443/dishes', newDataObj)
    .then(function (response) {
      console.log(response);
      alert("Order sent sucessfully");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const changeDishType = (dishNumber) => {
    // pizza 0
    // soup 1
    // sandwich 2
    setDishType(dishNumber);
  }

  const conditionalRender = (dishNumber) => {
    switch(dishNumber){
      case 0:
        return (
          <div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <h5>Number of slices</h5>
              <input className='input' type="number" {...register('no_of_slices', { required: true })} />
              {errors.no_of_slices?.type === 'required' && <p>This field is required</p>}
              <h5>Type pizza diameter [cm]</h5>
              <input className='input' type="number" step="0.01" {...register('diameter', { required: true })} />
              {errors.diameter?.type === 'required' && <p>This field is required</p>}
            </form>
          </div>
        )
      case 1: 
        return (
          <div>
            <form className='form'  onSubmit={handleSubmit(onSubmit)}>
              <h5>Soup spiciness</h5>
              
                <input className='scaleInput lastInput' type="range" min="1" max="10" list="tickmarks" {...register('spiciness_scale', { required: true })}/>
                <datalist id="tickmarks">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
                <option value="7"></option>
                <option value="8"></option>
                <option value="9"></option>
                <option value="10"></option>
                </datalist>
            </form>
        </div>
        )
      case 2: 
        return (
          <div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <h5>Slices of bread</h5>
              <input className='input lastInput' type="number" {...register('slices_of_bread', { required: true })} />
              {errors.slices_of_bread?.type === 'required' && <p>This field is required</p>}
            </form>
          </div>
        )
      default:
        return <h5>Choose dish type to see more options</h5>
    }
  }
  
  return (
    <div className='orderComponent'>
      <div className='whiteBox'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>

          <h4 id="h4_order">Place your order</h4>
          <h5>Dish</h5>
          <input className='input' type="text" placeholder="Type a dish name" {...register('name', { required: true })} />
          {errors.name?.type === 'required' && <p>Dish name is required</p>}
          <h5>Preparation Time</h5>
          <input className='input' type="time" step="1" {...register('preparation_time', { required: true })} />
          {errors.preparation_time?.type === 'required' && <p>Duration time is required</p>}
        </form>

        <div className='form2'>
          <h5>Dish Type</h5>  
          <div className='box'>
            <DishTypeButton imgSource={pizzaImg} dishName={"Pizza"} onClick={() => changeDishType(0)}/>
            <DishTypeButton imgSource={soupImg} dishName={"Soup"} onClick={() => changeDishType(1)}/>
            <DishTypeButton imgSource={sandwichImg} dishName={"Sandwich"} onClick={() => changeDishType(2)}/>
          </div>
          {conditionalRender(dishType)}
        </div>
        
        <button onClick={handleSubmit((d) => prepareAndPostData(d))} id="sendOrderButton" value="Send Order" type="submit" >Send Order</button>
      </div>
    </div>
  );
}

export default Order;
