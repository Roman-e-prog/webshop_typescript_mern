import React from 'react'
import styled from 'styled-components';
import {FaShoePrints} from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {AiOutlineLogout} from 'react-icons/ai'
import { logout, reset } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import {persistStore} from 'redux-persist'
import { store } from '../app/store';
import {small, middle} from '../responsive';
const persistor = persistStore(store);
const Container = styled.nav`
    width:100%;
    height:80px;
    position:sticky;
    top:0;
    z-index:99;
    display:flex;
    background:var(--coffee);
    display:flex;
    padding:20px;
    margin-bottom:10px;
`;
const Logo = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  color:var(--white);
  font-size:30px;
  ${middle({fontSize:"20px"})}

  & span{
    font-family:vivaldi;
    ${small({fontSize:"12px"})}
  }
  & h2{
    margin-left:20px;
    ${small({fontSize:"12px", marginLeft:"4px"})}
  }
`;
const Greeting = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  color:var(--white);
  font-size:30px;
  ${middle({fontSize:"20px"})}
  ${small({fontSize:"12px", marginLeft:"4px"})}
`;
const Menue = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  justify-content: flex-end;
  color:var(--white);
  font-size:30px;
`;

const Navbar:React.FC = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state:RootState)=>state.auth);
  const navigate = useNavigate();
  const {user} = selector;
  const onLogout = ()=>{
    dispatch(logout());
    dispatch(reset());
    persistor.purge();
    navigate('/');
  }
  return (
    <Container>
      <Logo>
        <span>RAR</span>
        <FaShoePrints/>
        <h2>Dashboard</h2>
      </Logo>
      <Greeting>{`Hallo ${user!.username}`}</Greeting>
      <Menue>
        {user && <AiOutlineLogout style={{color:"var(--white)", fontWeight:"600", marginRight:"20px", fontSize:"26px"}} onClick={onLogout} title="Logout"/>}
      </Menue>
    </Container>
  )
}

export default Navbar
