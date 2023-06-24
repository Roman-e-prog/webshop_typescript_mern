import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react';

const Container = styled.div`
    width:100%;
`;
const NewsletterWrapper = styled.div`
    width:100%;
`;
const Form = styled.form``;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
`;
const ButtonWrapper = styled.div``;
const SendButton = styled.button``;

const CreateNewsletter = (props:{sendEmail:any, newsletterOrders:object[], form:React.MutableRefObject<HTMLFormElement | null>}) => {
    const [newsletterOrderdata, setNewsletterOrderData] = useState<any>([]);
    
    useEffect(()=>{
        setNewsletterOrderData(props.newsletterOrders);
    },[props.newsletterOrders])
   
    
    const [formdata, setFormdata] = useState({
        ressort:"",
        subject:"",
        message:"",
    })
    const {ressort, subject, message} = formdata;
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormdata((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const [mail, setMail] = useState<any>([]);
    const filteredTheme = newsletterOrderdata.filter((item:any)=>item.radiodata === formdata.ressort);
    
    const handleEmail = ()=>{
        if(filteredTheme){
            filteredTheme.map((item:any)=>setMail(mail.concat(item.email)))
        }
    }
  return (
    <Container>
      <NewsletterWrapper>
        <h1>Newsletter Mail</h1>
        <Form ref={props.form} onSubmit={props.sendEmail}>
            <FormGroup>
                <label htmlFor='ressort'>Ressort</label>
                <input type="text" name="ressort" id="ressort" value={ressort} onChange={(e)=>handleChange(e)}/>
            </FormGroup>
              <FormGroup>
                <label htmlFor="from_name">RAR Schumode</label>
                <input type="text" name="from_name" id="from_name" defaultValue="RAR Schuhmode"/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='subject'>Thema</label>
                <input type="text" name="subject" id="subject" value={subject} placeholder="Thema" onChange={(e)=>handleChange(e)}/>
            </FormGroup>
            <FormGroup>
                <label htmlFor='message'>Inhalt</label>
                <textarea cols={10} rows={10} name="message" value={message} placeholder="Hier Artikel eingeben" onChange={(e)=>handleChange(e)}></textarea>
            </FormGroup>
            <FormGroup>
                <label htmlFor='to_mail'>E-Mail</label>
                <input type="email" name="to_mail" id="mail" defaultValue={mail} title="email"/>
            </FormGroup>
            <ButtonWrapper>
                <button type="button" onClick={handleEmail} title="Email-Adressen setzen">Adressen eingeben</button>
                <SendButton title="Absenden" >Absenden</SendButton>
            </ButtonWrapper>
        </Form>
      </NewsletterWrapper>
    </Container>
  )
}

export default CreateNewsletter