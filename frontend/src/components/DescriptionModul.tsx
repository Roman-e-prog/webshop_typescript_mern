import React,{useEffect} from 'react'
import styled from 'styled-components';
import {small, middle} from '../responsive';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import { getAllDescriptionItem } from '../features/descriptionItems/descriptionItemsSlice';
const Container = styled.div`
    width:100%;
`;
const Article = styled.article`
    width:90%;
    margin:10px auto;
`;
const TitleWrapper = styled.div`
    margin-bottom:10px;
`;
const Title = styled.h2`
    font-size:26px;
    text-align:center;
`;
const SectionWrapper = styled.div`
    margin-bottom:10px;
`;
const Section = styled.section``;
const SectionTitle = styled.h3`
    font-size:26px;
    margin-bottom:5px;
    ${middle({fontSize:"20px"})}
    ${small({fontSize:"20px"})}
`;
const DescriptionModul = () => {
    const dispatch = useAppDispatch();
    const descriptionItems = useAppSelector((state)=>state.descriptionItems.allDescriptionItems);
    useEffect(()=>{
        dispatch(getAllDescriptionItem())
    },[dispatch])
  return (
    <Container>
        <Article>
            <TitleWrapper>
                <Title>Schuhmode zum günstigen Preis R A R-Onlineshop</Title>
            </TitleWrapper>
            {descriptionItems.map((item)=>(
                <SectionWrapper key={item._id}>
                    <SectionTitle>{item.title}</SectionTitle>
                    <Section>{item.text}</Section>
                </SectionWrapper>
            ))}
        </Article>
    </Container>
  )
}

export default DescriptionModul
