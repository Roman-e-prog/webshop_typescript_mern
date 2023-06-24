import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import SidebarSportschuhe from '../components/SidebarSportschuhe';
import SportschuheProduct from './products/SportschuheProduct';
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
const Sportschuhe = () => {
  return (
    <Container>
      <Navbar/>
      <Logo/>
      <ContentWrapper>
        <SidebarWrapper>
          <SidebarSportschuhe/>
        </SidebarWrapper>
        <ProductWrapper>
            <TitleWrapper>
              <Title>Sportschuhe</Title>
            </TitleWrapper>
            <SportschuheProduct/>
        </ProductWrapper>
      </ContentWrapper>
      <Footer/>
    </Container>
  )
}

export default Sportschuhe
