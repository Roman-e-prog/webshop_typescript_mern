import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { addToCart } from '../features/cart/cartReducer';
import {getAllWishlist, deleteWishlist} from '../features/wishlist/wishlistSlice';
import {small, middle} from '../responsive';

const Container = styled.div`
    width:100%;
`;
const ContentWrapper = styled.div`
    width:100%;
`;
const TitleHolder = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Title = styled.h1`
  font-size:26px;
  color:var(--fontColor);
  margin:10px 0;
`;
const WuliWrapper = styled.div`
    width:100%;
    margin: 5px 0;
`;
const Wuli = styled.div`
  display:flex;
  ${small({flexDirection:"column"})}
`;
const ImageWrapper = styled.div`
  padding:20px;

  & img{
    width:300px;
    height:250px;
  }
`;
const ProductDetails = styled.div`
  display:flex;
  flex-direction:column;
  padding:20px;

  & h2{
    margin-bottom:10px;
    color:var(--fontColor);
  }
  & h3{
    margin-bottom:5px;
    color:var(--fontColor);
  }
  & span{
    font-size:20px;
    color:var(--fontColor);
  }
`;
const Color = styled.span`
  height:20px;
  width:20px;
  border-radius:50%;
  margin:5px 0;
  border:1px solid var(--fontColor);
`;
const ButtonWrapper = styled.div`
  display:flex;
`;
const DeleteButton = styled.button`
 margin-top:20px;
 margin-right:5px;
    padding:10px;
    width:200px;
    background:var(--fontColor);
    color:var(--white);
    cursor: pointer;
    border:none;
    ${middle({width:"120px"})}
`;
const CartButton = styled.button`
 margin-top:20px;
    padding:10px;
    width:200px;
    background:var(--coffee);
    color:var(--white);
    cursor: pointer;
    border:none;
    ${middle({width:"120px"})}

    & p{
      display:block;
    }
`;
const Wunschliste = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state)=>state.auth.user);
  const wishlist = useAppSelector((state)=>state.wishlist.wishlist);
  const isLoading = useAppSelector((state)=>state.wishlist.isLoading);
  
  useEffect(()=>{
    if(!user){
      navigate('/cartProtect');
    }
    dispatch(getAllWishlist())
  }, [dispatch,user, navigate]);

  const wishlistId = wishlist.filter((item)=>item.userId === user!._id)

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(5);
  const lastIndex = currentPage * productPerPage;
  const firstIndex = lastIndex - productPerPage;
  const currentProducts = wishlistId.slice(firstIndex, lastIndex);
  const handledelete = async (id:string)=>{
    await dispatch(deleteWishlist(id));
    dispatch(getAllWishlist());
  }
  const handleAdd = (item:any)=>{
   dispatch(addToCart(item)); 
    navigate('/cart');
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <Logo/>
      <ContentWrapper>
        <TitleHolder>
          <Title>Ihre Wunschliste</Title>
        </TitleHolder>
        <WuliWrapper>
          {currentProducts.map((item:any)=>(
            <Wuli key={item._id}>
              <ImageWrapper>
            <img src={item.product.image} alt={item.product.title} title={item.product.title}/>
          </ImageWrapper>
          <ProductDetails>
              <h2>{item.product.title}</h2>
              <h3>Hersteller: {item.product.producer}</h3>
              <span>Größe: {item.size}</span>
              <Color style={{background:`${item.color}`}}></Color>
              <p>Produktbeschreibung: {item.product.desc}</p>
              <span>Anzahl: {item.quantity}</span>
              <span>Gesamtpreis: {item.quantity * item.price} €</span>
              <ButtonWrapper>
                <DeleteButton onClick={()=>handledelete(item._id)} title='Löschen'>Löschen</DeleteButton>
                <CartButton onClick={()=>handleAdd(item)} title='In den Warenkorb'><p>In den Warenkorb</p></CartButton>
              </ButtonWrapper>
          </ProductDetails>
            </Wuli>
          ))}
        </WuliWrapper>
        </ContentWrapper>
        <Pagination
        total={wishlistId.length}
        limit={productPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
      <Footer/>
    </Container>
  )
}

export default Wunschliste
