import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Wrapper = styled.div`
    width:400px;
    height:400px;
    border: 1px solid var(--coffee);
    display:flex;
    flex-direction:column;
    padding:20px;
`;
const Content = styled.div`
  width:100%;
  padding:5px;
  display:flex;
  align-items:center;
  justify-content:center;

  & span{
    font-size:26px;
  }
`;
const ButtonWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-around;
    margin-top:10px;
    padding:5px;
`;
const LoginButton = styled.button`
    background:var(--coffee);
    color:var(--white);
    padding:10px;
    border:none;
    cursor: pointer;
`;
const HomeButton = styled.button`
    background:green;
    color:var(--white);
    padding:10px;
    border:none;
    cursor: pointer;
`;
const CartProtect = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
        <span>Sie müssen sich einloggen, um Ihren Einkaufswagen oder Ihre Wunschliste verwenden zu können.</span>
        </Content>
        <ButtonWrapper>
        <HomeButton><Link to="/" className='link' id="whiteLink" title="Zur Startseite">Startseite</Link></HomeButton>
        <LoginButton><Link to="/login" className='link' id="whiteLink" title="Einloggen">Einloggen</Link></LoginButton>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  )
}

export default CartProtect
