import React from 'react';
import Home from './pages/Home';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Routes, Route} from 'react-router-dom'
import Sales from './pages/Sales';
import Analytics from './pages/Analytics';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Mail from './pages/Mail';
import Messages from './pages/Messages';
import User from './pages/User';
import Products from './pages/Products';
import SliderImages from './pages/SliderImages';
import DescriptionItems from './pages/DescriptionItems';
import { useAppSelector } from './app/hooks';
import UserDisplay from './pages/UserDisplay';
import ProductEdit from './pages/ProductEdit';
import DescriptionItemsEdit from './pages/DescriptionItemsEdit';
import SliderItemsEdit from './pages/SliderItemsEdit';
import NotFound from './pages/NotFound';
import SalesBill from './pages/SalesBill';
import ProtectedPage from './utils/ProtectedPage';
import Login from './pages/Login';
import {small, large} from './responsive';
const Container = styled.div`
  width:100%;
`;
const Wrapper = styled.div`
  width:100%;
  background:var(--white);
  display:flex;
  padding-bottom:10px;
`;
const ContentWrapper = styled.div`
  flex:4;
  border-left:1px solid var(--darkGray);
  padding:20px;
  ${small({padding:"4px", width:"50%"})};
  ${large({padding:"10px"})};
  overflow:hidden;
`;
const App:React.FC = ()=> {
    const admin = useAppSelector((state)=>state.auth.user?.isAdmin);
  return (
    <Container>
      {admin ? <Navbar/> : null}
      <Wrapper>
       {admin ? <Sidebar/> : null} 
        <ContentWrapper>
              <Routes>
                <Route path="/" element={<Login/>}/>
                <Route element={<ProtectedPage/>}>
                      <Route path="*" element={<NotFound />} />
                      <Route path="/home" element={<Home/>}/>
                      <Route path="/sales" element={<Sales/>}/>
                      <Route path="/analytics" element={<Analytics/>}/>
                      <Route path="/transactions" element={<Transactions/>}/>
                      <Route path="/reports" element={<Reports/>}/>
                      <Route path="/mail" element={<Mail/>}/>
                      <Route path="/messages" element={<Messages/>}/>
                      <Route path="/user" element={<User/>}/>
                      <Route path="/products" element={<Products/>}/>
                      <Route path="/sliderImage" element={<SliderImages/>}/>
                      <Route path="/descriptionItems" element={<DescriptionItems/>}/>
                      {/* Edits */}
                      <Route path="/showUser/:id" element={<UserDisplay/>}/>
                      <Route path="/showProduct/:id" element={<ProductEdit/>}/>
                      <Route path="/showDescriptionItem/:id" element={<DescriptionItemsEdit/>}/>
                      <Route path="/showSliderItem/:id" element={<SliderItemsEdit/>}/>
                      {/* Bill */}
                      <Route path="/bill/:id" element={<SalesBill/>}/>
                </Route>
              </Routes>
          </ContentWrapper>
        </Wrapper> 
    </Container>
  );
}


export default App;
