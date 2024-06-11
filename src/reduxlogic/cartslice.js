import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



export const fetchFilterproducts=createAsyncThunk('fetch/product',async({filter,pagination})=>{
// console.log(filter)
console.log(pagination)
            let querystring=``
            for (let key in filter){
                  
                  if(filter[key].length >=1){
                       const arr= filter[key]
                        const cate= arr[arr.length-1];
                        // console.log(cate)
                        querystring+=`${key}/${cate}`
                        
                  }
            }
for(let key in pagination){
      const pageno= pagination[key]-1
      console.log(pageno)
      querystring+=`?skip=${pageno*10}&limit=10`
}
            // console.log(querystring)
      const response= await axios(`https://commerce-backend-2.onrender.com${querystring}`)
return response.data;
// }else{
//       const response = await axios.get("https://dummyjson.com/products")
//       // console.log
// (response)
//             return response.data
      
// }

})
export const fetchProducts= createAsyncThunk("fetch/posts",async()=>{
      const response = await axios.get("https://commerce-backend-2.onrender.com")
console.log(response.data)
      return response.data

})
const cartslice= createSlice({
      name:'cart',
      initialState:{
            products:[],
            totalItems:0,
     cart:[],
      },
    reducers:{},
      extraReducers:(builders)=>{
            builders.addCase(fetchProducts.pending,(state,action)=>{
                  // console.log('request pending')
            })
          .addCase(fetchProducts.fulfilled,(state,action)=>{
            console.log(action)
state.products=action.payload
// console.log(action.payload)
          })
          .addCase(fetchProducts.rejected,(state,action)=>{
            console.log(action)
          })
          
          .addCase(fetchFilterproducts.fulfilled,(state,action)=>{
            // console.log(action.payload)
            state.products= action.payload
            state.totalItems=action.payload.total
          })
          .addCase(fetchFilterproducts.rejected,(state,action)=>{
            console.log('request denied')
          })
      }
})


export const cartslicereducer= cartslice.reducer;