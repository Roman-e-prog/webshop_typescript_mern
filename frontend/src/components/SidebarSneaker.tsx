import React from 'react'
import styled from 'styled-components'
import { productListSneaker } from '../data';
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

const SidebarSneaker:React.FC = () => {
  return (
    <Container>
      <ProductList>
        {productListSneaker.map((item)=>(
          <div key={item.id}>
          <Title>{item.title}</Title>
            <ProductCategory>
                {productListSneaker[0].content.map((c:string)=>(
                    <Li key={c}><Link to={{pathname:`/${c.replace(/\s+/g, '')}`}} className="link" id="blackLink" title={c}>{c}</Link></Li>
                ))}
            </ProductCategory>
            </div>
        ))}
      </ProductList>
    </Container>
  )
}

export default SidebarSneaker
