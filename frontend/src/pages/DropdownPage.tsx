import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import DropdownAccumulator from '../components/DropdownAccumulator';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {small,middle} from '../responsive';
import { productListMen } from '../data';
import { productListWomen } from '../data';
import { productListChild } from '../data';
import { productListNike } from '../data';
import { productListAdidas } from '../data';
import { productListPuma } from '../data';
import { productListWanderschuhe } from '../data';
import { productListHallenschuhe } from '../data';
import { productListFussballschuhe } from '../data';
import { productListLaufschuhe } from '../data';
const Container = styled.div`
    widht:100%;
`;
const ContentWrapper = styled.div`
  width:100%;
  display:flex;
`;
const SidebarWrapper = styled.div`
  flex:1;
`;
const ProductWrapper = styled.div`
  flex:4;
`;
const ProductList = styled.div`
  width:100%;
`;
const Title = styled.h2`
  font-size:30px;
  color:var(--fontColor);
  ${middle({fontSize:"20px"})};
  ${small({fontSize:"15px"})};
`;
const ProductCategory = styled.ul``;
const Li = styled.li`
  font-size:26px;
  margin: 10px;
  border-top: 1px solid var(--fontColor);
  ${middle({fontSize:"20px"})};
  ${small({fontSize:"15px", margin:"5px"})};
`;

const DropdownPage = () => {
    const [sidebar, setSidebar] = useState<object[]>([]);
    const {c} = useParams();
useEffect(()=>{
  if(c ==="Herrenschuhe"){
    setSidebar([...productListMen]);
  }
  else if(c ==="Damenschuhe"){
    setSidebar([...productListWomen]);
  }
  else if(c ==="Kinderschuhe"){
    setSidebar([...productListChild]);
  }
  else if(c ==="Nike"){
    setSidebar([...productListNike]);
  }
  else if(c ==="Adidas"){
    setSidebar([...productListAdidas]);
  }
  else if(c ==="Puma"){
    setSidebar([...productListPuma]);
  }
  else if(c ==="Laufschuhe"){
    setSidebar([...productListLaufschuhe]);
  }
  else if(c ==="Hallenschuhe"){
    setSidebar([...productListHallenschuhe]);
  }
  else if(c ==="Wanderschuhe"){
    setSidebar([...productListWanderschuhe]);
  }
  else if(c ==="Fußballschuhe"){
    setSidebar([...productListFussballschuhe]);
  }
  else{
    setSidebar([])
  }
},[c])
  return (
    <Container>
       <Navbar/>
      <Logo/>
      <ContentWrapper>
        <SidebarWrapper>
        <ProductList>
          {sidebar!.map((item:any)=>(
            <React.Fragment key={item.id}>
              <Title>{item.title}</Title>
              <ProductCategory>
                  {item.content.map((sP:string, index:number)=>(
                        <Li key={index}><Link to={{pathname:`/${c}/${sP.replace(/\s+/g, '')}`}} className="link" style={{color:"var(--fontColor)"}}>{sP}</Link></Li>
                    ))}
              </ProductCategory>
             </React.Fragment>
          ))}
      </ProductList>
        </SidebarWrapper>
        <ProductWrapper>
            <DropdownAccumulator
                c={c}
            />
        </ProductWrapper>
      </ContentWrapper>
      <Footer/>
    </Container>
  )
}

export default DropdownPage
