import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllUser } from '../features/user/userSlice';
import { createMessage, deleteMessage, getAllMessages, reset } from '../features/messages/messageSlice';
import {CiEdit} from 'react-icons/ci';
import {MdDeleteForever} from 'react-icons/md'
import MessagesEdit from '../components/MessagesEdit';
import {small} from '../responsive';
const Container = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
`;
const MessangerWrapper = styled.div`
  width:100%;
  display:flex;
  padding:20px;
  border-bottom: 1px dotted var(--coffee);
`;
const Admins = styled.div`
  flex:1;
  background:var(--coffee);
  padding:5px;
  & h2{
    font-size:26px;
    color:var(--white);
    ${small({fontSize:"16px"})}
  }
  & ul{
    width:100%;
  }
  & li{
    width:100%;
    margin: 5px 0;
    padding:5px;
    border-bottom: 1px solid var(--white;)
    font-size: 20px;
    ${small({fontSize:"14px"})}

    & span{
      height:100%;
      width:100%;
      color:var(--white);
      border-bottom:1px solid var(--white);
      display:block;
      cursor: pointer;
    }
  }
`;
const MessagesWrapper = styled.div`
  flex:2;
  display:flex;
  ${small({flexDirection:"column"})}
`;
const PersonalNachrichten = styled.div`
  flex:1;
  padding:10px;
  position:relative;
  & div{
    width:100%;
    background:var(--coffee);
    padding:2px;
    margin: 10px 0;
    border-radius:5px;
    color:var(--white);
  }
  & .crudIcons{
    width:100%;
    height:20px;
  }
  & .content{
    margin-top:2px;
    width:100%;
    padding:5px 0;
  }
  & #icons{
    display:flex;
    align-items:center;
    font-size:16px;
    justify-content:flex-end;
  }

  & h3{
    margin-bottom: 5px;
    ${small({fontSize:"12px", fontWeight:"400"})}
  }
  & #editModel{
    position:absolute;
    width:100%;
    min-height:150px;
    background:var(--white);
  }
`;
const Nachrichten = styled.div`
  flex:1;
  & div{
    width:100%;
    background:var(--gray);
    padding:2px;
    margin: 10px 0;
    border-radius:5px;
    color:var(--fontColor);
    ${small({margin: "5px 2px"})}
  }
  & #crudIcons{
    width:100%;
    height:20px;
  }
  & #content{
    margin-top:2px;
    width:100%;
    padding:5px 0;
  }
  & #icons{
    display:flex;
    align-items:center;
    font-size:16px;
    justify-content:flex-end;
  }
  & h3{
    margin-bottom: 5px;
    ${small({fontSize:"12px", fontWeight:"400"})}
  }
`;
const WriteMessage = styled.div`
  width:100%;
  margin-top:20px;
`;
const MessageForm = styled.form`
  width:100%;
  display:flex;
  flex-direction:column;
  & textarea{
    padding:5px;
  }
  & button{
    margin: 10px 0;
    width:200px;
  }
`;

const Messages = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state)=>state.auth.user);
  const allUser= useAppSelector((state)=>state.user.allUser);
  const allMessages = useAppSelector((state)=>state.messages.allUserMessages);
  const sendUserId = user!._id

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllMessages());
    
  }, [dispatch])
//message types
  const personalMessage = allMessages.filter((item)=>item.userId === user?._id)
  const publicMessage = allMessages.filter((item)=>item.userId === "");
  const ownMessage = allMessages.filter((item)=>item.sendUserId === user?._id)
  //Einzelteilnehmer
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  //textarea
  const [formdata, setFormdata] = useState({
    userMessage:"",
  })
  const [formerror, setFormerror] = useState("");
  const {userMessage} = formdata;
 
  //change and send logic
  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
 const onSubmit = async (e:React.FormEvent)=>{
  e.preventDefault();
  const userMessageData = {
    userMessage,
    userId:userId || "",
    sendUsername: user!.username,
    sendUserId,
  }
  if(userMessageData.userMessage === ""){
    setFormerror("Sie dürfen keine leere Nachricht versenden");
    return;
  }
  else{
    setFormerror("");
    dispatch(createMessage(userMessageData));
    dispatch(reset());
    dispatch(getAllMessages());
  }  
 }
//delete
 const handleDelete = (id:string)=>{
  dispatch(deleteMessage(id))
  dispatch(getAllMessages());
 }
 //update
 const [editModal, setEditModal] = useState(false);
 const [modalContent, setModalContent] = useState({
    id:"",
    userMessage:""
 })
 const handleEdit = (id:string, message:string)=>{
  setEditModal(true);
  setModalContent({
    id:id,
    userMessage:message
  })
 }
  return (
    <Container>
      <MessangerWrapper>
      <Admins>
        <h2>Teilnehmer</h2>
        <ul>
          {allUser.map((item)=>(
            <React.Fragment key={item._id}>
            {item.isAdmin && <li onClick={()=>setUsername(item.username)}><span onClick={()=>setUserId(item._id!)}>{item.vorname} {item.nachname}</span>
            </li>}
            </React.Fragment>
          ))}
          <li onClick={()=>setUserId("")}><span onClick={()=>setUsername("")}>An Alle</span></li>
        </ul>
      </Admins>
      <MessagesWrapper>
        <PersonalNachrichten>
          {personalMessage && personalMessage.map((item)=>(
            <div key={item._id}>
              <div className="crudIcons">
                {ownMessage && <div id="icons"><CiEdit style={{marginRight:"4px"}} onClick={()=>handleEdit(item._id!, item.userMessage)}/><MdDeleteForever onClick={()=>handleDelete(item._id!)}/></div>}
                </div>
              <div className="content">
                <h3>Nachricht von: {item.sendUsername}</h3>
                <p>{item.userMessage}</p>
              </div>
            </div>
          )) }
          {editModal ? <div id="editModal">
            <MessagesEdit 
              editModal={editModal}
              setEditModal={setEditModal}
              id={modalContent.id}
              userMessage={modalContent.userMessage}
            />
          </div>: null}  
        </PersonalNachrichten>
        <Nachrichten>
        {publicMessage && publicMessage.map((item)=>(
            <div key={item._id}>
              <div id="crudIcons">
                {ownMessage && <div id="icons"><CiEdit style={{marginRight:"4px"}} onClick={()=>handleEdit(item._id!, item.userMessage)}/><MdDeleteForever onClick={()=>handleDelete(item._id!)}/></div>}
                </div>
                <div id="content">
              <h3>Nachricht von: {item.sendUsername}</h3>
              <p>{item.userMessage}</p>
              </div>
            </div>
          ))}
        </Nachrichten>
      </MessagesWrapper>
      </MessangerWrapper>
      <WriteMessage>
        <h3>{username && `Nachricht wird gesendet an ${username}`}</h3>

        <MessageForm onSubmit={onSubmit}>
           <textarea cols={10} rows={10} name="userMessage" value={userMessage} placeholder="message"onChange={(e)=>handleChange(e)}></textarea>
           <div>
           {formerror ? <span className="error">{formerror}</span>: null}
           </div>
           <button type="submit" title="Absenden">Absenden</button>
        </MessageForm> 
      </WriteMessage>
    </Container>
  )
}

export default Messages
