import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import { getAllCartdata } from '../features/cartdata/cartSlice';
import {small,middle} from '../responsive';
const Container = styled.div`
  width:100%;
`;
const TableWrapper = styled.div`
  width:100%;
`;
const Table = styled.table`
  width:90%;
  margin: 0 auto;

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
        ${small({fontSize:"12px", marginRight:"2px", padding:"1px"})}
    }
    & .clientNumber{
      ${middle({display:"none"})}
    }
    & #btn{
        border:none;
    }
    & button{
        padding:2px;
        background:var(--coffee);
        color:var(--white);
        cursor: pointer;
        border:none;
        margin-left:10px;
    }
`;
const Transactions = () => {
  const dispatch = useAppDispatch();
  const allCartdata = useAppSelector((state)=>state.cartdata.allCartdata);
 

useEffect(()=>{
  dispatch(getAllCartdata())
},[dispatch])

const sorteddata = [...allCartdata].sort((a,b)=>a.createdAt > b.createdAt ? -1 : 1)
//Pagination
const [currentPage, setCurrentPage] = useState(1);
const [transactionsPerPage] = useState(20);
const lastIndex = currentPage * transactionsPerPage;
const firstIndex = lastIndex - transactionsPerPage;
const currentTransaction = sorteddata.slice(firstIndex, lastIndex);
//search
const [searchValue, setSearchValue] = useState('');
const filteredTransaction = sorteddata.filter((item)=>{
  return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
}).slice(firstIndex, lastIndex);
  return (
    <Container>
      <Search callback={(searchValue:string)=>setSearchValue(searchValue)}/>
        <TableWrapper style={{overflowX:"auto"}}>
          <Table>
                <thead>
                    <tr>
                        <th>Kundenname</th>
                        <th>Email</th>
                        <th className="clientNumber">Kundennummer</th>
                        <th>Stadt</th>
                        <th>Umsatz</th>
                    </tr>
                </thead>
                <tbody>
                        {filteredTransaction ? filteredTransaction.map((item:any)=>(
                          <tr key={item._id}>
                            <td>{item.user.nachname}</td>
                            <td>{item.user.email}</td>
                            <td className="clientNumber">{item.user._id}</td>
                            <td>{item.user.city}</td>
                            <td>{item.netto} €</td>
                          </tr> 
                        ))
                        : currentTransaction.map((item:any)=>(
                            <tr key={item._id}>
                            <td>{item.user.vorname} {item.user.nachname}</td>
                            <td>{item.user.email}</td>
                            <td className="clientNumber">{item.user._id}</td>
                            <td>{item.user.city}</td>
                            <td>{item.netto} €</td>
                            </tr>
                            ))}
                </tbody>
            </Table>
          </TableWrapper>
        <Pagination
          total={sorteddata.length}
          limit={transactionsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </Container>
  )
}

export default Transactions
