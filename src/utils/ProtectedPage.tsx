import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
const ProtectedPage = () => {
    const admin = useAppSelector((state)=>state.auth.user?.isAdmin);
  return (
        admin ? <Outlet/> :<Navigate to="/"/> 
      
  )
}

export default ProtectedPage
