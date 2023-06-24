import React, {useState, useCallback} from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../app/hooks';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import Navbar from './Navbar';
import { orderNewsletter } from '../features/newsletter/newsletterSlice';
import { NewsletterFormSchema } from '../validations/NewsletterOrderValidation';
import update from 'immutability-helper';
import {small, middle} from '../responsive';
const Container = styled.div`
    width:100%;
`;
const TitleWrapper = styled.div`
    width:100%;
    margin-top:20px;
`;
const Title = styled.h1`
    font-size:26px;
    text-align:center;
`;
const Form = styled.form`
    width:40%;
    margin:20px auto;
    padding:20px;
    display:flex;
    flex-direction:column;
    border:1px solid var(--coffee);
    ${middle({width:"70%"})}
    ${small({width:"95%", padding:"5px"})}
`;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
    margin:10px;

    & h3{
        margin-bottom:5px;
    }
    & .radios{
        width:300px;
        display:flex;
        align-items:center;
        justify-content:space-between;

        & Label{
            width:200px;
        }
    }
`;
const Label = styled.label`
    margin-bottom:5px;
`;
const Input = styled.input`
    width:80%;
    padding:5px;
`;
const Button = styled.button`
    margin-top:20px;
    padding:10px;
    width:200px;
    background:var(--coffee);
    color:var(--white);
    cursor: pointer;
    border:none;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);

    &:hover{
        opacity:0.9;
    }
    `;
const NewsletterForm = () => {
    const dispatch = useAppDispatch();
    const [formdata, setFormData] = useState({
        vorname:"",
        nachname:"",
        email:"",
    })
    const {vorname, nachname, email,} = formdata;
    //validation
  const [formerror, setFormerror] = useState({
    vorname:false,
    nachname:false,
    email:false,
    category:false,
    error:[],
})

    const [radiodata, setRadiodata] = useState<string>('');
    const handleChange =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    console.log(radiodata);
  const onSubmit = useCallback( async (e:React.FormEvent)=>{
    e.preventDefault();
    const newsletterData ={
        vorname,
        nachname,
        email,
        radiodata
    }
       // Check the schema if form is valid:
       const isFormValid = await NewsletterFormSchema.isValid(newsletterData, {
        abortEarly: false, // Prevent aborting validation after first error
      })
      if(isFormValid){
        dispatch(orderNewsletter(newsletterData));
        toast.success("Danke. Sie erhalten ab sofort den gewünschten Newsletter.")
      } else {
        // If form is not valid, check which fields are incorrect:
        NewsletterFormSchema.validate(newsletterData, { abortEarly: false }).catch((err) => {
          const errors = err.inner.reduce((acc:any, error:any) => {
            return {
              ...acc,
              [error.path]: error.errors,
            }
          }, {})
            console.log(errors);
          // Update form errors state:
          setFormerror((prevErrors:any) =>
            update(prevErrors, {
              $set: errors,
            })
          )
        })
      }
    
  },[dispatch, vorname, nachname, email, radiodata])
  return (
    <Container>
        <ToastContainer/>
      <Navbar/>
        <TitleWrapper>
            <Title>Zum Newsletter anmelden:</Title>
        </TitleWrapper>
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label htmlFor='vorname'>Vorname</Label>
                <Input type="text" name="vorname" id="vorname" value={vorname} onChange={(e)=>handleChange(e)}/>   
                    <div className="error">
                        { formerror.vorname && <span>{formerror.vorname}</span> }
                        </div>         
            </FormGroup>
            <FormGroup>
                <Label htmlFor='nachname'>Nachname</Label>
                <Input type="text" name="nachname" id="nachname" value={nachname} onChange={(e)=>handleChange(e)}/>
                <div  className="error">
                        { formerror.nachname && <span>{formerror.nachname}</span> }
                        </div>             
            </FormGroup>
            <FormGroup>
                <Label htmlFor='email'>Email</Label>
                <Input type="email" name="email" id="email" value={email} onChange={(e)=>handleChange(e)}/>
                <div  className="error">
                        { formerror.email && <span>{formerror.email}</span> }
                        </div>             
            </FormGroup>
            <FormGroup>
                <h3 id="radio">Zu welchem Thema möchten Sie informiert werden?</h3>
                <div className="radios">
                    <Label htmlFor='women'>Damenschuhe</Label>
                    <Input type="radio" name="radiodata" id="women" value="women" onChange={(e)=>setRadiodata(e.target.value)}/>
                </div>
                <div className="radios">
                    <Label htmlFor='men'>Herrenschuhe</Label>
                    <Input type="radio" name="radiodata" id="men" value="men" onChange={(e)=>setRadiodata(e.target.value)}/>
                </div>
                <div className="radios">
                    <Label htmlFor='child'>Kinderschuhe</Label>
                    <Input type="radio" name="radiodata" id="child" value="child" onChange={(e)=>setRadiodata(e.target.value)}/>
                </div>
                <div className="radios">
                    <Label htmlFor='sport'>Sportschuhe</Label>
                    <Input type="radio" name="radiodata" id="sport" value="sport" onChange={(e)=>setRadiodata(e.target.value)}/> 
                </div>
                 <div  className="error">
                        { formerror.category && <span>{formerror.category}</span> }
                        </div> 
            </FormGroup>
            <Button title="Anmelden" onClick={onSubmit}>Anmelden</Button> 
        </Form>
    </Container>
  )
}

export default NewsletterForm
