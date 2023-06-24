import React from 'react'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllProducts } from '../../features/products/productsSlice';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import {small, middle} from '../../responsive';
const Container = styled.div`
    flex:4;
`;
const ProductsWrapper = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
`;
const FieldWrapper = styled.div`
    width:30%;
    display:flex;
    flex-direction:column;
    margin:4px;
    ${middle({width:"45%"})};
    ${small({width:"90%"})};

    & #showProduct{
        color:var(--fontColor);
        width:100%;
        cursor:pointer;
    }
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
    & h4 h5 p span{
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
    border: 1px solid var(--fontColor);
`;
const SneakerProduct = () => {
    const dispatch = useAppDispatch();
    const allProducts = useAppSelector((state)=>state.products.allProducts);
    useEffect(()=>{
        dispatch(getAllProducts());
    }, [dispatch])
    const productsSneaker = allProducts.filter((item)=>{
        return item.categories.includes("Sneaker");
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    const currentProducts = productsSneaker.slice(firstIndex, lastIndex);
    useEffect(() => {
        window.scrollTo({top:120})
      }, [currentProducts])
  return (
    <Container>
      <ProductsWrapper>
        {currentProducts.map((item:any)=>(
            <FieldWrapper key={item._id}>
                <Link to={`/showProduct/${item._id}`} className="link" id="showProduct" title="Produkt anzeigen">
                <ImgHolder>
                <img src={item.image} alt={item.category} title={item.title}/>
                </ImgHolder>
                <DescHolder>
                    <h4>{item.title}</h4>
                    <h5>{item.category}</h5>
                    <p>{item.producer}</p>
                    <p>{item.desc}</p>
                    <span>{item.price}{item.currency}</span>
                    <ColorHolder>
                    {item.colors.map((color:string)=>(
                        <Colors key={color} style={{backgroundColor:color}}></Colors>
                    ))}
                    </ColorHolder>
                </DescHolder>
                </Link>
            </FieldWrapper>
        ))}
      </ProductsWrapper>
      <Pagination
        total={productsSneaker.length}
        limit={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  )
}

export default SneakerProduct
