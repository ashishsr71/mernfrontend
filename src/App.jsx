import {Provider, useSelector } from "react-redux"
import {store} from "./reduxlogic/store"
import Home from "./pages/Home"
import Navbar from "./features/navbar"
import { Loader } from "./category"
import Login from "./pages/Login"
import Signup from "./pages/jSignup"
import { loaderUser } from "./pages/Login"
import { fetchSingleProduct } from "./pages/Productdetail"
// import CheckoutForm from "../Userpages/CheckoutPage"
import Checkout from "../Userpages/CheckoutPage"
import Cart from "../Userpages/Cart"
import Productdetail from "./pages/Productdetail"
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
// import { PersistGate } from "redux-persist/integration/react"
import AdminSingleproduct from "./Adminpages/AdminSingleproduct"
import StripeCheckout from "../Userpages/StripeCheckout"


function App() {
  const user=useSelector(state=>state.user.user)
  const router= createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>
      <Route index loader={Loader} element={<Home/>}/>
      <Route path="/login" loader={(data)=>{return loaderUser({data,user})}} element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/admin" element={<AdminSingleproduct/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
    <Route path="/products/:id" loader={fetchSingleProduct} element={<Productdetail/>}/>
    <Route path="/stripe-checkout/" element={<StripeCheckout/>}/>
    <Route path="*" element={<h2>no route exist</h2>}/>
      </Route>
  ))

  return (
    <>
   
      {/* <PersistGate loading={null} persistor={persistor}> */}
    <RouterProvider router={router}/>
    {/* </PersistGate> */}
  
      
    </>
  )
}

export default App;
