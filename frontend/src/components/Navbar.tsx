import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { marken, navlinks, sales, schuheDropdown, sport } from '../data';
import {AiOutlineLogin, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineLogout} from 'react-icons/ai';
import {useState} from 'react';
import { logout, reset } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {middle, small} from '../responsive';
import {persistStore} from 'redux-persist'
import { store } from '../app/store';
const persistor = persistStore(store);
const Container = styled.div`
    width:100%;
    height:120px;
    display:flex;
    flex-direction:column;
    position:sticky;
    top:0;
    z-index:99;
`;
const Announcement = styled.div`
    width:100%;
    height:40%;
    display:flex;
    background: var(--coffee);
    display:flex;
    align-items:center;
    justify-content:space-around;
    ${small({flexDirection:"column", height:"50%"})};
    & span{
    color: var(--white);
    font-size:16px;
    font-weight:500;
    ${middle({fontSize:"12px"})};
    
    }
`;
const Nav = styled.nav`
    width:100%;
    height:80%;
    background:var(--gray);
    display:flex;
    align-items:center;
    justify-content:space-between;
`;
const Ul = styled.ul`
  display:flex;
  margin-left:40px;
  flex-wrap:wrap;
`;
const  Li = styled.li`
    margin-right:40px;
    ${middle({marginRight:"20px"})}
`;
const IconWrapper = styled.div`
  display:flex;
  height:26px;
  margin-right:40px;

  & .buttonStyle{
    color:var(--fontColor); 
    font-weight:600; 
    margin-left:40px;
    font-size:36px;
  }
  & #wishlistLink, #shoppingCartLink{
    color:var(--fontColor);
    position:relative;
  }
`;
const DropdownWrapper = styled.div`
  position:relative;
  width:50%;
  ${middle({width:"75%"})}
  ${small({width:"100%"})};
`;
const Dropdown = styled.div`
  position:absolute;
  top:120;
  width:100%;
  height:300px;
  background:var(--gray);
  padding:10px;
  ${small({width:"100%",padding:"1px", height:"100vh"})};

    & div{
      flex:1;
      margin:0 2px;
      border-top:1px solid var(--fontColor);
    }
  
  & p{
    font-weight:bold;
    font-size:20px;
    margin-bottom:3px;
    ${small({fontSize:"16px"})};
  }
  & #li{
    font-size:16px;
    font-weight:500;
    padding:4px;
    display:flex;
    flex-direction:column;
    cursor: pointer;
    ${small({fontSize:"14px",marginBottom:"6px", padding:"1px"})};
    &:hover{
      font-weight:600;
    }
  }
`;
const InnerUl = styled.div`
  display:flex;
  width:100%;
  ${small({flexDirection:"column"})};
`;
const ListItem = styled.span`
font-size:16px;
    font-weight:500;
    padding:4px;
    cursor: pointer;
    ${small({fontSize:"13px",marginBottom:"6px", padding:"1px"})};
    &:hover{
      font-weight:600;
    }
`;
const WishlistIcon = styled.span`
  height:18px;
  width:18px; 
  border-radius:50%;
  background:var(--coffee); 
  color:var(--white); 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  position:absolute; 
  top:0; 
  right:0;
`;
const ShoppingCartIcon = styled.span`
  height:18px;
  width:18px; 
  border-radius:50%;
  background:var(--coffee); 
  color:var(--white); 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  position:absolute; 
  top:0; 
  right:0;
`;
//TypeScript
interface Schuhe {
  id:number,
  title:string,
  content:string[],
}
interface Sales {
  id:number,
  title:string,
  content:string[]
}
interface Sport {
  id:number,
  title?:string,
  content:string[],
}
interface Marken {
  id:number,
  title:string
  content:string[]
}
const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state)=>state.auth.user);
  const cartProduct = useAppSelector((state)=>state.cart.cartProduct)
  const wishlist= useAppSelector((state)=>state.wishlist.wishlist);
  const wishlistQuantity = wishlist.filter((item)=>item.userId === user?._id);
  const getQuantity = ()=>{
    let totalQuantity = 0;
    cartProduct.forEach((item)=>{
      totalQuantity += item.quantity;
    })
    return totalQuantity
  }
  const navigate = useNavigate();
  const onLogout = ()=>{
    dispatch(logout());
    dispatch(reset());
    persistor.purge();
    navigate('/');
  }
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<Schuhe[] | Sales[] | Sport[] | Marken[]>([])
  //dropdown
  const handleEnter = (name:string)=>{
    setIsOpen(true);
    if(name === "Schuhe"){
      setContent(schuheDropdown);
    }
    else if(name === "Sale"){
      setContent(sales)
    }
    else if(name === "Sport"){
      setContent(sport)
    }
    else{
      setContent(marken)
    }
  }
  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>)=>{
    setIsOpen(false);
  }
  return (
    <Container>
      <Announcement>
        <span>60 Tage Rückgaberecht</span>
        <span id="abholung">Abholung auch in den Shops</span>
        <span>Kostenloser Rückversand</span>
        <span>Kostenlose Hotline</span>
      </Announcement>
      <Nav>
        <DropdownWrapper>
          <Ul>
            {navlinks.map((item)=>(
              <Li key={item.id} onMouseEnter={()=>handleEnter(item.name)}><Link to={`/${item.link}`} id="blackLink" className="link" style={{fontWeight:"600"}} title={item.name}>{item.name}</Link></Li>
            ))}
          </Ul>
          {isOpen ? <Dropdown onMouseLeave={handleMouseLeave}>
            <InnerUl role="ul">
                {content.map((item)=>(
                <div key={item.id}>
                  <ListItem key={item.id} role="li">
                    <p>{item.title}</p>
                  </ListItem>
                  <div id='li'>{item.content.map((c)=>(
                    <ListItem key={c} role="li"><Link to={{pathname:`/${c.replace(/\s+/g, '')}`}} className="link" id="blackLink"  title={c}>{c}</Link></ListItem>
                  ))}</div>
                </div>
                ))}
              </InnerUl>
          </Dropdown> : null}
        </DropdownWrapper>
        <IconWrapper>
          {user ? <AiOutlineLogout className="buttonStyle" onClick={onLogout} title="Logout"/>:
           <Link to="/login"><AiOutlineLogin className="buttonStyle" title="Login"/></Link>
          }
            <Link to="/wunschliste" className="link" id="wishlistLink"><AiOutlineHeart className="buttonStyle"/><WishlistIcon>{wishlistQuantity.length}</WishlistIcon></Link>

            <Link to="/cart" className="link" id="shoppingCartLink"><AiOutlineShoppingCart className="buttonStyle"/><ShoppingCartIcon>{getQuantity()}</ShoppingCartIcon></Link>
        </IconWrapper>
      </Nav>
    </Container>
  )
}

export default Navbar
