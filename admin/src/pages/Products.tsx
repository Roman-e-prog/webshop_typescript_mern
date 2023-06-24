import React from 'react'
import styled from 'styled-components';
import {useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllProducts, deleteProduct} from '../features/products/productsSlice';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import CreateProduct from '../components/CreateProduct';
import {AiFillEye, AiFillDelete} from 'react-icons/ai';
import {middle} from '../responsive';
const Container = styled.div`
  width:100%;
`;
const TableWrapper = styled.div`
    width:90%;
    margin: 0 auto;
`;
const Table = styled.table`
  width:100%;
  & thead{
    background:var(--coffee);
    color:var(--white);
  }
  & th{
    margin-right:5px;
    font-size:14px;
    padding:1px;
    text-align:center;
    font-weight:400;
    ${middle({fontSize:"12px",  marginRight:"2px"})}
  }
  & td{
    border: 1px solid var(--coffee);
    font-size:14px;
    margin-right:5px;
    text-align:left;
    padding:2px;
    ${middle({fontSize:"12px", marginRight:"2px"})}
  }
  & .btn{
    border:none;
  }
  & button{
    background:var(--coffee);
    color:var(--white);
    padding:4px;
    border:none;
    margin-left:10px;
  }
  & .img{
    width:75px;
    height:50px;
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
`;
const Products = () => {
const dispatch = useAppDispatch();
const allProducts = useAppSelector((state)=>state.products.allProducts);
const isError = useAppSelector((state)=>state.products.isError);
const isLoading = useAppSelector((state)=>state.products.isLoading);
const message = useAppSelector((state)=>state.products.message);
  useEffect(() => {
    if(isError){
      window.alert(message)
    }
    dispatch(getAllProducts())
  }, [dispatch, isError, message])
  const [products, setProducts] = useState<any>([]);

  useEffect(()=>{
    if(allProducts.length){
      setProducts(allProducts)
    }
  }, [allProducts]);

  const handleDelete = async (id:string)=>{
   await dispatch(deleteProduct(id));
    dispatch(getAllProducts());
    setProducts(allProducts);
  }
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);
  //search
  const [searchValue, setSearchValue]= useState('');
  const filteredProduct = products.filter((item:object)=>{
    return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
  }).slice(firstIndex, lastIndex);
  //sort
  const handleDefault = ()=>{
    setProducts([...products].sort((a,b)=>a.createdAt < b.createdAt ? -1 : 1));
  }
  const handleNew = ()=>{
    setProducts([...products].sort((a,b)=>a.createdAt > b.createdAt ? -1 :1));
  }
  const handleAlphabet = ()=>{
    setProducts(
      [...products].sort((a,b)=>{
        if(a.categories[0] < b.categories[0]){
          return -1;
        }
        else{
          return 1;
        }
      }))
  }
  const handleProducer = ()=>{
    setProducts(
      [...products].sort((a,b)=>{
        if(a.producer < b.producer){
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
      <Search callback={(searchValue:string)=>setSearchValue(searchValue)} />
      <ButtonWrapper>
        <SortButton onClick={handleDefault}>Zurücksetzen</SortButton>
        <SortButton onClick={handleNew}>Neueste zuerst</SortButton>
        <SortButton onClick={handleAlphabet}>Alphabetisch sortieren</SortButton>
        <SortButton onClick={handleProducer}>Nach Hersteller sortieren</SortButton>
      </ButtonWrapper>
      <TableWrapper style={{overflowX:"auto"}}>
        <Table>
          <thead>
            <tr>
              <th>Produktname</th>
              <th>Kategorie</th>
              <th>Produktbild</th>
              <th>Hersteller</th>
              <th>Im Bestand</th>
              <th>Preis</th>
              <th>Details</th>
              <th>Entf.</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduct ? filteredProduct.map((item:any)=>(
              <tr key={item._id}>
                <td>{item.title}</td>
                <td className="category">{item.categories.map((item:string[], index:number)=>(
                  <span key={index}>{item} </span>
                ))}</td>
                <td><img className="img" src={item.image} alt={item.categories.join(', ')} title={item.categories.join(', ')}/></td>
                <td>{item.producer}</td>
                <td>{String(item.inStock).includes('true') && <span>Ja</span>}</td>
                <td>{`${item.price} ${item.currency}`}</td>
                <td className="btn"><button type="button" title="Anzeigen"><Link to={`/showProduct/${item._id}`} className="link" style={{color:"var(--white)"}}
                ><AiFillEye title="Anzeigen"/></Link></button></td>
                <td className="btn"><button type="submit" title="Löschen" onClick={()=>handleDelete(item._id)}><AiFillDelete title="Löschen"/></button></td>
              </tr>
            ))
            : currentProducts.map((item:any)=>(
              <tr key={item._id}>
                <td>{item.title}</td>
                <td className="category">{item.categories.map((item:string[], index:number)=>(
                  <span key={index}>{item} </span>
                ))}</td>
                <td><img className="img" src={item.image} alt={item.categories.join(', ')} title={item.categories.join(', ')}/></td>
                <td>{String(item.inStock).includes('true') && <span>Ja</span>}</td>
                <td>{`${item.price} ${item.currency}`}</td>
                <td><button type="button" title="Anzeigen"><Link to={`/showProduct/${item._id}`}><AiFillEye title="Anzeigen"/></Link></button></td>
                <td id="btn"><button type="submit" title="Löschen" onClick={()=>handleDelete(item._id)}><AiFillDelete title="Löschen"/></button></td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination
        total={products.length}
        limit={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <CreateProduct setProducts={setProducts}/>
    </Container>
  )
}

export default Products
