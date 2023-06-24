import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector} from '../app/hooks';
import { getAllCartdata } from '../features/cartdata/cartSlice';
import {small, middle} from '../responsive';
const Container = styled.div`
    flex:2;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const Title = styled.h3`
    font-size:26px;
    margin-bottom:10px;
    ${small({fontSize:"16px"})}
    ${middle({fontSize:"16px"})}
`;
const ContentWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
`;
const DataTable = styled.table`
    width:80%;
    ${small({width:"100%"})}
    & th,td {
        text-align:center;
    }
    & .netto{
      display:flex;
      & span{
        width:80%;
        display:flex;
        justify-content:flex-end;
      }
    }
    & button{
        background:var(--coffee);
        color:var(--white);
        font-size:10px;
        padding:5px;
        border:none;
        cursor: pointer;
    }
    & .netto{
    }
`;
const Transactions = () => {
  const dispatch = useAppDispatch();
  const allCartdata = useAppSelector((state)=>state.cartdata.allCartdata);
 

useEffect(()=>{
  dispatch(getAllCartdata())
},[dispatch])

const sorteddata = [...allCartdata].sort((a,b)=>a.createdAt > b.createdAt ? -1 : 1)

  return (
    <Container>
      <Title>Neueste Transaktionen</Title>
      <ContentWrapper>
        <DataTable>
          <thead>
              <tr>
                  <th>KUNDE</th>
                  <th>DATUM</th>
                  <th>UMSATZ</th>
              </tr>
              </thead>
              <tbody>
                {
                  sorteddata.map((item:any)=>(
                    <tr key={item._id}>
                      <td>{item.user.nachname}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString("de-De",{
                        day:'2-digit',
                        month:'2-digit'
                      })}</td>
                      <td className="netto"><span>{item.netto}</span> €</td>
                    </tr>
                  ))
                }
              </tbody>
            
        </DataTable>
      </ContentWrapper>
    </Container>
  )
}

export default Transactions
