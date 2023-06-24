import React from 'react';
import styled from 'styled-components';
import { cardsImages } from '../data';
import {Link} from 'react-router-dom';
import {small, middle} from '../responsive';
const Container = styled.div`
    width:100%;
    height:600px;
    ${middle({height:"400px"})};
`;
const ShoppingWrapper = styled.div`
    width:90%;
    height:50vh;
    margin:40px auto;
    display:flex;
    flex-direction:column;
    ${small({margin:"0 auto"})};
`;
const TitleWrapper = styled.div`
    width:100%;
    height:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:10px;
`;
const Title = styled.h2`
    color:var(--fontColor);
    font-size:26px;
    ${small({fontSize:"20px"})}
`;
const CardsWrapper = styled.article`
    width:100%;
    height:80vh;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    & h3{
        display:none;
    }
`;
const Fotos = styled.section`
    width:33.33%;
    height:100%;
    position:relative;
    cursor: pointer;
    & img{
        width:100%;
        height:100%;
        object-fit:cover;
    }

    & div{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        display:flex;
        align-items:end;
        justify-content:center;

        & span{
            color:var(--white);
            font-size:26px;
            margin-bottom:20px;
        }
    }
`;
const ShoppingModul = () => {
  return (
    <Container>
      <ShoppingWrapper>
        <TitleWrapper>
            <Title>Für wen möchten Sie shoppen?</Title>
        </TitleWrapper>
        <CardsWrapper>
            <h3>Produkt Kategorien</h3>
           {cardsImages.map((item)=>(
            <Fotos key={item.id}>
                <Link to={{pathname:`/${item.title}`}} id="whiteLink" className="link" title={item.title}>
                <img src={item.img} alt={item.name} title={item.title}/>
                <div>
                    <span>{item.name}</span>
                </div>
                </Link>
            </Fotos>
           ))}
        </CardsWrapper>
      </ShoppingWrapper>
    </Container>
  )
}

export default ShoppingModul
