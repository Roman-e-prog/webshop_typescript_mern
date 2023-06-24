import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { SalesPicture } from '../data';
const Container = styled.div`
    width:100%;
    vh:100%;
`;
const SalesWrapper = styled.div`
  width:50%;
  margin: 0 auto;
  display:flex;
  justify-content:space-around;
`;
const ImageHolder = styled.div`
  width: 100%;
`;
const TextHolder = styled.div`
  width: 100%;
  display:flex;
  align-items:center;
  justify-content:center;

  & p{
    font-size:30px;
    font-weight:600;
  }
`;
const Sale = () => {
  return (
    <Container>
        <Navbar/>
        <Logo/>
      <SalesWrapper>
      {SalesPicture.map((item)=>(
        <ImageHolder key={item.id}>
          <img src={item.img} alt={item.titel} title={item.titel}/>
        </ImageHolder>
      ))}
      <TextHolder>
        <p>Bitte wählen Sie die Angebote aus unserem Menü aus. Schuhe bis zu 50% reduzuiert</p>
      </TextHolder>
      </SalesWrapper>
      <Footer/>
    </Container>
  )
}

export default Sale
