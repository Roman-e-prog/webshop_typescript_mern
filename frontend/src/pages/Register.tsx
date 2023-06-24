import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import {useState, useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import {register, reset} from '../features/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import { RootState } from '../app/store';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import { RegisterSchema } from '../validations/RegisterValidation';
import update from 'immutability-helper';
import {small, middle} from '../responsive';
const Container = styled.div`
    width:100%;
`;
const FormWrapper =  styled.div`
    width:50%;
    margin: 0 auto;
    display:flex;
    flex-direction:column;
    ${middle({width:"75%"})};
    ${small({width:"95%"})}
`;
const Title =styled.h1`
  font-size:26px;
  color:var(--FontColor);
  text-align:center;
  margin: 10px 0;
`;
const Form = styled.form`
  width:100%;
  border: 1px solid var(--coffee);
  display:flex;
  flex-direction:column;
  padding:10px;
`;
const FormGroup =  styled.div`
  display:flex;
  flex-direction:column;
  margin-left:10px;
`;
const Label = styled.label`
  margin-top:5px;
  margin-bottom:2px;
  color:var(--coffee);
`;
const Input = styled.input`
  padding:2px;
  width:80%;
`;
const StreetGroup = styled.div`
    display:flex;
    width:80%;

    & #numberwrapper{
        width:20%;
        & #number{
            width:100%;
        }
    }
    & #streetwrapper{
        width:80%;
          & #street{
        width:100%;
        }
    }
`;
const CityGroup = styled.div`
    display:flex;
    width:80%;
    & #plzwrapper{
        width:40%;

        & #plz{
            width:100%;
        }
    }
    & #citywrapper{
        width:60%;

        & #city{
            width:100%;
        }
    }
`;
const CheckGroup = styled.div`
    width:80%;
    margin:10px 0; 
    display:flex;
    aling-items:center;

    & #checkboxLabel{
        color:var(--coffee);
        margin-right:5px;
    }
`;
const ButtonHolder =  styled.div`
  margin:10px;
`;
const Button = styled.button`
  padding:10px;
  width:200px;
  background:var(--coffee);
  color:var(--white);
  border:none;
`;
const Register = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state:RootState)=>state.auth);
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        vorname:"",
        nachname:"",
        email:"",
        street:"",
        number:"",
        plz:"",
        city:"",
        username:"",
        password:"",
        password_confirm:"",
    })
    const {vorname, nachname, email, street, number, plz, city, username, password, password_confirm} = formdata;
    const {user, isLoading, isError, isSuccess, message} = selector;
  //validation
  const [formerror, setFormerror] = useState({
    vorname:false,
    nachname:false,
    email:false,
    street:false,
    number:false,
    plz:false,
    city:false,
    username:false,
    password:false,
    password_confirm:false,
    error:[],
})
console.log(formerror);
    useEffect(()=>{
        if(isError){
            toast.error(message);
        }
        if(isSuccess || user){
            navigate('/login');
        }
        return ()=>{
            dispatch(reset());
        }
        
    }, [dispatch, isError, isSuccess, navigate, user, message])

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setFormdata((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = useCallback( async (e:React.FormEvent)=>{
        e.preventDefault();
      
            const userData = {
                vorname,
                nachname,
                email,
                street,
                number,
                plz,
                city,
                username,
                password,
                password_confirm
            }
            const registerData ={
                vorname,
                nachname,
                email,
                street,
                number,
                plz,
                city,
                username,
                password,
            }
            const isFormValid = await RegisterSchema.isValid(userData, {
                abortEarly: false, // Prevent aborting validation after first error
              })
            if(isFormValid){
                dispatch(register(registerData))
            }  else {
                // If form is not valid, check which fields are incorrect:
                RegisterSchema.validate(userData, { abortEarly: false }).catch((err) => {
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
            
        
    },[dispatch,  vorname, nachname, email, street, number, plz, city, username, password, password_confirm]);
    if(isLoading){
        return <Spinner/>
    }
  return (
    <Container>
      <Navbar/>
      <Logo/>
      <ToastContainer/>
        <FormWrapper>
            <Title>Konto anmelden</Title>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label htmlFor='vorname'>Vorname</Label>
                    <Input type="text" name="vorname" id="vorname" required value={vorname} onChange={handleChange}/>
                    <div  className="error">
                        {formerror.vorname && <span>{formerror.vorname}</span>}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='nachname'>Nachname</Label>
                    <Input type="text" name="nachname" id="nachname" required value={nachname} onChange={handleChange}/>
                    <div  className="error">
                        {formerror.nachname && <span>{formerror.nachname}</span>}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='email'>Email</Label>
                    <Input type="email" name="email" id="email" required value={email} onChange={handleChange}/>
                    <div  className="error">
                        {formerror.email && <span>{formerror.email}</span>}
                    </div>
                </FormGroup>
                <StreetGroup>
                    <FormGroup id="streetwrapper">
                        <Label htmlFor="street" id="streetLabel">Straße</Label>
                        <Input type="text" name="street" id="street" required value={street} onChange={handleChange}/>
                        <div  className="error">
                        {formerror.street && <span>{formerror.street}</span>}
                    </div>
                    </FormGroup>
                    <FormGroup id="numberwrapper"> 
                        <Label htmlFor='number' id="numberlabel">Hausnummer</Label>
                        <Input type="text" name="number" id="number" required value={number} onChange={handleChange}/>
                        <div  className="error">
                        {formerror.number && <span>{formerror.number}</span>}
                    </div>
                    </FormGroup>
                </StreetGroup>
                <CityGroup>
                    <FormGroup id="plzwrapper">
                        <Label htmlFor='plz' id="plzlabel">Postleitzahl</Label>
                        <Input type="text" name="plz" id="plz" required value={plz} onChange={handleChange}/>
                        <div  className="error">
                        {formerror.plz && <span>{formerror.plz}</span>}
                    </div>
                    </FormGroup>
                    <FormGroup id="citywrapper">
                        <Label htmlFor='city' id="citylabel">Stadt</Label>
                        <Input type="text" name="city" id="city" required value={city} onChange={handleChange}/>
                        <div  className="error">
                        {formerror.city && <span>{formerror.city}</span>}
                    </div>
                    </FormGroup>
                </CityGroup>
                    <FormGroup>
                    <Label htmlFor='username'>Benutzername</Label>
                    <Input type="text" name="username" id="username" required value={username} onChange={handleChange}/>
                    <div  className="error">
                        {formerror.username && <span>{formerror.username}</span>}
                    </div>
                </FormGroup><FormGroup>
                    <Label htmlFor='password'>Passwort</Label>
                    <Input type="password" name="password" id="password" required value={password} onChange={handleChange}/>
                    <div  className="error">
                        {formerror.password && <span>{formerror.password}</span>}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password_confirm'>Passwort wiederholen</Label>
                    <Input type="password" name="password_confirm" id="password_confirm" required value={password_confirm} onChange={handleChange}/>
                    <div  className="error">
                        {formerror.password_confirm && <span>{formerror.password_confirm}</span>}
                    </div>
                </FormGroup>
                <CheckGroup>
                    <label id="checkboxLabel">Bitte akzeptieren Sie unsere AGB</label>
                    <input type="checkbox" name="check" id="check" title="AGB akzeptieren" required/>
                </CheckGroup>
                <ButtonHolder>
                <Button onClick={onSubmit} title="Registrieren">Registrieren</Button>
            </ButtonHolder>
            </Form>
        </FormWrapper>
      <Footer/>
    </Container>
  )
}

export default Register
