import React, {useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {getAllUser} from '../features/user/userSlice'
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import {small, middle} from '../responsive';
const Container = styled.div`
    flex:1;
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
    align-items:center;
    flex-direction:column;

    & div{
    display:flex;
    align-items:center;
    }
`;
const Table = styled.table`
  width:100%;
  & thead, tbody{
    width:100%;
  }
  & th{
    text-align:center;
    margin-bottom:5px
  }
  & td{
    text-align:left;
    margin-top:5px;
  }
  & #btn{
    text-align:center
  }
  & .city{
    ${small({display:"none"})}
  }
`;
const ShowButton = styled.button`
    background: var(--coffee);
    color:var(--white);
    padding:5px;
    border:none;
    font-size:10px;
`;
const UserInfo = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state:RootState)=>state.user);
  const {allUser, isLoading, isError, message} = selector;
  const initFetch = useCallback(()=>{
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(()=>{
    if(isError){
      window.alert(message)
    }
    initFetch();
  }, [initFetch, isError, message]);
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <Title>Neue Benutzer</Title>
      <ContentWrapper>
          <Table>
            <thead>
            <tr>
                <th>Kundename</th>
                <th className="city">Stadt</th>
                <th>Kundendaten</th>
              </tr>
              </thead>
              <tbody>
               {allUser && allUser.map((item)=>(
                <tr key={item._id}>
                  <td>{item.nachname}</td>
                  <td className="city">{item.city}</td>
                  <td id="btn"><ShowButton><Link to={`/showUser/${item._id}`} className="link" style={{color:"var(--white)", display:"block"}} title="Benutzer anzeigen">Benutzer anzeigen</Link></ShowButton></td>
                </tr>
               ))}
            
            </tbody>
          </Table>
          
       
       
      </ContentWrapper>
    </Container>
  )
}

export default UserInfo; 
