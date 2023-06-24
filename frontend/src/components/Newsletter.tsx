import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {small, middle} from '../responsive';
const Container = styled.div`
    width:100%;
    height:350px;
`;
const NewsletterWrapper = styled.article`
    width:90%;
    margin:10px auto;
    height:100%;
    background-repeat:no-repeat;
    background-size:cover;
    display:flex;
    align-items: center;
    justify-content:flex-end;
`;
const InputWrapper = styled.div`
    width:40%;
    height:250px;
    background: var(--white);
    opacity:0.8;
    margin-right:20px;
    padding:20px;
    ${small({width:"90%", height:"250px", opacity:"0.75"})}

    & h3{
      font-size:26px;
      margin-bottom:10px;
    }
    & p{
      font-size:20px;
      margin-bottom:40px;
      ${middle({marginBottom:"20px"})}
    }
    & button{
      font-size:20px;
      border:none;
    }
`;
const Newsletter = () => {
  return (
    <Container>
      <NewsletterWrapper style={{backgroundImage:"url(/img/family.jpeg)"}}>
        <InputWrapper>
        <h3>Jetzt nichts mehr verpassen</h3>
        <p>Sichern Sie sich mit der Bestellung unseres Newsletters bis zu 10% Rabatt.</p>
        <button type="button" title="Newsletter bestellen"><Link to="/newsletterForm" id="blackLink">Jetzt bestellen</Link></button>
        </InputWrapper>
      </NewsletterWrapper>
    </Container>
  )
}

export default Newsletter
