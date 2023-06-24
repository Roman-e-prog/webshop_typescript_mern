import React from 'react'
import styled from 'styled-components';
import {FaCheck} from 'react-icons/fa';
import { useAppSelector } from '../../app/hooks';
import {createCartdata} from '../../features/cartdata/cartdataSlice';
import {createOrderdata} from '../../features/orders/orderSlice';
import { resetCart } from '../../features/cart/cartReducer';
import { useEffect, useRef} from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import {small} from '../../responsive';
const Container = styled.div`
  width:100%;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const ThankYou = styled.div`
  width:40%;
  height:50%;
  border:1px solid var(--coffee);
  padding: 10px;
  display:flex;
  flex-direction:column;
  ${small({height:"60%"})};

  & h1{
    font-size:26px;
    margin-bottom:10px;
  }
`;
const IconHolder = styled.div`
  width:100%;
  margin-top:20px;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const ButtonHolder = styled.div`
  width:100%;
  margin-top:10px;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const HomeButton = styled.button`
  background:var(--coffee);
  color:var(--white);
  width:40%;
  padding:5px;
  border:none;
  cursor: pointer;
  ${small({fontSize:"14px", width:"60%"})}
`;
const Success = () => {
  const dispatch = useAppDispatch();
  const user:any = useAppSelector((state)=>state.auth.user);
  const cartProduct = useAppSelector((state)=>state.cart.cartProduct);
  const isLoading = useAppSelector((state)=>state.order.isLoading);
  console.log(cartProduct);
  const getQuantity = ()=>{
    let totalQuantity = 0;
    cartProduct.forEach((item)=>{
      totalQuantity += item.quantity;
    })
    return totalQuantity
  }
  let quantity = getQuantity();
  const getTotal = () => {
    let totalPrice = 0
    cartProduct.forEach(item => {
      totalPrice += item.price * item.quantity
    })
    return totalPrice
  }
  let total = getTotal();
const versand = ()=>{
  if(total === 0){
    return 0
  }
  else{
    return 5.90
  }
}
const versandRabatt = ()=>{
  if(total > 50){
    return -5.90
  } else{
    return 0;
  }
}
const netto = Math.round(((total + versand() + versandRabatt()) /1.19 + Number.EPSILON) * 100) / 100;
const amount = (total + versand() + versandRabatt()).toFixed(2);
console.log(amount);
//render
const firstUpdate = useRef(true)
useEffect(()=>{
   const cartdata = {
  user,
  cartProduct,
  netto,
  amount,
  quantity,
 }
const orderdata = {
  user,
  netto,
  amount,
 }
  if(firstUpdate.current){
    firstUpdate.current = false
  }
  else{
      dispatch(createCartdata(cartdata))
      dispatch(createOrderdata(orderdata))
    }    
},[dispatch, user, cartProduct, netto, amount, quantity])
if(isLoading){
  return <Spinner/>
}
  return (
    <Container>
       <ThankYou>
       <h1>Zahlung erfolgreich!</h1>
       <p>Das Team von RAR Schuhmode bedankt sich für Ihren Einkauf.</p>
       <IconHolder>
         <FaCheck style={{color: "green", fontSize:"36px"}}/>
       </IconHolder>
       <ButtonHolder>
         <HomeButton onClick={()=>dispatch(resetCart())}><Link to="/" className='link' style={{color:"var(--white)", display:"block"}}>Zur Starseite</Link></HomeButton>
       </ButtonHolder>
     </ThankYou>
    </Container>
  )
}

export default Success
