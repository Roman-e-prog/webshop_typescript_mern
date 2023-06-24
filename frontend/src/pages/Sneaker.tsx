import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import SidebarSneaker from '../components/SidebarSneaker';
import SneakerProduct from './products/SneakerProduct';
const Container = styled.div`
    width:100%;
`;
const TitleWrapper = styled.div`
  width:100%;
  margin-top:20px;
  display:flex;
  justify-content:center;
  margin-bottom:10px;
`;
const Title = styled.h1`
  font-size:26px;
  color:var(--fontColor);
`;
const ContentWrapper = styled.div`
  width:100%;
  display:flex;
`;
const SidebarWrapper = styled.div`
  flex:1;
`;
const ProductWrapper = styled.div`
  flex:4
`;
const Sneaker = () => {
  return (
    <Container>
      <Navbar/>
      <Logo/>
      <ContentWrapper>
        <SidebarWrapper>
          <SidebarSneaker/>
        </SidebarWrapper>
        <ProductWrapper>
            <TitleWrapper>
              <Title>Sneaker für alle</Title>
            </TitleWrapper>
            <SneakerProduct/>
        </ProductWrapper>
      </ContentWrapper>
      <Footer/>
    </Container>
  )
}

export default Sneaker
