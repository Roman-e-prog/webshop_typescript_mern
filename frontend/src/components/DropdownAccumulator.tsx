import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import styled from 'styled-components';
import {getAllProducts} from '../features/products/productsSlice';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';
import {small, middle} from '../responsive';
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
  border: 1px solid var(--fontColor);
  margin-right:4px;
`;
const DropdownAccumulator = (props:{c:any}) => {
    const dispatch = useAppDispatch();
    const allProducts = useAppSelector((state)=>state.products.allProducts);
    const [filteredProducts, setFilteredProducts] = useState<any>([]);
    console.log(filteredProducts);
    useEffect(()=>{
        dispatch(getAllProducts());
    },[dispatch])
    useEffect(()=>{
      if(allProducts.length){
        if(props.c === "KinderSale"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Kinder") && item.sale === true))
        }
        else if(props.c === "HerrenSale"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Herren") && item.sale === true))
        }
        else if(props.c === "DamenSale"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Damen") && item.sale === true))
        }
        else if(props.c === "SportSale"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Sport") && item.sale === true))
        }
        else if(props.c === "Herrenschuhe"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Herren")));
        }
        else if(props.c === "Damenschuhe"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Damen")));
        }
        else if(props.c === "Kinderschuhe"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Kinder")));
        }
        else if(props.c === "Nike"){
          setFilteredProducts(allProducts.filter((item)=>item.producer ==="Nike"));
        }
        else if(props.c === "Adidas"){
          setFilteredProducts(allProducts.filter((item)=>item.producer ==="Adidas"));
        }
        else if(props.c === "Puma"){
          setFilteredProducts(allProducts.filter((item)=>item.producer ==="Puma"));
        }
        else if(props.c === "Wanderschuhe"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Wanderschuhe")));
        }
        else if(props.c === "Hallenschuhe"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Hallenschuhe")));
        }
        else if(props.c === "Fußballschuhe"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Fussballschuhe") || item.categories.includes("Fußballschuhe") || item.title.includes("Fussballschuhe") || item.title.includes("Fußballschuhe")));
        }
        else if(props.c === "Laufschuhe"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Laufschuhe") || item.categories.includes("Joggingschuhe")));
        }
        else if(props.c === "KinderSportschuhe"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Kinder") && item.categories.includes("Sportschuhe")));
        }
        else if(props.c === "SneakerDamen"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Damen") && item.categories.includes("Sneaker")));
        }
        else if(props.c === "SneakerHerren"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Herren") && item.categories.includes("Sneaker")));
        }
        else if(props.c === "SneakerKinder"){
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Kinder") && item.categories.includes("Sneaker")));
        }
        else{
          setFilteredProducts(allProducts.filter((item)=>item.categories.includes(props.c)))
        }
      }
    },[allProducts, props])
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(12);
    const lastIndex = currentPage * productPerPage;
    const firstIndex = lastIndex - productPerPage;
    const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
  return (
    <Container>
        <ProductsWrapper>
        {currentProducts && currentProducts.map((item:any)=>(
            <FieldWrapper key={item._id}>
                <Link to={`/showProduct/${item._id}`} className="link" style={{color:"var(--fontColor)", width:"100%", cursor:"pointer"}} title="Produktanzeige">
                <ImgHolder>
                <img src={item.image} alt={item.categories} title={item.title}/>
                </ImgHolder>
                <DescHolder>
                    <h4>{item.title}</h4>
                    <p>{item.producer}</p>
                    <span>{item.price}{item.currency}</span>
                    <ColorHolder>
                    {item.colors.map((color:any)=>(
                        <Colors key={color} style={{backgroundColor:color}}></Colors>
                    ))}
                    </ColorHolder>
                </DescHolder>
                </Link>
            </FieldWrapper>
        ))}
      </ProductsWrapper>
      <Pagination
        total={filteredProducts.length}
        limit={productPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  )
}

export default DropdownAccumulator
