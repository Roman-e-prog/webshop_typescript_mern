import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import Spinner from '../components/Spinner';
import {getDescriptionItem, updateDescriptionItem} from '../features/descriptionItems/descriptionItemSlice';
import {small} from '../responsive';
const Container = styled.div`
    width:100%;
`;
const Form = styled.form`
    width:100%;
    display:flex;
    ${small({flexDirection:"column"})}
`;
const InputGroup = styled.div`
    width:50%;
`;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
    padding:5px;
    margin-left:15px;

    & label{
        margin-bottom:5px;
        color:var(--darkGray);
        font-size:17px;
    }
    & input{
        padding:5px;
        border:none;
        width:100%;
        box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
    }
    & textarea{
      padding:2px;
    }
    & .dateLabel{
        margin-bottom: 5px;
        color:var(--darkGray);
        font-size:17px;
        font-weight:400;
    }
    & span{
        padding:5px;
        border:none;
        width:40%;
        box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
    }
`;
const ButtonGroup = styled.div`
    width:40%;
    display:flex;
    flex-direction:column;
    padding: 20px 20px;
`;
const UpdateButton = styled.button`
    background: var(--coffee);
    padding:10px;
    margin-bottom:20px;
    color: var(--white);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;

const OkButton = styled.button`
    background: white;
    padding:10px;
    color: var(--darkGray);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;

//typescript
export interface UpdateDescriptionData{
    descriptiondata: object,
    id:string,
}
const DescriptionItemsEdit = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state:RootState)=>state.descriptionItem);
    const {id} = useParams()
    const {descriptionItem, isError, isLoading, message}:any = selector;

    useEffect(() => {
        if(isError){
            toast.error(message);
        }
        dispatch(getDescriptionItem(id!))
    }, [dispatch,isError, message, id])
    const [formdata, setFormdata] = useState({
        title:"",
        text:"",
    })
    const {title, text} = formdata;
    useEffect(()=>{
        if(descriptionItem){
            setFormdata({
                title: descriptionItem.title,
                text:descriptionItem.text,
            })
        }
    },[descriptionItem])
    const onSubmit =(e:React.FormEvent)=>{
        e.preventDefault();
        const descriptionData = {
            title,
            text
        }
        const updateDescData:UpdateDescriptionData = {
            descriptiondata: descriptionData,
            id:id!,
        }
        dispatch(updateDescriptionItem(updateDescData))
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
        <ToastContainer/>
      <Form onSubmit={onSubmit}>
        <InputGroup>
            <FormGroup>
                <label htmlFor='title'>Titel</label>
                <input type="text" name="title" id="title" required defaultValue={title} onChange={(e)=>setFormdata({...formdata, title:e.target.value})}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='text'>Text</label>
                <textarea rows={10} cols={10} name="text" required defaultValue={text} placeholder="text"  onChange={(e)=>setFormdata({...formdata, text:e.target.value})}></textarea>
            </FormGroup>
            <FormGroup>
                <h3 className='dateLable'>Erstellt am:</h3>
                <span>{new Date(descriptionItem.createdAt).toLocaleDateString("de-De", {day:"numeric", month:"short", year:"numeric"})}</span>
            </FormGroup>
            <FormGroup>
                <h3 className='dateLable'>Update am:</h3>
                <span>{new Date(descriptionItem.updatedAt).toLocaleDateString("de-De",{day:"numeric", month:"short", year:"numeric"})}</span>
            </FormGroup>
        </InputGroup>
        <ButtonGroup>
            <UpdateButton onClick={onSubmit} title="Update">Update</UpdateButton>
        </ButtonGroup>
      </Form>
      <OkButton onClick={()=>navigate(-1)} title="Okay">Okay</OkButton>
      
    </Container>
  )
}

export default DescriptionItemsEdit

