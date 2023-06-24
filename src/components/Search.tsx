import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
const Container = styled.div`
    width:100%;
`;
const FormWrapper = styled.div`
  width:90%;
  margin: 0 auto;
  background:var(--coffee);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:10px;
`;
const SearchForm = styled.form`
  display:flex;
  align-items:center;
  width:60%;
`;
const SearchInput = styled.input`
  width:70%;
  height:40px;
  background:var(--white);
  padding:5px;
  border:none;
`;
const SearchButton = styled.button`
    width:30%;
    height:40px;
    background:var(--darkGray);
    border:none;
    color:var(--fontColor);
    cursor:pointer;
`;
const Search = (props:{callback:Function}) => {
    const [innerValue, setInnerValue]= useState("");
  
    const onSubmit = (e:React.FormEvent)=>{
      e.preventDefault();
      props.callback(innerValue);
    }
  return (
    <Container>
      <FormWrapper>
        <SearchForm onSubmit={onSubmit}>
            <SearchInput type="text" name="search" id="search" placeholder='Suche' defaultValue={innerValue} onChange={(e)=>setInnerValue(e.target.value)}/>
            <SearchButton>Go</SearchButton>
        </SearchForm>
      </FormWrapper>
    </Container>
  )
}

export default Search
