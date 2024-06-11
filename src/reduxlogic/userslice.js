import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserthunk= createAsyncThunk('fetch/user',async()=>{

});



export const loginUserthunk= createAsyncThunk('login/user',async(data)=>{
      // console.log(data)
const response= await fetch('https://commerce-backend-2.onrender.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username: data.email,
    password: data.password,
    // expiresInMins: 60, // optional
  })
});

const output= await response.json()
// console.log("jai baba ki")
    return output;
});

 export const addressThunk= createAsyncThunk("get/address",async()=>{
      const response= await fetch("https://commerce-backend-2.onrender.com",{headers:{token:localStorage.getItem('user')}})
      const data= await response.json()
      if(data){
            console.log(data)
            return data
      }
      return [];
});

export const  addAddressThunk=createAsyncThunk("add/address",async()=>{
      const response= axios.post("https://commerce-backend-2.onrender.com");
      return response.data;
})

export const signUpthunk=createAsyncThunk("signup/user",async(data)=>{
const response= await fetch('https://commerce-backend-2.onrender.com',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        username: data.email,
        password: data.password,})
});
// console.log(response)
const dat= await response.json()
console.log(dat)
return dat;
})


const userSlice= createSlice({
      name:'user',
      initialState:{user:null,addresses:[]},
      reducers:{
            logout:(state)=>{
                  console.log('bhai chal raha hu')
                  localStorage.setItem('user',null)
                  state.user=null},
            login:(state,action)=>{
                  
                  state.user=action.payload
            }
      },
      extraReducers:(builders)=>{
      builders.addCase(loginUserthunk.pending,(state,action)=>{
            console.log("request pending")
      })
      .addCase(loginUserthunk.fulfilled,(state,action)=>{
            console.log(action.payload)
            if(action.payload.token){
                  localStorage.setItem('user',action.payload.token)
            state.user= action.payload}else{
      console.log(action.payload.msg)
            }
            

      })
      .addCase(loginUserthunk.rejected,(state,action)=>{
            console.log('request rejected')
      })
      .addCase(signUpthunk.fulfilled,(state,action)=>{
            if(action.payload.token){
                  localStorage.setItem("user",action.payload.token)
                  state.user=action.payload
                  console.log(state)
            }else{console.log(action.payload.msg)}
      })
      .addCase(addressThunk.pending,(state,action)=>{
            console.log("request pending")
      })
      .addCase(addressThunk.fulfilled,(state,action)=>{
            state.addresses=[...action.payload.allAddresses]
      })
      }
})
export const {logout,login}=userSlice.actions;
export const  userReducer= userSlice.reducer;