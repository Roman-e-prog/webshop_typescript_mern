import React,{useState} from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector} from '../app/hooks';
import { newPassword } from '../features/user/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const UpdateForm = styled.form`
    width:30%;
    padding:10px;
    display:flex;
    flex-direction:column;
`;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
    margin: 5px 0;
`;
const UpdateButton = styled.button`
    padding:10px;
    width:40%;
    background:var(--coffee);
    color:var(--white);
    border:none;
    cursor:pointer;
`;
const Reset = () => {
  const dispatch= useAppDispatch();
  const {token} = useParams();
  const message = useAppSelector((state)=>state.user.userForgot);
  const navigate = useNavigate();
  const [formerror, setFormerror] = useState("");
 
  const [password, setPassword]= useState("");
  const [password_confirm, setPassword_Confirm] = useState("");

const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const resetData ={
        token,
        password,
        password_confirm
    }
    if(password !== password_confirm){
        setFormerror("Die Passwörte stimmen nicht überein")
    }
    else{
        setFormerror("");
        dispatch(newPassword(resetData));
        toast.success(message);
        message && navigate('/login');
    }
}
  return (
    <Container>
        <ToastContainer/>
      <UpdateForm onSubmit={onSubmit}>
        <FormGroup>
            <label>Bitte hier das neue Passswort angeben. Mindestens sechs Stellen</label>
            <input type="password" name="password" id="password" placeholder="passwort" defaultValue={password} onChange={(e)=>setPassword(e.target.value)}/>
        </FormGroup>
        <FormGroup>
            <label>Bitte Passwort bestätigen.</label>
            <input type="password" name="password_confirm" id="password_confirm" placeholder="passwort bestätigen" defaultValue={password_confirm} onChange={(e)=>setPassword_Confirm(e.target.value)}/>
            <div>
                {formerror && <span>{formerror}</span>}
            </div>
        </FormGroup>
        <UpdateButton>Absenden</UpdateButton>
      </UpdateForm>
    </Container>
  )
}

export default Reset
