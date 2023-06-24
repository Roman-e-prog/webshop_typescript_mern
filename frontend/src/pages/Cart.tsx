import React, { useEffect } from 'react'
import styled from 'styled-components';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import{AiTwotoneDelete} from 'react-icons/ai';
import { removeFromCart, resetCart } from '../features/cart/cartReducer';
import {small} from '../responsive';
const Container = styled.div`
    width:100%;
`;
const CartWrapper = styled.div`
    width:100%;
`;
const TitleHolder = styled.div`
    width:100%;
    margin-top:20px;
`;
const Title = styled.h1`
  font-size:26px;
  color:var(--fontColor);
  text-align:center;
`;
const TopWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    margin-top:20px;
    ${small({flexDirection:"column"})};
`;
const ShopButton = styled.button`
  padding:10px;
  width:200px;
  background:var(--darkgray);
  color:var(--white);
  border:none;
`;
const ResetButton = styled.button`
  padding:10px;
  width:200px;
  background:var(--coffee);
  color:var(--white);
  border:none;
`;
const CartText = styled.span`
  margin:0 10px;
  color:var(--fontColor);
`;
const WhishListText = styled.span`
  margin:0 10px;
  color:var(--fontColor);
`;
const OrderButton = styled.button`
  padding:10px;
  width:200px;
  background:var(--coffee);
  color:var(--white);
  border:none;
`;
const BottomWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    margin-top:30px;
    ${small({flexDirection:"column"})};
`;
const Info = styled.div`
    flex:3:
`;
const Product = styled.div`
    display:flex;
    justify-content:space-around;
    padding:20px;
    ${small({flexDirection:"column"})};
`;
const ImageHolder = styled.div`
    flex:1;

    & img{
      width:300px;
      height:250px;
    }
`;
const Details = styled.div`
    flex:2;
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;
const ProductName = styled.span``;
const ProductProducer = styled.span``;
const ProductId = styled.span``;
const ProductColor= styled.div`
  width:20px;
  height:20px;
  border-radius:50%;
  border:1px solid var(--fontColor);
`;
const ProductSize= styled.span``;
const Price = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  align-items:center;
`;
const ProductAmmount = styled.div`
    font-weight:600;
    margin: 0 5px;
`;
const ProductPrice= styled.span`
    font-weight:600;
    margin-left:5px;
`;

const Hr = styled.hr`
  height:1px;
  border:none;
  background:var(--darkgray);
`;
const Summary = styled.div`
    flex:1;
    padding:10px;
`;
const SummaryTitleHolder = styled.div`
    margin-bottom:20px;
`;
const SummaryTitle = styled.h2`
    font-size:30px;
`;
const SummaryItem = styled.div`
    margin-bottom:5px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`;
const SummaryText = styled.span`
    font-weight:600;
`;
const SummaryPrice = styled.span`
    font-weight:600;
`;

const Cart = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state)=>state.auth.user);
  const cartProduct = useAppSelector((state)=>state.cart.cartProduct);
 
  //WuLI
  const wishlist = useAppSelector((state)=>state.wishlist.wishlist);
  const wishlistQuantity = wishlist.filter((item)=>item.userId === user?._id);
 console.log(cartProduct);
  const getQuantity = ()=>{
    let totalQuantity = 0;
    cartProduct.forEach((item)=>{
      totalQuantity += item.quantity;
    })
    return totalQuantity
  }
  const getTotal = () => {
    let totalPrice = 0
    cartProduct.forEach(item => {
      totalPrice += item.price * item.quantity
    })
    return totalPrice
  }
  let total = getTotal();
  let quantity = getQuantity();
  
  const navigate = useNavigate();
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
  
  useEffect(()=>{
    if(!user){
      navigate('/cartProtect');
    }
  },[user, navigate]);
  const handleDelete = (id:string)=>{
    dispatch(removeFromCart(id));
  }
  return (
    <Container>
      <Navbar/>
      <Logo/>
      <CartWrapper>
      <TitleHolder>
        <Title>Ihr Warenkorb</Title>
      </TitleHolder>
      <TopWrapper>
        <ShopButton><Link to="/" id="blackLink" title="Einkauf fortsetzen">Einkauf Fortsetzen</Link></ShopButton>
        <CartText>Ihr Einkaufswagen({quantity})</CartText>
        <WhishListText><Link to="/wunschliste" id="blackLink" title="Ihre Wunschliste">Ihre Wunschliste({wishlistQuantity.length})</Link></WhishListText>
        <ResetButton onClick={()=>dispatch(resetCart())} title="Löschen">Löschen</ResetButton>
      </TopWrapper>
      <BottomWrapper>
        <Info>
        {cartProduct.length && cartProduct.map((item:any)=>(
          <Product key={item._id}>
          <ImageHolder>
            <img src={item.image || item.product.image} alt={item.title || item.product.title}/>
          </ImageHolder>
          <Details>
            <ProductName><b>Name: </b>{item.title || item.product.title}</ProductName>
            <ProductProducer><b>Hersteller: </b>{item.producer || item.product.producer}</ProductProducer>
            <ProductId><b>Artikelnummer: </b>{item._id}</ProductId>
            <ProductColor style={{background:item.color}}></ProductColor>
            <ProductSize><b>Größe: </b>{item.size}</ProductSize>
          </Details>
          <Price>
            <ProductAmmount>Anzahl:</ProductAmmount>
            <ProductAmmount>{item.quantity}</ProductAmmount>
            <ProductAmmount>Preis</ProductAmmount>
            <ProductPrice>{item.price * item.quantity}<b>€ </b></ProductPrice>
            <AiTwotoneDelete onClick={()=>handleDelete(item._id)} style={{color:"var(--coffee)", fontSize:"20px", cursor:"pointer"}}/>
          </Price>
          <Hr></Hr>
        </Product>
          ))}
        </Info>
        {cartProduct.length > 0 &&
          <Summary>
        <SummaryTitleHolder>
          <SummaryTitle>Ihre Bestellung</SummaryTitle>
        </SummaryTitleHolder>
        <SummaryItem>
          <SummaryText>Zwischensumme</SummaryText>
          <SummaryPrice>{total.toFixed(2)} €</SummaryPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryText>Versandkosten</SummaryText>
          <SummaryPrice>{`${(versand()).toFixed(2)} €`}</SummaryPrice>
        </SummaryItem>
        {total > 50 && <SummaryItem>
          <SummaryText>Versandkosten Rabatt</SummaryText>
          <SummaryPrice>{(versandRabatt()).toFixed(2)} €</SummaryPrice>
        </SummaryItem> }
        <SummaryItem>
          <SummaryText>Gesamt netto:</SummaryText>
          <SummaryPrice>{netto} €</SummaryPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryText>MwSt 19 %:</SummaryText>
          <SummaryPrice>{((total + versand() + versandRabatt()) - netto).toFixed(2)} €</SummaryPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryText>Gesamt brutto:</SummaryText>
          <SummaryPrice>{(total + versand() + versandRabatt()).toFixed(2)} €</SummaryPrice>
        </SummaryItem>
        <OrderButton><Link to={'/order'} className="link" style={{color:"var(--white)"}} title="Zur Kasse">Zur Kasse</Link></OrderButton>
      </Summary>
        }
      </BottomWrapper>
      </CartWrapper>
      <Footer/>
    </Container>
  )
}

export default Cart
