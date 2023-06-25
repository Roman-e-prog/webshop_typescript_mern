import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import {markenLogo} from '../data';
import {small} from '../responsive';
const Container = styled.div`
    width:100%;
    vh:100%;
`;
const MarkenContainer = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
`;
const MarkenWrapper = styled.div`
  width:30%;
  margin:0 5px;
  ${small({width:"100%"})}
  & img{
    width:100%;
    height:50vh;
  }
`;
const Marken = () => {
  return (
    <Container>
        <Navbar/>
        <Logo/>
        <MarkenContainer>
          {markenLogo.map((item)=>(
            <MarkenWrapper key={item.id}>
              <img src={item.img} alt={item.titel} title={item.titel}/>
            </MarkenWrapper>
          ))}
        </MarkenContainer>
      <Footer/>
    </Container>
  )
}

export default Marken
