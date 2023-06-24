
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import {getSliderItem, updateSliderItem, reset} from '../features/sliderItems/sliderItemSlice'
import Spinner from '../components/Spinner';
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
    ${small({width:"90%"})}
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
    ${small({width:"80%"})}
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
    margin:5px 20px;
    padding:10px;
    color: var(--darkGray);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
//typescript
type FileData = {
  img: File | null
}
export interface UpdateSliderItemsData{
  sliderData:FormData,
  id:string
}
const SliderItemsEdit = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state)=>state.sliderItems);
  const {sliderItem, isError, isLoading, message}:any = selector;
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    dispatch(getSliderItem(id!));
    return ()=>{
      dispatch(reset());
    }
  }, [dispatch,isError, message, id]);

  const [formdata, setFormdata] = useState<{title:string, alt:string}>({
    title:"",
    alt:"",
   
  })
  const {alt, title} = formdata;
//img
const [filedata, setFiledata] = useState<FileData>({
  img:null
})
const [preview, setPreview] = useState<string | null>(null)
const fileChange = (e:ChangeEvent<HTMLInputElement>)=>{
  const files = e.currentTarget.files;
  if(!files){
    return;
  }
  const file = files[0];
  setFiledata({img:file});
  updatePreview(files[0]);
}
const updatePreview = (file:File)=>{
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = ()=>{
    setPreview(reader.result as string);
  }
}

  useEffect(()=>{
    if(sliderItem){
      setFormdata({
        title:sliderItem.title,
        alt:sliderItem.alt
      })
    }
  }, [sliderItem])

  const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const SliderData = new FormData();
    SliderData.append("title", formdata.title);
    SliderData.append("producer", formdata.alt)
    SliderData.append("img", filedata.img!)
    
    const updateSliderData:UpdateSliderItemsData = {
      sliderData: SliderData,
      id:id!,
    }
    dispatch(updateSliderItem(updateSliderData));
    return ()=>{
      dispatch(reset());
    }
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
              <label htmlFor='img'>Bild</label>
              <input type="file" name="img" id="img" onChange={fileChange}/>
              {preview ? <img src={preview} alt="Vorschau" title="Vorschau"/> :
              <img src={sliderItem.img} alt={sliderItem.alt} title={sliderItem.title}/>
              }
            </FormGroup>
            <FormGroup>
              <label htmlFor='title'>Slider Titel</label>
              <input type="text" name="title" id="title" defaultValue={title} onChange={(e)=>setFormdata({...formdata, title: e.target.value})}/>
            </FormGroup>
            <FormGroup>
            <label htmlFor='alt'>Alternativ Text</label>
              <input type="text" name="alt" id="alt" defaultValue={alt} onChange={(e)=>setFormdata({...formdata, alt: e.target.value})}/>
            </FormGroup>
           
            <FormGroup>
              <h3 className='datelable'>Erstellt am:</h3>
              <span>{new Date(sliderItem.createdAt).toLocaleDateString("de-De",{day:'numeric', month:'short', year:'numeric' })}</span>
            </FormGroup>
            <FormGroup>
              <h3 className='datelable'>Update am:</h3>
              <span>{new Date(sliderItem.updatedAt).toLocaleDateString("de-De",{day:'numeric', month:'short', year:'numeric' })}</span>
            </FormGroup>
          </InputGroup>
          <ButtonGroup>
            <UpdateButton onClick={onSubmit}>Update</UpdateButton>
          </ButtonGroup>
        </Form>
        <OkButton onClick={()=>navigate(-1)}>Okay</OkButton>
    </Container>
  )
}

export default SliderItemsEdit
