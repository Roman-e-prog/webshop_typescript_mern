import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { sneakerImage } from '../data';
import {small} from '../responsive';
 const Container = styled.div`
 width:100%;
 height:300px;
 `;
  const SneakerWrapper = styled.div`
  width:100%;
  height:300px;
  `;
   const Foto = styled.div`
   width:90%;
   height:250px;
   margin:10px auto;
   position:relative;
   ${small({margin:"0 auto", height:"300px"})};
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
        
            & span{
                display:flex;
                flex-direction:column;
                padding:40px;
                & h3{
                    color:var(--white);
                    font-size:26px;
                    margin-bottom:20px;
                }
                & p{
                    color:var(--white);
                    font-size:26px;
                }
                & button{
                    width:200px;
                    margin-top:60px;
                    font-size:26px;
                    background:none;
                    border:none;
                    border-bottom: 2px solid var(--white);
                    cursor:pointer;
                    color: var(--white);
                }
            }
    }
   `;
const SneakerModul = () => {

  return (
    <Container>
      <SneakerWrapper>
        {sneakerImage.map((item)=>(
            <Foto key={item.id}>
              <Link to={{pathname:`/${item.title}`}} className="link" id="whiteLink" title={item.title}>
            <img src={item.img} alt={item.name} title={item.title}/>
            <div>
                <span>
                    <h3>{`${item.name}-Favoriten`}</h3>
                    <p>Trends & Marken für die ganze Familie</p>
                    <button type="button" title="Jetzt shoppen">Jetzt shoppen</button>
                </span>
            </div>
            </Link>
            </Foto>
        ))}
      </SneakerWrapper>
    </Container>
  )
}

export default SneakerModul
