import React from 'react'
import styled from 'styled-components';
import {FaShoePrints} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import {large, middle, small} from '../responsive'
const Container = styled.div`
    width:100%;
`;
const LogoWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    height:120px;
`;
const BorderOne = styled.div`
    width:50%;
    height:100px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-top: 2px solid var(--darkGray);
    border-bottom: 2px solid var(--darkGray);
`;
const BorderTwo = styled.div`
    width:90%;
    height:80px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-top: 2px solid var(--darkGray);
    border-bottom: 2px solid var(--darkGray);
`;
const CompanyLogo = styled.div`
    width:40%;
    display:flex;
    align-items:center;
    color:var(--coffee);
    ${middle({display:"none"})};
    & span{
        font-size:40px;
        font-weight:600;
        font-family:vivaldi;
        ${large({fontSize:"30px"})}
        
    }
    & #shoeprints{
        color:var(--coffee); 
        font-size:40px;
        font-weight:600;
        ${large({fontSize:"30px"})}
    }
`;
const CompanyName = styled.h1`
    color:var(--darkGray);
    font-size:40px;
    ${large({fontSize:"30px"})};
    ${middle({fontSize:"25px"})}
    ${small({fontSize:"20px"})}
`;
const Logo = () => {
  return (
    <Container>
        <Link to="/" className="link" style={{color:"var(--darkGray)"}} title="Zur Startseite">
        <LogoWrapper>
      <BorderOne>
        <BorderTwo>
            <CompanyLogo><span>R A R</span><FaShoePrints id="shoeprints"/></CompanyLogo>
            <CompanyName>R A R Schuhmode</CompanyName>
        </BorderTwo>
      </BorderOne>
      </LogoWrapper>
      </Link>
    </Container>
  )
}

export default Logo
