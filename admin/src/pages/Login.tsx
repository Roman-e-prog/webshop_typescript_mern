import React from 'react'
import styled from 'styled-components'
import {useState, useEffect, useCallback} from 'react';
import { RootState } from '../app/store';
import { login, reset} from '../features/authSlice';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '../validations/LoginValidation';
import update from 'immutability-helper';
const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const LoginForm = styled.form`
    width:400px;
    height:400px;
    padding:20px;
    display:flex;
    flex-direction:column;
    border: 1px solid var(--coffee);
`;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
    margin: 0 10px;

    & label {
        margin:5px 0;
    }
    & input {
        padding:5px 0;
    }
`;
const SubmitButton = styled.button`
    margin-top: 10px;
    margin-left:10px;
    width:200px;
    padding:10px;
    background:var(--coffee);
    color:white;
    border:none;
    cursor: pointer;
`;
const Login = () => {
        const dispatch = useAppDispatch();
        const selector = useSelector((state:RootState)=>state.auth);
        const {user, isError, message} = selector;
        const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        username:"",
        email:"",
        password:"",
    });
    const {username, email, password} = formdata;
    //validation
    const [formerror, setFormerror] = useState({
        username:false,
        email:false,
        password:false,
        error:[],
    })

useEffect(()=>{
    if(isError){
        toast.error(message);
    }
    if(user?.isAdmin){
        navigate("/home");
    }
    return ()=>{
        dispatch(reset());
    }
}, [dispatch, isError, message, navigate, user]);

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormdata((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
}
const onSubmit = useCallback(
    async (e:React.FormEvent) => {
      e.preventDefault()
      const loginData = {
                username,
                email,
                password,
            }
      // Check the schema if form is valid:
      const isFormValid = await LoginSchema.isValid(loginData, {
        abortEarly: false, // Prevent aborting validation after first error
      })

      if (isFormValid) {
        dispatch(login(loginData))
      } else {
        // If form is not valid, check which fields are incorrect:
        LoginSchema.validate(loginData, { abortEarly: false }).catch((err) => {
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
    },
    [dispatch, email, password, username]
  )

  return (
    <Container>
      <ToastContainer/>
      <LoginForm onSubmit={onSubmit}>
        <FormGroup>
            <label htmlFor='username'>Benutzername</label>
            <input type="text" name="username" id="username" required value={username} onChange={handleChange}/>
            <div className='error'>
                {formerror.username && <span>{formerror.username}</span>}
            </div>
        </FormGroup>
        <FormGroup>
            <label htmlFor='email'>E-mail</label>
            <input type="email" name="email" id="email" required  value={email} onChange={handleChange}/>
            <div className='error'>
            {formerror.email && <span>{formerror.email}</span>}
            </div>
        </FormGroup>
        <FormGroup>
            <label htmlFor='password'>Password</label>
            <input type="password" name="password" id="password" required  value={password} onChange={handleChange}/>
            <div className='error'>
            {formerror.password && <span>{formerror.password}</span>}
            </div>
        </FormGroup>
        <SubmitButton onClick={onSubmit}>Login</SubmitButton>
      </LoginForm>
    </Container>
  )
}

export default Login
