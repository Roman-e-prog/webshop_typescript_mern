import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllProducts } from '../features/products/productsSlice';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import Logo from '../components/Logo';
import Search from '../components/Search';
const Container = styled.div`
    width:100%;
`;
const TitleWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    margin: 10px 0;
`;
const Title = styled.h1`
  font-size:26px;
  color:var(--fontColor);
`;

const SearchHolder = styled.div`
    width:100%;
`;
const ContentWrapper = styled.div`
    width:90%;
    margin: 0 auto;
    display:flex;
    flex-wrap:wrap;
`;
const FieldWrapper = styled.div`
  width:24%;
  margin:4px;
  display:flex;
  flex-direction:column;
`;
const ImgHolder = styled.div`
    width:100%;
    height:250px;
    object-fit:cover;
    margin-bottom:5px;
    & img{
        width:100%;
        height:100%;
    }
`;
const DescHolder = styled.div`
    width:100%;
    & h4 h5 span{
        margin-bottom:3px;
    }
`;
const ColorHolder = styled.div`
    display:flex;
`;
const Colors = styled.div`
  width:20px;
  height:20px;
  border-radius:50%;
  margin-right:4px;
  border:1px solid var(--fontColor);
`;
const Schuhe = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state)=>state.products.allProducts);
  const isLoading = useAppSelector((state)=>state.products.isLoading);
  

  useEffect(()=>{
    dispatch(getAllProducts())
  }, [dispatch])
  //search
  const [searchValue, setSearchValue] = useState("");
  const filteredProduct = products.filter((item)=>{
    return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
  })
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
        <Navbar/>
        <Logo/>
        <TitleWrapper>
          <Title>Unser Gesamtangebot</Title>
        </TitleWrapper>
        <SearchHolder>
        <Search callback={(searchValue:string)=>setSearchValue(searchValue)} />
        </SearchHolder>
        <ContentWrapper>
          {filteredProduct ? filteredProduct.map((item:any)=>(
            <FieldWrapper key={item._id}>
              <ImgHolder>
                <img src={item.image} alt={item.title} title={item.title}/>
              </ImgHolder>
              <DescHolder>
                <h4>{item.title}</h4>
                <h5>{item.producer}</h5>
                <span>{item.price} €</span>
              </DescHolder>
              <ColorHolder>
              {item.colors.map((item:any)=>(
                <Colors key={item} style={{background:item}}></Colors>
              ))}
              </ColorHolder>
            </FieldWrapper>
          )) : products.map((item)=>(
            <FieldWrapper key={item._id}>
              <ImgHolder>
              <img src={item.image} alt={item.title} title={item.title}/>
              </ImgHolder>
              <DescHolder>
                <h4>{item.title}</h4>
                <h5>{item.producer}</h5>
                <span>{item.price} €</span>
              </DescHolder>
              <ColorHolder>
              {item.colors.map((item)=>(
                <Colors key={item} style={{background:item}}></Colors>
              ))}
              </ColorHolder>
            </FieldWrapper>
          ))}
        </ContentWrapper>
      <Footer/>
    </Container>
  )
}

export default Schuhe
