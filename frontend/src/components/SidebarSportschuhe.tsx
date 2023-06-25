import React from 'react'
import styled from 'styled-components'
import { productListSportschuhe } from '../data';
import { Link } from 'react-router-dom';
import {small, middle} from '../responsive';
const Container = styled.div`
    width:100%;
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

const SidebarSportschuhe:React.FC = () => {
  return (
    <Container>
      <ProductList>
        {productListSportschuhe.map((item)=>(
          <>
          <Title key={item.id+'title'}>{item.title}</Title>
            <ProductCategory key={item.id+'category'}>
                {productListSportschuhe[0].content.map((c:string, index)=>(
                    <Li key={index}><Link to={{pathname:`/${c.replace(/\s+/g, '')}`}} className="link" id="blackLink" title={c}>{c}</Link></Li>
                ))}
            </ProductCategory>
            </>
        ))}
      </ProductList>
    </Container>
  )
}

export default SidebarSportschuhe
