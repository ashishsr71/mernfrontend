import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// function to get all cartitems
export const getCartItems= createAsyncThunk("get/cartItems",async()=>{
  const token= localStorage.getItem("user")
   const response= await fetch(`https://e-commerce-backend-2ybg.onrender.com`,{
headers:{token}
   });
   const data= await response.json();
   console.log(data);
   return data;


});
// fucntion to add items to cart
export const addtocart=createAsyncThunk("add/cart",async({item})=>{
   const token=localStorage.getItem("user")
      const response=await fetch(`https://e-commerce-backend-2ybg.onrender.com`,{
         method:"POST",
         headers:{token},
         body:{...item}
      });
      const data=await response.json();
      return data
});
export const clearCart=createAsyncThunk("clear/cart",async()=>{
   const response= axios.get(`https://e-commerce-backend-2ybg.onrender.com`)
   return response.data;
})

// cart slice logic begins
const ArtSlice= createSlice({
      name:"Art",
      initialState:{items:null,totalItems:0},
      extraReducers:(builders)=>{
   builders.addCase(getCartItems.pending,(state)=>{
      console.log("request pending")
   })
   .addCase(getCartItems.fulfilled,(state,action)=>{
      console.log(action.payload)
      state.items=[...action.payload];
      
   })
   .addCase(getCartItems.rejected,(state,action)=>{
      console.log("request rejected")
   }).addCase(addtocart.pending,()=>{
      console.log("request pending")
   })
   .addCase(addtocart.fulfilled,(state,action)=>{
      console.log("request fulfilled")
      state.items.push(action.payload)
   })
   .addCase(addtocart.rejected,()=>{
      console.log("request rejected")
   })
   .addCase(clearCart.pending,()=>{
      console.log("request pending")
   })
   .addCase(clearCart.fulfilled,()=>{
      console.log("request fulfilled")
   })
   .addCase(clearCart.rejected,()=>{
      console.log("request rejected")
   })
      }

});
const ArtReducers= ArtSlice.reducer;
export default ArtReducers;