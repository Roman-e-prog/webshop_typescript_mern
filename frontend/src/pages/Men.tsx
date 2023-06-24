import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import MenProduct from './products/MenProduct';
import SidebarMen from '../components/SidebarMen';
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
const Men = () => {
  return (
    <Container>
      <Navbar/>
      <Logo/>
      <ContentWrapper>
        <SidebarWrapper>
          <SidebarMen/>
        </SidebarWrapper>
        <ProductWrapper>
            <TitleWrapper>
              <Title>Schuhe für Herren</Title>
            </TitleWrapper>
            <MenProduct/>
        </ProductWrapper>
      </ContentWrapper>
      <Footer/>
    </Container>
  )
}

export default Men
