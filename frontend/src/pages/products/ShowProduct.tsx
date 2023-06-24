import React, { useEffect, useState,} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {useParams} from 'react-router-dom';
import {getProduct} from '../../features/products/productsSlice';
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'
import styled from 'styled-components';
import { addToCart } from '../../features/cart/cartReducer';
import Navbar from '../../components/Navbar';
import Logo from '../../components/Logo';
import {small} from '../../responsive';
import { createWishlist } from '../../features/wishlist/wishlistSlice';
import {Link} from 'react-router-dom';
import Spinner from '../../components/Spinner';

const Container = styled.div`
    width:100%;
`;
const ProductWrapper = styled.div`
     width:100%;
    display:flex;
    ${small({flexDirection:"column"})};
`;
const ImageWrapper = styled.div`
    flex:1;
    padding:20px;

    & img{
        width:100%;
        ${small({width:"80%"})};
    }
`;
const ContentWrapper = styled.div`
    flex:1;
    padding:20px;

    & h2{
        font-size:30px;
        margin-bottom: 20px;
    }
`;
const ArtNr = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:15px;
    & h5{
        margin-bottom:5px;
    }
`;
const Producer = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:15px;
    & h5{
        margin-bottom:5px;
    }
`;
const ColorWrapper = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:15px;
    & h5{
        margin-bottom:5px;
    }
`;
const Colors = styled.div`
    display:flex;
    margin-bottom:15px;
    background:#adb3ab442;
    & h5{
        margin-bottom:5px;
    }
`;
const Color = styled.div`
  width:30px;
        height:30px;
        border-radius:50%;
        margin: 0 4px;
        border: 1px solid var(--fontColor);
`;
const Sizes = styled.div`
margin-bottom:15px;
& h5{
    margin-bottom:5px;
}
`;
const PriceWrapper = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:15px;
    & h5{
        margin-bottom:5px;
    }
`;
const Price = styled.div`
    display:flex;
    font-size:30px;
`;
const Quantity = styled.div`
    display:flex;
    align-items:center;
    & button{
        margin:0 5px;
        border:none;
        background:var(--white);
    }
    & span{
        font-size:30px;
    }
`;
const SendButtonWrapper = styled.div`
    margin-top:20px;

    & button{
        width:200px;
        padding:5px;
        background:var(--coffee);
        color:var(--white);
        border:none;
        cursor: pointer;
    }
    & #toWishlist{
        background:var(--fontColor);
    }
`;
const Description = styled.div`
    margin:20px 0;
    display:flex;
    flex-direction:column;
    & h5{
        margin-bottom:5px;
    }
`;

const ShowProduct = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state)=>state.auth.user);
    const product = useAppSelector((state)=>state.products.product);
    const isLoading = useAppSelector((state)=>state.products.isLoading);
    
    const {id} = useParams();
    
    //product
  useEffect(()=>{
        dispatch(getProduct(id!)) 
  },[dispatch, id]);
 
    const copyProduct = {...product};
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");

    const userId = user?._id;
   
    const handleClick= ()=>{
        const shoppedData ={
            ...product,
            _id:product._id,
            price:product.price,
            size,
            color,
            quantity,
            }
        dispatch(addToCart(shoppedData));
    }
    const handleWishlist= ()=>{
        const wishData ={
            product: product,
            price:product.price,
            userId,
            size,
            color,
            quantity,
            }
            console.log(wishData)
        dispatch(createWishlist(wishData));
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <Navbar/>
        <Logo/>
        <ProductWrapper>
            <ImageWrapper>
                <img src={product.image} alt={product.title} title={product.title}/>
            </ImageWrapper>
            <ContentWrapper>
                <h2>{product.title}</h2>
                <ArtNr>
                    <h5>Artikelnummer</h5>
                    <span>{product._id}</span>
                </ArtNr>
                <Producer>
                    <h5>Hersteller</h5>
                    <span>{product.producer}</span>
                </Producer>
                <ColorWrapper>
                    <h5>Farben</h5>
                     <Colors>{copyProduct.colors && copyProduct.colors.map((item)=>(
                         <Color style={{background:item}} key={item} onClick={(e)=>{setColor(item)}}></Color>
                     ))}</Colors>
                </ColorWrapper>
                <Sizes>
                    <h5>Größen</h5>
                    <select onChange={(e)=>setSize(e.target.value)} title="Größen">
                    {copyProduct.sizes && copyProduct.sizes.map((item)=>(
                        <option key={item}>{item}</option>
                    ))}
                    </select>
                </Sizes>
                <PriceWrapper>
                    <h5>Preis</h5>
                    <Price>
                        <span>{product.price} </span>
                        <span>{product.currency}</span>
                    </Price>
                </PriceWrapper>
                <Quantity>
                    <button type="button" title="Anzahl minus"><AiOutlineMinusCircle onClick={()=>setQuantity((prev)=>prev === 1 ? 1 : prev-1)}style={{fontSize:"30px"}}/></button>
                    <span>{quantity}</span>
                    <button type="button" title="Anzahl plus"><AiOutlinePlusCircle onClick={()=>setQuantity((prev)=>prev +1)} style={{fontSize:"30px"}}/></button>
                </Quantity>
                <SendButtonWrapper>
            <button onClick={handleClick}>In den Warenkorb</button>
            </SendButtonWrapper>
            <Description>
                <h5>Produktbeschreibung</h5>
                <p>{product.desc}</p>
            </Description>
            <SendButtonWrapper>
                <button id="toWishlist" onClick={handleWishlist}><Link to="/wunschliste" className='link' id="whiteLink">Zur Wunschliste hinzufügen</Link></button>
            </SendButtonWrapper>
            </ContentWrapper>
        </ProductWrapper>
    </Container>
  )
}

export default ShowProduct

