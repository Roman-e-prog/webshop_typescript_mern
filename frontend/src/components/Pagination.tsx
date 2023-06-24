import React from 'react';
import styled from 'styled-components';
import {small} from '../responsive'
const Container = styled.div`
    width:90%;
    margin:10px auto
`;
const PaginationBar = styled.ul`
    display:flex;
    align-items:center;
    margin-top:50px;
`;
const PaginationItem = styled.li`
  width:50px;
  height:50px;
  border: 1px solid var(--coffee);
  border-radius:50%;
  margin-right:5px;
  display:flex;
  justify-content:center;
  align-items:center;
  ${small({width:"30px", height:"30px"})}
`;
const PaginationButton = styled.li`
  width:60px;
  height:60px;
  background: var(--coffee);
  border-radius:50%;
  color:var(--white);
  margin: 0 10px;
  padding:2px;
  display:flex;
  justify-content:center;
  align-items:center;
  ${small({width:"45px", height:"45px", fontSize:"14px"})}
`;
const Pagination = (props:{total:number, limit:number,setCurrentPage:React.Dispatch<React.SetStateAction<number>>, currentPage:number}) => {
    const pages = [];
    const totalPages = Math.ceil(props.total/props.limit);
    for(let i = 1; i <=totalPages; i++){
        pages.push(i);
    }
  return (
    <Container>
      <PaginationBar>
        <PaginationButton onClick={()=>props.setCurrentPage(props.currentPage-1)} title="Zurück">Zurück</PaginationButton>
        {pages.map((item)=>(
          //eslint-disable-next-line
            <PaginationItem key={item} onClick={()=>props.setCurrentPage(item)} className={item == props.currentPage ? "active" : ""}>{item}</PaginationItem>
        ))}
        <PaginationButton onClick={()=>props.setCurrentPage(props.currentPage+1)} title="Vor">Vor</PaginationButton>
      </PaginationBar>
    </Container>
  )
}

export default Pagination
