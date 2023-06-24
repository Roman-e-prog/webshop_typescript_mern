import React from 'react'
import styled from 'styled-components';
import {HiOutlinePhone, HiOutlineMail} from 'react-icons/hi';
import {SiPointy,SiIndeed} from 'react-icons/si';
import {FiFacebook, FiInstagram, FiYoutube} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {small} from '../responsive';
const Container = styled.div`
    width:100%;
    margin-top:10px;
    background:var(--coffee);
    color:var(--white);
    display:flex;
    flex-direction:column;

    & h5{
        font-size:200;
        margin-bottom:4px;
    }
    & li{
        margin:2px 0;
    }
`;
const MenuWrapper = styled.div`
    width:100%;
    display:flex;
    ${small({flexDirection:"column"})};
`;
const ClientService = styled.div`
    flex:1;
    padding:10px;
`;
const Settlement = styled.div`
    flex:1;
    padding:10px;
`;
const Help = styled.div`
    flex:1;
    padding:10px;
`;
const CompanyDesc = styled.div`
    flex:1;
    padding:10px;
`;
const SocialWrapper = styled.div`
    width:100%;
    display:flex;
`;
const LegalContainer = styled.div`
    flex:1;
    padding:10px;
`;
const SocialContainer = styled.div`
    flex:2;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    & #title{
        margin-bottom:4px;
    }
    & .buttons{
      font-size:30px; 
      margin-left:10px;
      cursor:pointer;
    }
`;
const Footer = () => {
  return (
    <Container>
      <MenuWrapper>
      <ClientService>
      <h5>Kundenservice</h5>
      <ul>
        <li>Mo - Fr 8:00 Uhr - 20:00 Uhr</li>
        <li>Sa 8:00 Uhr -16:00 Uhr</li>
        <li><HiOutlinePhone/> 0800123456</li>
        <li><HiOutlineMail/> info@rar.com</li>
      </ul>
      </ClientService>
      <Settlement>
      <h5>Filialfinder</h5>
      <ul>
        <li><SiPointy/> Filiale in der Nähe(Fake)</li>
      </ul>
      </Settlement>
      <Help>
      <h5>Hilfe</h5>
      <ul>
        <li>Artikel zurücksenden</li>
        <li>Bestellung</li>
        <li>Zahlung</li>
        <li>Mein Konto</li>
        <li>Rückgabe & Rückerstattung</li>
        <li>Lieferung und Versand</li>
      </ul>
      </Help>
      <CompanyDesc>
      <h5>Über RAR Schuhe</h5>
      <ul>
        <li>Unternehmen</li>
        <li>Karriere</li>
        <li>Presse</li>
        <li>Partnerprogramm</li>
        <li>Filialliste</li>
      </ul>
      </CompanyDesc>
      </MenuWrapper>
      <SocialWrapper>
        <LegalContainer>
        <h5>Rechtliche Hinweise</h5>
      <ul>
        <li><Link to="/impressum" id="whiteLink" className="link" title="Imprssum">Impressum</Link></li>
        <li><Link to="/datenschutz"  id="whiteLink" className="link" title="Datenschutz">Datenschutz</Link></li>
        <li><Link to="/agb"  id="whiteLink" className="link" title="AGB">AGB</Link></li>
      </ul>
        </LegalContainer>
        <SocialContainer>
            <div id="title">
                <h5>Folgen Sie uns auf:</h5>
            </div>
            <div id="icons">
                <FiFacebook className="buttons"/>
                <FiInstagram  className="buttons"/>
                <FiYoutube  className="buttons"/>
                <SiIndeed  className="buttons"/>
            </div>
        </SocialContainer>
      </SocialWrapper>
    </Container>
  )
}

export default Footer
