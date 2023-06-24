import React,{useEffect} from 'react'
import styled from 'styled-components'
import {useAppDispatch, useAppSelector} from '../app/hooks';
import { getAllQuantity } from '../features/cartdata/cartSlice';
import { getIncome } from '../features/orderdata/orderdataSlice';
import {small} from '../responsive';
const Container = styled.div`
  width:100%;
`;
const RennerWrapper = styled.div`
  width:100%;
`;
const IncomeWrapper = styled.div`
  width:100%;
  margin-top:20px;
`;
const TitleWrapper = styled.div`
  width:90%;
  margin: 0 auto;
`;
const Title = styled.h2``;
const Datatable = styled.table`
    width:90%;
    margin: 10px auto;

    & thead{
        background:var(--coffee);
        color:var(--white);
    }
    & th{
        margin-right:5px;
        text-align:center;
        font-weight:400;
        ${small({fontSize:"12px"})}
    }
    & td{
        border: 1px solid var(--coffee);
        margin-right:5px;
        text-align:left;
        padding:2px;
        ${small({fontSize:"12px"})}
    }
`;
const Reports = () => {
  const dispatch = useAppDispatch();
  const allQuantity = useAppSelector((state)=>state.cartdata.quantity);
  const income = useAppSelector((state)=>state.orderdata.income);


useEffect(()=>{
  dispatch(getAllQuantity())
},[dispatch]);
const sortedQuantity = [...allQuantity].sort((a,b)=>a.total! < b.total! ? 1 :-1);

useEffect(()=>{
  dispatch(getIncome())
},[dispatch]);
const sortedIncome = [...income].sort((a:any, b:any)=> a._id.month < b._id.month? 1:-1);
  return (
    <Container>
      <RennerWrapper>
        <TitleWrapper>
          <Title>Meist Verkauft</Title>
        </TitleWrapper>
          <Datatable>
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Größe</th>
              <th>Farbe</th>
              <th>Stückzahl</th>
            </tr>
          </thead>
          <tbody>
            {sortedQuantity.map((item:any, index)=>(
              <tr key={index}>
                <td>{item._id.title}</td>
                <td>{item._id.size}</td>
                <td>{item._id.color}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </Datatable>
      </RennerWrapper>
      <IncomeWrapper>
        <TitleWrapper>
          <Title>Tagesumsätze</Title>
        </TitleWrapper>
        <Datatable>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Netto</th>
            </tr>
          </thead>
          <tbody>
            {sortedIncome.map((item:any, index)=>(
              <tr key={index}>
                <td>{item._id.day}.{item._id.month}.{item._id.year}</td>
                <td>{item.total} €</td>
              </tr>
            ))}
          </tbody>
        </Datatable>
      </IncomeWrapper>
    </Container>
  )
}

export default Reports
