import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import Revenue from '../components/Revenue';
import Transactions from '../components/Transactions';
import UserInfo from '../components/UserInfo';
import { useEffect, useMemo} from 'react';

import {small} from '../responsive';
import TownTurnAround from '../components/TownTurnAround';
const Container = styled.div`
  width:100%;
`;
const Middle = styled.div`
  width:100%;
`;
const ZusatzInfos = styled.div`
  display:flex;
  ${small({flexDirection:"column"})}
`;
const Home:React.FC = () => {
  const selector = useAppSelector((state:RootState)=>state.auth);
  const dispatch = useAppDispatch()
  const {user} = selector;
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user?.isAdmin){
      navigate('/');
    }
  },[dispatch, user?.isAdmin, navigate])

const Month = useMemo(
  () => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ],
  []
);
  return (
    <Container>
      <Revenue
      month={Month}
      />
      <Middle>
        <TownTurnAround/>
      </Middle>
      <ZusatzInfos>
        <UserInfo/>
        <Transactions/>
      </ZusatzInfos>
    </Container>
  )
}

export default Home
