import {css} from 'styled-components';

export const large = (props)=>{
    return css`
    @media screen and (max-width:1024px){
        ${props}
    }
    `;
}
export const middle = (props)=>{
    return css`
    @media screen and (max-width:800px){
        ${props}
    }
    `;
}
export const small = (props)=>{
    return css`
    @media screen and (max-width:420px){
        ${props}
    }
    `;
}