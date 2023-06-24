import React, {ChangeEvent, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import Spinner from '../components/Spinner';
import { getProduct, updateProduct, reset } from '../features/products/productsSlice';
import {small} from '../responsive';
const Container = styled.div`
    width:100%;
`;
const Form = styled.form`
    width:100%;
    display:flex;
    ${small({flexDirection:"column"})}
`;
const InputGroup = styled.div`
    width:50%;
    ${small({width:"98%"})}
`;
const FormGroup = styled.div`
    display:flex;
    flex-direction:column;
    padding:5px;
    margin-left:15px;
    & label{
        margin-bottom:5px;
        color:var(--darkGray);
        font-size:17px;
    }
    & input{
        padding:5px;
        border:none;
        width:100%;
        box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
    }
    & textarea{
      padding:2px;
    }
    & .dateLabel{
        margin-bottom: 5px;
        color:var(--darkGray);
        font-size:17px;
        font-weight:400;
    }
    & span{
        padding:5px;
        border:none;
        width:40%;
        box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
    }
`;
const ButtonGroup = styled.div`
    width:40%;
    display:flex;
    flex-direction:column;
    padding: 250px 20px;
    ${small({padding:"5px", width:"80%"})}
`;
const UpdateButton = styled.button`
    background: var(--coffee);
    padding:10px;
    margin-bottom:20px;
    color: var(--white);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
const OkButton = styled.button`
    background: white;
    padding:10px;
    color: var(--darkGray);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
//typescript
type FileData = {
  image: File | null
}
 export interface UpdateProductData{
  productData:FormData,
  id:string,
}
const ProductEdit = () => {
  const dispatch = useAppDispatch();
  const product:any = useAppSelector((state)=>state.products.product);
  const isError = useAppSelector((state)=>state.products.isError);
  const isLoading = useAppSelector((state)=>state.products.isLoading);
  const message = useAppSelector((state)=>state.products.message);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(isError){
      window.alert(message);
    }
    dispatch(getProduct(id!));
    return ()=>{
      dispatch(reset());
    }
  }, [dispatch, isError, message, id]);

   const [formdata, setFormdata] = useState<{title:string, producer:string, categories:string[], desc:string, price:string, currency:string, colors:string[], sizes:string[], inStock:string, sale:string} >({
    title:"",
    producer:"",
    categories:[],
    desc:"",
    price:"",
    currency:"",
    colors:[],
    sizes:[],
    inStock:"",
    sale:"",
  })
  const {title, producer, categories, desc, price, currency, colors, sizes, inStock, sale} = formdata;
  const [filedata, setFiledata] = useState<FileData>({
    image: null
  })
  const [preview, setPreview] = useState<string | null>(null)
  const handleFileChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const files = e.currentTarget.files;
    if(!files){
      return;
    }
    const file = files[0];
    setFiledata({image:file});
    handlePreview(files[0]);
  }
  const handlePreview = (file:File)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      setPreview(reader.result as string);
    }
  }
  useEffect(()=>{
    if(product){
      setFormdata({
    title:product.title,
    producer:product.producer,
    categories:product.categories,
    desc:product.desc,
    price:product.price,
    currency:product.currency,
    colors:product.colors,
    sizes:product.sizes,
    inStock:product.inStock,
    sale:product.sale,
      })
    }
  }, [product])

  const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const productData = new FormData();
    productData.append("title", formdata.title);
    productData.append("producer", formdata.producer);
    productData.append("categories", JSON.stringify(formdata.categories));
    productData.append("desc", formdata.desc);
    productData.append("price", formdata.price);
    productData.append("currency", formdata.currency);
    productData.append("colors", JSON.stringify(formdata.colors));
    productData.append("sizes", JSON.stringify(formdata.sizes));
    productData.append("inStock", formdata.inStock);
    productData.append("sale", formdata.sale);
    productData.append("image", filedata.image!);
   
    const updatedata:UpdateProductData = {
      productData:productData,
      id:id!,
    }
    dispatch(updateProduct(updatedata));
    return ()=>{
      dispatch(reset())
    }

  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container>
        <Form onSubmit={onSubmit}>
          <InputGroup>
          <FormGroup>
            <label htmlFor="image">Bild</label>
            <input type="file" name="image" id="image" onChange={handleFileChange}/>
            {preview ? <img src={preview} alt="Vorschau" title="Vorschau"/>:
              <img src={product.image} alt={product.title} title={product.title}/>
            }
          </FormGroup>
          <FormGroup>
            <label htmlFor="title">Produktname</label>
            <input type="text" name="title" id="title" required defaultValue={title} onChange={(e)=>setFormdata({...formdata, title:e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="producer">Hersteller</label>
            <input type="text" name="producer" id="producer" required defaultValue={producer} onChange={(e)=>setFormdata({...formdata, producer:e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="categories">Kategorie</label>
            <input type="text" name="categories" id="categories" required defaultValue={categories} onChange={(e)=>setFormdata({...formdata, categories:[e.target.value]})}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="desc">Produktbeschreibung</label>
            <textarea name="desc" cols={10} rows={10} required defaultValue={desc} placeholder="Produktbeschreibung" onChange={(e)=>setFormdata({...formdata, desc:e.target.value})}></textarea>
          </FormGroup>
          <FormGroup>
            <label htmlFor="price">Preis</label>
            <input type="text" name="price" id="price" required defaultValue={price} onChange={(e)=>setFormdata({...formdata, price:e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="currency">Währung</label>
            <input type="text" name="currency" id="currency" required defaultValue={currency} onChange={(e)=>setFormdata({...formdata, currency:e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="colors">Farben</label>
            <input type="text" name="colors" id="colors" required defaultValue={colors} onChange={(e)=>setFormdata({...formdata, colors:[e.target.value]})}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="sizes">Größen</label>
            <input type="text" name="sizes" id="sizes" required defaultValue={sizes} onChange={(e)=>setFormdata({...formdata, sizes:[e.target.value]})}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="inStock">Im Bestand</label>
            <input type="text" name="inStock" id="inStock" defaultValue={String(inStock)} onChange={(e)=>setFormdata({...formdata, inStock:e.target.value})}/>
          </FormGroup>
          <FormGroup>
          <label htmlFor="sale">Sale</label>
          <input type="text" name="sale" id="sale" defaultValue={String(sale)} onChange={(e)=>setFormdata({...formdata, sale:e.target.value})}/>
        </FormGroup>
          <FormGroup>
            <h3 className='datelable'>Erstellt am:</h3>
            <span>{new Date(product.createdAt).toLocaleDateString("de-De", {day:"numeric", month:"numeric", year:"numeric"})}</span>
          </FormGroup>
          <FormGroup>
            <h3 className='datelabel'>Update am:</h3>
            <span>{new Date(product.updatedAt).toLocaleDateString("de-De", {day:"numeric", month:"numeric", year:"numeric"})}</span>
          </FormGroup>
          </InputGroup>
          <ButtonGroup>
            <UpdateButton title="Update">Update</UpdateButton>
          </ButtonGroup>
        </Form>
        <OkButton onClick={()=>navigate(-1)} title="Okay">Okay</OkButton>
    </Container>
  )
}

export default ProductEdit
