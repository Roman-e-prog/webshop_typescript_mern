import React,{useEffect, useRef} from 'react'
import styled from 'styled-components'
import {FaShoePrints} from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams} from 'react-router-dom';
import { getCartdata} from '../features/cartdata/cartSlice';
import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf";
import {small, middle} from '../responsive';
const Container = styled.div`
    width:100%;
`; 
const BillWrapper = styled.div`
    width:100%;
`;
const Bill = styled.div`
  width:90%;
  margin: 0 auto;
  border: 1px solid var(--fontColor);
  border-top:none;
`;
const LogoWrapper = styled.div`
  width:100%;
  height:100px;
  background:var(--coffee);
`;
const Logo = styled.div`
  width:50%;
  height:100%;
  padding:10px;
  display:flex;
  align-items:center;
  color:var(--white);
  ${small({flexDirection:"column"})}

  & .logoContent{
    font-size:26px; 
    margin-right:5px;
    ${middle({fontSize:"16px"})}
  }
`;
const AdressWrapper = styled.div`
  width:100%;
  /* height:150px; */
  padding:10px;
  display:flex;
  flex-wrap:wrap;
`;
const CompanyAdress = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;

  & #companyName{
    font-weight:600;
  }
  & #companEmail{
    margin:4px 0;
  }
`;
const ClientAdress = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;

  & .street{
    display:flex;
    margin-top: 4px;
  }
  & span{
    margin-right:2px;
  }
`;
const ContentWrapper = styled.div`
  width:100%;
`;
const TitleWrapper = styled.div`
  width:100%;
  padding:10px;
  display:flex;
  align-items:center;
`;
const ClientNumber = styled.span`
  margin-top:5px;

  & span{
    font-weight:600;
    ${middle({fontWeight:"500"})}
  }
  & #clientnumber{
    ${small({fontSize:"12px"})}
  }
`;
const BillNumber = styled.span`
  margin-top:5px;

& span{
  font-weight:600;
  ${middle({fontWeight:"500"})}
}
& #billnumber{
  ${small({fontSize:"12px"})}
}
`;
const Title = styled.h2`
  font-size:20px;
  ${middle({fontSize:"16px"})}
`;
const BillContentWrapper = styled.div`
  width:100%;
`;
const BillContent = styled.div`
  width:100%;

  & #productWrapper{
    width:100%;
    display:flex;
    padding: 0 20px;
    font-weight:600;
    ${small({flexDirection:"column"})}

    & .productData{
      flex:1;
    }
  }
`;
const PayContent = styled.div`
  width:100%;
  display:flex;
  justify-content:space-around;
  ${small({flexDirection:"column"})}

  & .priceGroup{
    display:flex;
    flex-direction:column;
    padding:20px;
    ${small({padding:"5px"})}

    & span{
      margin:10px;
      ${small({margin:"5px"})}
    }
    & .pricing{
      font-weight:600;
    }
  }
`;
const Download = styled.div`
  width:90%;
  margin:10px auto;

  & button{
    color:var(--white);
    background:var(--coffee);
    padding:5px;
    border:none;
    cursor:pointer;
  }
`;
const SalesBill = () => {
  const dispatch = useAppDispatch();
  const cartdata = useAppSelector((state)=>state.cartdata.cartdata);
  const client:any  = useAppSelector((state)=>state.cartdata.cartdata.user)
  const billContent = useAppSelector((state)=>state.cartdata.cartdata.cartProduct)
 
  const {id} = useParams()
  console.log(id);
  useEffect(() => {
      dispatch(getCartdata(id!))
  
  }, [dispatch, id])
  const copyCartdata = {...cartdata};
  
  //Download
  const billRef = useRef<HTMLDivElement | null>(null);
  const savePDF = ()=> {
    const printArea = billRef.current;
    html2canvas(printArea!).then(canvas => {
        const dataURL = canvas.toDataURL();
        const pdf = new jsPDF();

        pdf.addImage(dataURL, 'JPEG', 5, 5, 200, 100);

        pdf.save('saved.pdf')
    })
}

  return (
    <Container>
      <BillWrapper>
        <Bill ref={billRef}>
          <LogoWrapper>
          <Logo>
            <span className="logoContent">R A R</span><FaShoePrints className="logoContent"/>
            <span className="logoContent">Schuhmode</span>
          </Logo>
          </LogoWrapper>
          <AdressWrapper>
            <ClientAdress>
                <span>{client?.vorname} {client?.nachname}</span>
                <div className="street">
                  <span>{client?.street}</span>
                  <span>{client?.number}</span>
                </div>
                <div className='street'>
                  <span>{client?.plz}</span>
                  <span>{client?.city}</span>
                </div>
                <ClientNumber><span>Kundennummer: </span><span id="clientnumber">{client?._id}</span></ClientNumber>
                  <BillNumber><span>Rechungsnummer: </span><span id="billnumber">{copyCartdata._id}</span></BillNumber>
            </ClientAdress>
            <CompanyAdress>
              <span id="companyName">RAR Schuhmode</span>
              <span id="companyEmail">Schuhmode@rar.de</span>
              <span>01234/12345</span>
            </CompanyAdress>
          </AdressWrapper>
          <ContentWrapper>
            <TitleWrapper>
              <Title>Rechnung</Title>
            </TitleWrapper>
          </ContentWrapper>
          <BillContentWrapper>
            <BillContent>
                {billContent && billContent.map((item:any)=>(
                  <div id="productWrapper" key={item._id}>
                    <div className="productData">
                      <span>{item.title}</span>
                    </div>
                    <div className="productData">
                      <span>{item.quantity} Artikel</span>
                    </div>
                    <div className="productData">
                      <span>{item.price} €</span>
                    </div>
                  </div>
                ))}
            </BillContent>
            <PayContent>
                <div className='priceGroup'>
                  <span className='pricing'>Netto</span>
                  <span>{copyCartdata.netto} €</span>
                </div>
                <div className='priceGroup'>
                  <span className='pricing'>Umsatzsteuer</span>
                  <span>{(parseFloat(copyCartdata.amount) - copyCartdata.netto).toFixed(2)} €</span>
                </div>
                <div className='priceGroup'>
                  <span className='pricing'>Brutto</span>
                  <span>{copyCartdata.amount} €</span>
                </div>
            </PayContent>
          </BillContentWrapper>
        </Bill>
      </BillWrapper>
      <Download>
      <button onClick={()=>savePDF()}>Download</button>
      </Download>
     
    </Container>
  )
}

export default SalesBill

