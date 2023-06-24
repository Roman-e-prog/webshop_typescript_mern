import React, {useState} from 'react';
import styled from 'styled-components';
import { useAppDispatch} from '../app/hooks';
import { getAllMessages, updateMessage } from '../features/messages/messageSlice';

const Container = styled.div`
    width:100%;
    min-height:200px;
    position:absolute;
`;
const Form = styled.form`
    width:100%;
    height:100%;
    padding:10px;

    & textarea{
    width:80%;
    margin:0 auto;
    border:none;
    padding:5px;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
    }
`;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;

    & label, textarea{
        margin-bottom:5px;
    }
`;
const CloseButton = styled.button`
  background:var(--white);
  color:var(--coffee);
  border:none;
  padding:5px;
  cursor:pointer;
  box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
const UpdateButton = styled.button`
  background:var(--coffee);
  color:var(--white);
  border:none;
  padding:5px;
  cursor:pointer;
  box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
//typeScript
export interface UpdateMessageData{
    userMessageData:object,
    id:string,
}
const MessagesEdit = (props:{ id:string, userMessage:string, editModal:boolean, setEditModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const dispatch = useAppDispatch();
   console.log(props.id, props.userMessage);
    const [formdata, setFormdata] = useState({
        userMessage:props.userMessage
    })
    const {userMessage} = formdata;
    //absenden
    const onSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        const userMessageData = {
            userMessage,
        }
        const updateMessageData:UpdateMessageData = {
            userMessageData: userMessageData!,
            id:props.id!,
        }
        dispatch(updateMessage(updateMessageData))
        dispatch(getAllMessages());
    }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
            <label htmlFor='userMessage'>Nachricht korrigieren</label>
            <textarea cols={10} rows={10} name="userMessage" defaultValue={userMessage} placeholder="Ihre Nachricht" onChange={(e)=>setFormdata({...formdata, userMessage: e.target.value})}></textarea>
            <UpdateButton title="Update" onClick={onSubmit}>Update</UpdateButton>
            <CloseButton onClick={()=>props.setEditModal(false)} title="Okay">Okay</CloseButton>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default MessagesEdit
