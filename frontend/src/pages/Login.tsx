import React, { ChangeEvent, FormEvent, useEffect, useState, useCallback} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import {login, reset} from '../features/auth/authSlice';
import { LoginSchema } from '../validations/LoginValidation';
import update from 'immutability-helper';
import { sendPasswordReset, resets} from '../features/user/userSlice';
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
const RegisterWrapper = styled.div`
  margin-top:5px;
`;
const Register = styled.span``;

const ForgottenWrapper = styled.div`
  width:50%;
  margin: 0 auto;
  display:flex;
  flex-direction:column;
  ${middle({width:"75%"})};
  ${small({width:"95%"})}
`;
const ForgottenButton = styled.button`
  width:30%;
  margin-top:5px;
  padding:10px;
  background:var(--fontColor);
  color:var(--white);
`;

const Login = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state:RootState)=>state.auth);
  const successMessage = useAppSelector((state)=>state.user.userForgot);

  //navigate
  const navigate = useNavigate();
  //catch values
  const [formdata, setFormdata] = useState({
    username:"",
    email:"",
    password:"",
  });
  const {username, email, password} = formdata;
  const {user, isError, message, isLoading, isSuccess} = selector;
  

  //validation
  const [errorMessage, setErrorMessage] = useState("");
  const [formerror, setFormerror] = useState({
    username:false,
    email:false,
    password:false,
    error:[],
})
//login when user is logged in
  useEffect(()=>{
    if(isError){
      toast.error(message);
    }
    if(isSuccess || user){
      navigate('/');
      dispatch(resets())
    }
    return ()=>{
      dispatch(reset());
  }
  }, [isError, dispatch, message, isSuccess, navigate, user]);
//setData
  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  //Forgotten Password
 const handleMail = ()=>{
    const userData = {
      email,
    }
    if(email ===""){
      setErrorMessage("Bitte geben Sie Ihre Email ein, damit Sie Ihr Passwort erneuern können")
    }
    else{
      setErrorMessage("");
      dispatch(sendPasswordReset(userData));
    }   
 }
  //sendData
  const onSubmit = useCallback( async (e:FormEvent)=>{
    e.preventDefault();
    const userData ={
      username,
      email,
      password,
    }
       // Check the schema if form is valid:
       const isFormValid = await LoginSchema.isValid(userData, {
        abortEarly: false, // Prevent aborting validation after first error
      })
      if(isFormValid){
        dispatch(login(userData))
      } else {
        // If form is not valid, check which fields are incorrect:
        LoginSchema.validate(userData, { abortEarly: false }).catch((err) => {
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
   
  },[dispatch, email, password, username])

  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
      <Navbar/>
      <Logo/>
      <ToastContainer/>
      <FormWrapper>
          <Title>Login</Title>
        <Form onSubmit={onSubmit}>
        <FormGroup>
            <Label htmlFor='username'>Benutzername</Label>
            <Input type="text" name="username" id="username" required value={username} onChange={handleChange}/>
            <div  className="error">
                {formerror.username && <span>{formerror.username}</span>}
            </div>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='email'>Email</Label>
            <Input type="email" name="email" id="email" required value={email} onChange={handleChange}/>
            <div  className="error">
                {formerror.email && <span>{formerror.email}</span>}
            </div>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='password'>Passwort</Label>
            <Input  type="password" name="password" id="password" required value={password} onChange={handleChange}/>
            <div  className="error">
                {formerror.password && <span>{formerror.password}</span>}
            </div>
          </FormGroup>
          <ButtonHolder>
            <Button onClick={onSubmit} title="Login">Login</Button>
          </ButtonHolder>
        </Form>
        <RegisterWrapper>
        <Register>Noch kein Konto? <Link to="/register" title="Anmelden">Hier anmelden</Link></Register>
      </RegisterWrapper>
      </FormWrapper>
      <ForgottenWrapper>
            <ForgottenButton onClick={handleMail} title="Passwort vergessen">Passwort vergessen?</ForgottenButton>
            <div  className="error">
              {errorMessage && <span>{errorMessage}</span>}
            </div>
            <div>
              {successMessage ? <span>{successMessage.message}</span> : null}
            </div>
      </ForgottenWrapper>
      <Footer/>
    </Container>
  )
}

export default Login
