import Productlist from './Productlist'
import React from 'react'


import Example from "../category"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function Home() {
  const user= useSelector(state=> state.user.user);
console.log(user)
  return (
    <>
    {!user && <Navigate to='/login'/>}
    <div>  
    <Example><Productlist></Productlist></Example></div>
    </>)
}

export default Home;