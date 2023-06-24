import React  from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:90%;
    margin:10px auto
`;
const PaginationBar = styled.ul`
    display:flex;
`;
const PaginationItem = styled.li`
  border: 1px solid var(--coffee);
  min-width:30px;
  display:flex;
  justify-content:center;
  align-items:center;
`;
const PaginationButton = styled.li`
  background: var(--coffee);
  color:var(--white);
  margin: 0 5px;
  padding:2px;
`;

const Pagination = (props:{total:number, limit:number,setCurrentPage:React.Dispatch<React.SetStateAction<number>>, currentPage:number}) => {
    const pages = [];
    const totalPages = Math.ceil(props.total/props.limit);
    for(let i = 1; i <=totalPages; i++){
        pages.push(i);
    }
  return (
    <Container>
      <PaginationBar style={{overflowX:"auto"}}>
        <PaginationButton onClick={()=>props.setCurrentPage(props.currentPage-1)}>Zurück</PaginationButton>
        {pages.map((item)=>(
          //eslint-disable-next-line
            <PaginationItem key={item} onClick={()=>props.setCurrentPage(item)} className={item == props.currentPage ? "active" : ""}>{item}</PaginationItem>
        ))}
        <PaginationButton onClick={()=>props.setCurrentPage(props.currentPage+1)}>Vor</PaginationButton>
      </PaginationBar>
    </Container>
  )
}

export default Pagination
