import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteUser, getAllUser } from '../features/user/userSlice';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiFillEye, AiFillDelete} from 'react-icons/ai';
import {small} from '../responsive';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
const Container = styled.div`
    width:100%;
`;
const TableWrapper = styled.div`
    width:100%;
`;
const Table = styled.table`
width:90%;
margin: 0 auto;

  & thead{
      background:var(--coffee);
      color:var(--white);
  }
  & th{
      margin-right:5px;
      text-align:center;
      font-weight:400;
      ${small({fontSize:"12px"})}
  }
  & td{
      border: 1px solid var(--coffee);
      margin-right:5px;
      text-align:left;
      padding:2px;
      ${small({fontSize:"12px"})}
  }
  & .customerNumber{
    ${small({display:"none"})}
  }
  & .btn{
      border:none;
  }
  & button{
      padding:2px;
      background:var(--coffee);
      color:var(--white);
      cursor: pointer;
      border:none;
      margin-left:10px;
  }
`;
const ButtonWrapper = styled.div`
  width:90%;
  margin: 5px auto;
  padding:5px;
  display:flex;
`;
const SortButton = styled.button`
  background:var(--coffee);
  color:var(--white);
  padding:2px;
  margin-right:2px;
  border:none;
  ${small({fontSize:"12px"})}
`;
const User = () => {
 const dispatch = useAppDispatch();
 const allUser = useAppSelector((state)=>state.user.allUser);
 const isError = useAppSelector((state)=>state.user.isError);
 const isLoading = useAppSelector((state)=>state.user.isLoading);
 const message = useAppSelector((state)=>state.user.message);
    const [user, setUser] = useState<any>([])
 useEffect(()=>{
    if(isError){
        toast.error(message)
    }
    dispatch(getAllUser());
 },[dispatch, isError, message]);
 useEffect(()=>{
    if(allUser){
        setUser(allUser);
    }
 },[allUser])
 const [currentPage, setCurrentPage] = useState(1);
 const [userPerPage] = useState(5);
 const lastIndex = currentPage * userPerPage;
 const firstIndex = lastIndex - userPerPage;
 const currentUser = user.slice(firstIndex, lastIndex);
 //search
 const [searchValue, setSearchValue]= useState('');
 const filteredUser = user.filter((item:object)=>{
   return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
 }).slice(firstIndex, lastIndex);
 //delete
 const handleDelete = async (id:string)=>{
  await dispatch(deleteUser(id));
   dispatch(getAllUser());
   setUser(allUser);
 }
 //sort
 const handleDefault = ()=>{
    setUser([...user].sort((a,b)=>a.createdAt < b.createdAt ? -1 : 1));
  }
  const handleNew = ()=>{
    setUser([...user].sort((a,b)=>a.createdAt > b.createdAt ? -1 :1));
  }
  const handleAlphabet = ()=>{
    setUser([...user].sort((a,b)=> a.nachname < b.nachname ? -1: 1))
  }
  const handleCity = ()=>{
    setUser(
      [...user].sort((a,b)=>{
        if(a.city < b.city){
          return -1;
        }
        else{
          return 1;
        }
      }))
  }
 if(isLoading){
    return <Spinner/>
 }
  return (
    <Container>
        <ToastContainer/>
        <Search callback={(searchValue:string)=>setSearchValue(searchValue)} />
        <ButtonWrapper>
        <SortButton title="standard" onClick={handleDefault}>Standard</SortButton>
        <SortButton title="Neueste zuerst" onClick={handleNew}>Neueste zuerst</SortButton>
        <SortButton title="Alphabetisch" onClick={handleAlphabet}>Alphabetisch sortieren</SortButton>
        <SortButton title="Nach Stadt" onClick={handleCity}>Nach Stadt sortieren</SortButton>
      </ButtonWrapper>
        <TableWrapper style={{overflowX:"auto"}}>
            <Table>
                <thead>
                    <tr>
                        <th>Kundenname</th>
                        <th className="customerNumber">Kundennummer</th>
                        <th>Stadt</th>
                        <th>Anz</th>
                        <th>Entf</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUser ? filteredUser.map((item:any)=>(
                        <tr key={item._id}>
                            <td>{item.nachname}</td>
                            <td className="customerNumber">{item._id}</td>
                            <td>{item.city}</td>
                            <td className='btn'><button type="button" title="Anzeigen"><Link to={`/showUser/${item._id}`} className="link" style={{color:"var(--white)"}}><AiFillEye title="Anzeigen"/></Link></button></td>
                            <td className='btn'><button type="submit" title="Löschen" onClick={()=>handleDelete(item._id)}><AiFillDelete title="Löschen"/></button></td>
                        </tr>)) :
                        currentUser.map((item:any)=>(
                            <tr key={item._id}>
                                <td>{item.nachname}</td>
                                <td className="customerNumber">{item._id}</td>
                                <td>{item.city}</td>
                                <td className='btn'><button type="button" title="Anzeigen"><Link to={`/showUser/${item._id}`} className="link" style={{color:"var(--white)"}}><AiFillEye title="Anzeigen"/></Link></button></td>
                                <td className='btn'><button type="submit" title="Löschen" onClick={()=>handleDelete(item._id)}><AiFillDelete title="Löschen"/></button></td>
                            </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
        <Pagination
        total={user.length}
        limit={userPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Container>
  )
}

export default User


