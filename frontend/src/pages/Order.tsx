import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../app/hooks';
import { Link, useNavigate, } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import Pay from '../components/Pay';
import {small} from '../responsive';

const Container = styled.div`
    width:100%;
`;
const TitleHolder = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Title = styled.h1`
  font-size:30px;
`;
const AddressWrapper = styled.div`
  width:50%;
  border:1px solid var(--coffee);
  padding:10px;
  margin:0 auto;
`;
const ShippingAddress = styled.div`

& h2{
  color:var(--fontColor);
  font-size:26px;
  margin-bottom:5px;
}
& #street{
  margin: 2px 0;
  display:flex;
  align-items:center;
  
  & span{
    margin-right:2px;
  }
}
& #city{
  margin: 2px 0;
  display:flex;
  align-items:center;
  
  & span{
    margin-right:2px;
  }
}
`;

const UserEdit = styled.div`
  width:50%;
  margin: 5px auto;
`;
const EditButton = styled.button`
  width:200px;
  padding:5px;
  background:var(--coffee);
  color:var(--white);
  border:none;
  cursor: pointer;
  box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
const BillWrapper = styled.div`
  width: 100%;
  overflow:auto
`;
const Bill = styled.table`
  width:80%;
  margin:20px auto;
  border:1px solid var(--coffee);
    padding:10px;
    ${small({width:"100%"})}

  & caption{
    font-weight:600;
    color:var(--fontColor);
  }
  & th{
    background:var(--coffee);
    color:var(--white);
    text-align:center;
    font-weight:300;
    width:20%;
    margin:0 5px;
  }
  & tr{
    margin:5px 0;
  }
  & tbody td{
    font-weight:600;
    text-align:center;
  }
`;
const Summary = styled.div`
  width:80%;
  margin:0 auto;
  border: 1px solid var(--coffee);
  padding:10px;
  display:flex;
  flex-direction:column;
`;
const SummaryItem = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin: 0 10px;

  & .Key, .Price{
    font-weight:600;
    color:var(--fontColor);
  }
`;
const Order = () => {
    const user:any = useAppSelector((state)=>state.auth.user);
    const cartProduct = useAppSelector((state)=>state.cart.cartProduct);
    const navigate = useNavigate();
   
    const getTotal = () => {
      let totalPrice = 0
      cartProduct.forEach(item => {
        totalPrice += item.price * item.quantity
      })
      return totalPrice
    }
    let total = getTotal()
   
    const versand = ()=>{
  if(total === 0){
    return 0
  }
  else{
    return 5.90
  }
}
  const versandRabatt = ()=>{
    if(total > 50){
      return -5.90
    } else{
      return 0;
    }
  }
  const netto = Math.round(((total + versand() + versandRabatt()) /1.19 + Number.EPSILON) * 100) / 100;
    useEffect(() => {
      if(!user){
        navigate('/cartProtect')
      }
    }, [navigate, user])
    
  return (
    <Container>
      <Navbar/>
      <Logo/>
      <TitleHolder>
        <Title>Kasse</Title>
        </TitleHolder>
        <AddressWrapper>
        <ShippingAddress>
          <h2>Lieferanschrift</h2>
          <span>{user!.vorname} {user!.nachname}</span>
          <div id="street">
            <span>{user!.street}</span>
            <span>{user!.number}</span>
          </div>
          <div id="city">
            <span>{user!.plz}</span>
            <span>{user!.city}</span>
          </div>
        </ShippingAddress>
        </AddressWrapper>
        <UserEdit>
          <EditButton><Link to={`/showUser/${user._id}`} className="link" style={{color:"var(--white)", display:"block"}} title="Änderung Ihrer Daten">Änderung Ihrer Daten</Link></EditButton>
        </UserEdit>
        <BillWrapper>
          <Bill>
              <caption>Rechnungsdaten</caption>
            <thead>
              <tr>
                <th>Artikel</th>
                <th>Hersteller</th>
                <th>Artikelnummer</th>
                <th>Stückzahl</th>
                <th>Preis</th>
              </tr>
            </thead>
            <tbody>
              {cartProduct.map((item:any, index)=>(
                <tr key={index}>
                  <td>{item.title || item.product.title}</td>
                  <td>{item.producer || item.product.producer}</td>
                  <td>{item._id}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>        
          </Bill>
          <Summary>
              <SummaryItem>
                <span className="Key">Zwischensumme:</span>
                <span className="Price">{total.toFixed(2)} €</span>
              </SummaryItem>
              <SummaryItem>
              <span className="Key">Versandkosten:</span>
                <span className="Price">{versand().toFixed(2)} €</span>
              </SummaryItem>
              {total > 50 &&
              <SummaryItem>
                <span className="Key">Versandkostenerlass</span>
                <span className="Price">{(versandRabatt()).toFixed(2)} €</span>
              </SummaryItem> 
              }
              <SummaryItem>
                <span className="Key">Netto:</span>
                <span className="Price">{(netto).toFixed(2)} €</span>
              </SummaryItem>
              <SummaryItem>
                <span className="Key">Mehrwertsteuer 19 %</span>
                <span className="Price">{((total + versand() + versandRabatt())- netto).toFixed(2)} €</span>
              </SummaryItem>
              <SummaryItem>
                <span className="Key">Gesamt:</span>
                <span className="Price">{(total + versand() + versandRabatt()).toFixed(2)} €</span>
              </SummaryItem>
            </Summary>
        </BillWrapper>
        <Pay
        amount={(total + versand() + versandRabatt()).toFixed(2)}
        />
        <Footer/>
    </Container>
  )
}

export default Order
