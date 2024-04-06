import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    allOrders:[],
    currentOrder:null,
    totalOrders:0,
};

export const createOrderThunk= createAsyncThunk('create/order',async(data)=>{
   const token=localStorage.getItem("user")
   const headers={'Content-Type': 'application/json',token}
   console.log(data)
   const response = await axios.post("http://localhost:3001/user/createorder",data,{headers})

   return response.data;
});



export const getAllOrdersThunk= createAsyncThunk('get/orders',async()=>{
      const response= await fetch('http://localhost:3001/user/orders',{
            headers:{token:localStorage.getItem('user')}
      });
      const data= await response.json();
      return data;
});

export const updataOrderThunk= createAsyncThunk('updata/order',async(data)=>{
    const response = await fetch('http://localhost:3001/user/updataOrder',{
      method:'POST',
      headers:{token:localStorage.getItem('user')},
      body:{...data}
    });
    const dat = await response.json();
    return dat;      
});






const orderSlice= createSlice({
      name:'order',
      initialState,
      reducers:{},
      extraReducers:(builders)=>{
               builders
               .addCase(createOrderThunk.pending,(state,action)=>{
                  console.log('create order request pending')
               })
               .addCase(createOrderThunk.fulfilled,(state,action)=>{
                  state.currentOrder=action.payload;
                  console.log(action.payload)
                  console.log('create order request fulfilled');

               })
               .addCase(createOrderThunk.rejected,(state,action)=>{
                  console.log('createorder request rejected')
               })
               .addCase(getAllOrdersThunk.pending,()=>{
                  console.log('getorder request pending')
               })
               .addCase(getAllOrdersThunk.fulfilled,(state,action)=>{
                  state.allOrders=action.payload.allOrders
               })
               .addCase(getAllOrdersThunk.rejected,(state,action)=>{
                  console.log("getall orders request rejected")
               })
      }
})



export default orderSlice.reducer;