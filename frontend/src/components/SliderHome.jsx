import React from 'react'
import styled from 'styled-components';
import {BsArrowRightCircle, BsArrowLeftCircle} from 'react-icons/bs'
import {useState, useEffect} from 'react';
import {small,middle} from '../responsive';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllSliderItems } from '../features/slideritems/sliderItemsSlice';
const Container = styled.div`
    width:100%;
    height:320px;
    ${middle({display:"none"})};
    ${small({display:"none"})};
`;
const SliderWrapper = styled.div`
    width:90%;
    margin:10px auto;
    height:100%;
`;
const TitleWrapper = styled.div`
    width:100%;
    margin-bottom:10px;
`;
const Title = styled.h2`
    font-size:26px;
    text-align:center;
`;
const ContentHolder = styled.div`
    width:100%;
    height:280px;
    position:relative;
    display:flex;
    overflow:hidden;
`;
const SliderIcon = styled.div`
    width:40px;
    height:40px;
    display:flex;
    font-size:30px;
    font-weight:600;
    color:var(--white);
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto;
    left:${(props)=>props.direction === "left" && "10px"};
    right:${(props)=>props.direction === "right" && "10px"};
    z-index:10;
`;
const SliderItem = styled.div`
    width:410px;
    height:100%;
    display:flex;
    transform:translateX(${props=>props.slideIndex * -410}px);
    transition: all 1s ease;
`;
const ImageHolder = styled.div`
    width:100%;
    height:100%;

    & img{
        width:410px;
        height:100%;
        object-fit:cover;
    }
`;
const SliderHome = () => {
    const dispatch = useAppDispatch();
    const allSliderItems = useAppSelector((state)=>state.sliderItems.allSliderItems);

    useEffect(()=>{
        dispatch(getAllSliderItems())
    },[dispatch])
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction)=>{
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : 0)
        } else{
            setSlideIndex(slideIndex < allSliderItems.length -4 ? slideIndex + 1 : allSliderItems.length -3)
        }
    }
  return (
    <Container>
      <SliderWrapper>
        <TitleWrapper>
            <Title>Neueste Trends der Saison</Title>
        </TitleWrapper>
        <ContentHolder>
            <SliderIcon direction="left" onClick={()=>handleClick("left")} title="links"><BsArrowLeftCircle style={slideIndex === 0 ?{opacity:"0.5"}: {opacity:"1"}}/></SliderIcon>
            <SliderItem slideIndex={slideIndex}>
                {allSliderItems && allSliderItems.map((item)=>(
                    <ImageHolder key={item._id}>
                        <img src={item.img} alt={item.alt} title={item.title}/>
                    </ImageHolder>
                ))}
            </SliderItem>
            <SliderIcon direction="right" onClick={()=>handleClick("right")} title="rechts"><BsArrowRightCircle style={slideIndex === allSliderItems.length -3 ?{opacity:"0.5"}: {opacity:"1"}}/></SliderIcon>
        </ContentHolder>
      </SliderWrapper>
    </Container>
  )
}

export default SliderHome

