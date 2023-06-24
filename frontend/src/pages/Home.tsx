import React from 'react'
import styled from "styled-components";
import DescriptionModul from '../components/DescriptionModul';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ShoppingModul from '../components/ShoppingModul';
import SliderHome from '../components/SliderHome';
import SneakerModul from '../components/SneakerModul';
import CookieConsent from 'react-cookie-consent';
const Container = styled.div`
    width:100%;
    background:var(--white);
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Navbar/>
      <Logo/>
      <ShoppingModul/>
      <SneakerModul/>
      <DescriptionModul/>
      <SliderHome/>
      <Newsletter/>
      <Footer/>
      <CookieConsent
         location="bottom"
         buttonText="Akzeptieren"
         cookieName="myAwesomeCookieName2"
         style={{ background: "var(--darkGray)" }}
         buttonStyle={{ background:"var(--coffee)", color: "var(--white)", fontSize: "13px" }}
         expires={150}
      >Diese Webseite verwendet Cookies.</CookieConsent>
    </Container>
  )
}

export default Home
