import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {getUser, updateUser, reset} from '../features/user/userSlice';
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
    ${small({width:"98%"})}
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
    padding: 250px 20px;
    ${small({padding:"5px", width:"80%"})}
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
    margin:5px 20px;
    color: var(--darkGray);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
//typescript
export interface UpdateData{
    userData:object,
    id:string
   }
const UserDisplay:React.FC = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector((state:RootState)=>state.user);
    const navigate = useNavigate();
    
    const {user}:any= selector;
    const {id} = useParams();
    useEffect(()=>{
        dispatch(getUser(id!));
       
    }, [dispatch, id]);
  
    const [formdata, setFormdata] = useState<{vorname:string, nachname:string, username:string, email:string, street:string, number:string,plz:string, city:string, isAdmin:string}>({
        vorname:"",
        nachname:"",
        username:"",
        email:"",
        street:"",
        number:"",
        plz:"",
        city:"",
        isAdmin:"",
    })
    
    const {vorname, nachname, username, email, street, number, plz, city, isAdmin} = formdata;

    useEffect(()=>{
        if(user){
            setFormdata({
                vorname:user.vorname,
                nachname:user.nachname,
                username:user.username,
                email:user.email,
                street:user.street,
                number: user.number,
                plz:user.plz,
                city:user.city,
                isAdmin:user.isAdmin,
            })
        }
    }, [user])

    const onSubmit= (e:React.FormEvent)=>{
        e.preventDefault();
        const userData ={
            vorname, 
            nachname, 
            username, 
            email, 
            street, 
            number, 
            plz, 
            city, 
            isAdmin
        }
        const updateData:UpdateData = {
            userData: userData,
            id:id!,
        }
        dispatch(updateUser(updateData));
        return ()=>{
            dispatch(reset());
        }
    }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <InputGroup>
        <FormGroup>
            <label htmlFor='vorname'>Vorname</label>
            <input type="text" name="vorname" id="vorname" defaultValue={vorname} onChange={(e)=>setFormdata({...formdata, vorname:e.target.value})}/>
        </FormGroup>
        <FormGroup>
            <label htmlFor='nachname'>Nachname</label>
            <input type="text" name="nachname" id="nachname" defaultValue={nachname} onChange={(e)=>setFormdata({...formdata, nachname:e.target.value})}/>
        </FormGroup>
        <FormGroup>
            <label htmlFor='username'>Benutzername</label>
            <input type="text" name="username" id="username" defaultValue={username} onChange={(e)=>setFormdata({...formdata, username:e.target.value})}/>
        </FormGroup>
        <FormGroup>
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" id="email" defaultValue={email} onChange={(e)=>setFormdata({...formdata, email:e.target.value})}/>
        </FormGroup>
            <FormGroup className='formgroup_left'>
                <label htmlFor='street'>Strasse</label>
                <input type="text" name="street" id="street" defaultValue={street} onChange={(e)=>setFormdata({...formdata, street:e.target.value})}/>
            </FormGroup>
            <FormGroup className='formgroup_right'>
                <label htmlFor='number'>Hausnummer</label>
                <input type="text" name="number" id="number" defaultValue={number} onChange={(e)=>setFormdata({...formdata, number:e.target.value})}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='plz'>PLZ</label>
                <input type="text" name="plz" id="plz" defaultValue={plz} onChange={(e)=>setFormdata({...formdata, plz:e.target.value})}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='city'>Stadt</label>
                <input type="text" name="city" id="city" defaultValue={city} onChange={(e)=>setFormdata({...formdata, city:e.target.value})}/>
            </FormGroup>
        <FormGroup>
            <label htmlFor='isAdmin'>Administrator</label>
            <input type="text" name="isAdmin" id="isAdmin" defaultValue={String(isAdmin)} onChange={(e)=>setFormdata({...formdata, isAdmin:e.target.value})}/>
        </FormGroup>
        <FormGroup>
            <h3 className="dateLabel">Erstellt am:</h3>
            <span>{new Date(user.createdAt).toLocaleDateString("de-De", {day:"numeric", month:"short", year:"numeric"})}</span>
        </FormGroup>
        <FormGroup>
            <h3 className="dateLabel">Update am:</h3>
            <span>{new Date(user.updatedAt).toLocaleDateString("de-De", {day:"numeric", month:"short", year:"numeric"})}</span>
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

export default UserDisplay
