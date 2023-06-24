import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAllProducts } from '../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import {small, middle} from '../responsive';
const Container = styled.div`
    width:100%;
`;
const HeadWrapper = styled.div`
    width:90%;
    margin:10px auto;
`;
const TitleWrapper = styled.div`
    width:100%;
    text-align:center;
`;
const Title = styled.h1`
    font-size:26px;
`;
const BackButtonWrapper = styled.div`
    width:100%;
    padding:20px;
`;
const BackButton = styled.button`
    background:var(--coffee);
    color:var(--white);
    border:none;
    cursor: pointer;
    padding:10px;
`;
const ContentWrapper = styled.div`
    width:90%;
    margin:0 auto;
    display:flex;
    flex-wrap:wrap;
`;
const FieldWrapper = styled.div`
  width:24%;
  margin:4px;
  display:flex;
  flex-direction:column;
  ${middle({width:"45%"})}
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
    border:1px solid var(--fontColor);
    margin-right:4px;
`;
const SecondaryPages = () => {
    const dispatch = useAppDispatch();
    const allProducts = useAppSelector((state)=>state.products.allProducts);
    const [filteredProducts, setFilteredProducts] = useState<any>([]);
    const {c, sP} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getAllProducts())
    },[dispatch])

    useEffect(()=>{
        if(sP === "KinderSportschuhe"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Kinder") && item.categories.includes("Sportschuhe")));
        }
        else if(sP === "Pumps"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Pumps")))
        }
        else if(sP === "Stiefel"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Damen") && item.categories.includes("Stiefel")));
        }
        else if(sP === "Espandrilles"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Damen") && item.categories.includes("Espandrilles")));
        }
        else if(sP === "Herrenstiefel"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Herren") && item.categories.includes("Stiefel")));
        }
        else if(sP === "Loafer"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Herren") && item.categories.includes("Loafer")));
        }
        else if(sP === "Business"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Herren") && (item.categories.includes("Business") || item.title.includes("Business"))));
        }
        else if(sP === "Slipper"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Herren") && item.categories.includes("Slipper")));
        }
        else if(sP === "Kleinkinderschuhe"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Kinder") && item.categories.includes("Kleinkinderschuhe")));
        }
        else if(sP === "Kinderstiefel"){
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes("Kinder") && item.categories.includes("Kinderstiefel")));
        }
        else if(c === "Fußballschuhe"){
            setFilteredProducts(allProducts.filter((item)=>(item.categories.includes("Fussballschuhe") || item.categories.includes("Fußballschuhe") || item.title.includes("Fussballschuhe") || item.categories.includes("Fußballschuhe")) && item.categories.includes(sP!)));
        }
        else{
            setFilteredProducts(allProducts.filter((item)=>item.categories.includes(sP!) && (item.categories.includes(c!) ||  item.producer === c)))
        }
    },[allProducts, c, sP])
  return (
    <Container>
         <Navbar/>
        <Logo/>
        <HeadWrapper>
            <TitleWrapper>
                <Title>Ihre Produktauswahl</Title>
            </TitleWrapper>
            <BackButtonWrapper>
                <BackButton onClick={()=>navigate(-1)}>Zurück</BackButton>
            </BackButtonWrapper>
        </HeadWrapper>
        <ContentWrapper>
            {filteredProducts.map((item:any)=>(
                 <FieldWrapper key={item._id}>
                <Link to={`/showProduct/${item._id}`} className="link" style={{color:"var(--fontColor)", width:"100%", cursor:"pointer"}} title="Produkt anzeigen">
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
                 </Link>
               </FieldWrapper>
            ))}
        </ContentWrapper>
        <Footer/>
      
    </Container>
  )
}

export default SecondaryPages
