import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getTownAnalyse } from '../features/orderdata/orderdataSlice';
import {small, middle} from '../responsive';
const Container = styled.div``;
const TitleWrapper = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Title = styled.h2`
  font-size:26px;
  margin-bottom:20px;
  ${middle({fontSize:"20px"})}
`;
const ContentWrapper = styled.div`
  width:100%;
  margin: 0 5px;
  padding:20px;
  display:flex;
  align-items:center;
  justify-content:space-around;
  ${small({flexDirection:"column",padding:"0px", margin:"0px"})}

`;
const TurnAroundPerTown = styled.div`
  width:30%;
  min-height:200px;
  padding:5px;
  box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
  -webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
  -moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
  ${small({width:"95%"})}
  
  & span{
    margin: 10px 5px;
    font-size:20px;
    ${middle({fontSize:"16px"})}
  }
`;
const FieldWrapper = styled.div`
  padding:10px;
`;
const UserPerTown = styled.div`
width:30%;
min-height:200px;
padding:5px;
box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
${small({width:"95%"})}

& span{
  margin:10px 5px;
  font-size:20px;
  ${middle({fontSize:"16px"})}
}
`;
const Clock = styled.div`
  width:30%;
  height:200px;
  padding:10px;
  background:var(--coffee);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
  -webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
  -moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
  ${small({width:"95%"})}
`;
const Datum = styled.div`
  color:var(--white);
  font-size:26px;
  margin:0 5px;
  ${middle({fontSize:"16px", margin:"0 2px"})}
`;
const Time = styled.div`
  color:var(--white);
  font-size:26px;
  margin:0 5px;
  ${middle({fontSize:"16px" , margin:"0 2px"})}
`;
const TownTurnAround = () => {
    const dispatch = useAppDispatch();
    const townData = useAppSelector((state)=>state.orderdata.townAnalyse);
    useEffect(()=>{
        dispatch(getTownAnalyse());
    },[dispatch]);
    const sortedNetto = [...townData].sort((a,b)=>a.totalNetto < b.totalNetto ? 1:-1);
    const sortedUser = [...townData].sort((a,b)=>a.userCount < b.userCount ? 1 :-1);
    //clock
    const [date, setDate] = useState(new Date());
    useEffect(()=>{
      const interval = setInterval(
        ()=>{
          setDate(new Date())
        },1000
      )
      return ()=>{
        clearInterval(interval)
      }
    },[])
  return (
    <Container>
      <ContentWrapper>
        <Clock>
          <Datum>
            {date.toLocaleDateString(("de-De"), {
              weekday:"long",
              day:"numeric",
              month:"numeric",
              year:"numeric"
            })}
          </Datum>
          <Time>
            {date.toLocaleTimeString(("de-De"),{
              hour:"numeric",
              minute:"numeric",
            })}
          </Time>
        </Clock>
        <TurnAroundPerTown>
          <TitleWrapper>
            <Title>Umsatzstärkste Städte</Title>
          </TitleWrapper>
          <FieldWrapper>
            {sortedNetto.map((item, index)=>(
              <div key={index}>
                <h3>{item._id.plz} {item._id.city}</h3>
                  <span>{item.totalNetto} €</span>
                </div>
            ))}
            </FieldWrapper>
        </TurnAroundPerTown>
        <UserPerTown>
          <TitleWrapper>
            <Title>Städte Nutzeraktivität</Title>
          </TitleWrapper>
          <FieldWrapper>
            {sortedUser.map((item, index)=>(
              <div key={index}>
                <h3>{item._id.plz} {item._id.city}</h3>
                  <span>{item.userCount}</span>
                </div>
            ))}
            </FieldWrapper>
        </UserPerTown>
      </ContentWrapper>
    </Container>
  )
}

export default TownTurnAround
