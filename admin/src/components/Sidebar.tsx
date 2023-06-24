import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {FaHome, FaMoneyBillWaveAlt} from 'react-icons/fa';
import {HiTrendingUp} from 'react-icons/hi'
import {MdTimeline, 
    MdOutlineBarChart,
    MdMailOutline,
    MdOutlineNotificationImportant} from 'react-icons/md';
import {small, middle} from '../responsive'
const Container = styled.div`
    flex:1;
`;
const Menue = styled.ul`
    display:flex;
    flex-direction:column;
    width:100%;
`;
const MenueItem = styled.li`
    display:flex;
    align-items:center;
    color:var(--darkGray);
    width:100%;
    padding:10px;
    cursor: pointer;
    font-size:20px;
    ${middle({padding:"5px"})}
    ${small({fontSize:"16px"})}
`;
const Sidebar = () => {
  return (
    <Container>
      <Menue>
        <MenueItem>
            <FaHome/>
            <Link to="/" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}} title="Home">Home</Link>
        </MenueItem>

        <MenueItem>
            <HiTrendingUp/>
            <Link to="/sales" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}} title="Sales">Sales</Link>
        </MenueItem>

        <MenueItem>
            <MdTimeline/>
            <Link to="/analytics" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}} title="Analytics">Analytics</Link>
        </MenueItem>

        <MenueItem>
            <FaMoneyBillWaveAlt/>
            <Link to="/transactions" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}} title="Transaktionen">Transaktionen</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineBarChart/>
            <Link to="/reports" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}} title="Reports">Reports</Link>
        </MenueItem>

        <MenueItem>
            <MdMailOutline/>
            <Link to="/mail" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}} title="Mail">Mail</Link>
        </MenueItem>

        <MenueItem>
            <MdOutlineNotificationImportant/>
            <Link to="/messages" className="link" style={{color:"var(--darkGray)", marginLeft:"5px"}} title="Nachrichten">Nachrichten</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/user" className="link" style={{color:"var(--darkGray)"}} title="User">User</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/products" className="link" style={{color:"var(--darkGray)"}} title="Produkte">Produkte</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/sliderImage" className="link" style={{color:"var(--darkGray)"}} title="Slider Bilder">Slider Bilder</Link>
        </MenueItem>

        <MenueItem>
            <Link to="/descriptionItems" className="link" style={{color:"var(--darkGray)"}} title="Text Frontseite">Text Frontseite</Link>
        </MenueItem>
      </Menue>
    </Container>
  )
}

export default Sidebar
