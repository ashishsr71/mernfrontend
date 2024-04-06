import { createSlice } from "@reduxjs/toolkit";

const orderSlice= createSlice({
      name:'order',
      orders:[],
      currentorder:null,
      totalorders:0,
      reducers:{
            resetOrder:(state)=>{
                  state.currentorder=null
            }
      },
      extraReducers:(builders)=>{
            
      }
})

export default  orderReducer= orderSlice.reducer
export const {resetOrder}= orderSlice.actions;
