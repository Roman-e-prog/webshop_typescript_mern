import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import {small} from '../responsive';
const Container = styled.div`
    width:100%;
`;
const FormWrapper = styled.div`
  width:90%;
  margin: 0 auto;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  padding:10px;
`;
const SearchForm = styled.form`
  display:flex;
  align-items:center;
  width:40%;
  ${small({width:"100%"})}
`;
const SearchInput = styled.input`
  flex:3;
  height:40px;
  background:var(--white);
  padding:5px;
  border:none;
`;
const SearchButton = styled.button`
    flex:1;
    height:40px;
    background:var(--coffee);
    border:none;
    color:var(--white);
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
            <SearchInput type="text" name="search" id="search" placeholder='Ihre Lieblingsschuhe finden' defaultValue={innerValue} onChange={(e)=>setInnerValue(e.target.value)}/>
            <SearchButton>Suche</SearchButton>
        </SearchForm>
      </FormWrapper>
    </Container>
  )
}

export default Search
