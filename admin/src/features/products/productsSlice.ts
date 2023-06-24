import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import productsService from './productsService'
import {UpdateProductData} from '../../pages/ProductEdit'
import { PURGE } from 'redux-persist'
export interface Product{
    _id?:string,
    id?:string,
    image:string,
    title:string,
    producer:string,
    categories:string[],
    desc:string,
    price:string,
    currency:string,
    colors:string[],
    sizes:string[],
    inStock:boolean,
    sale:boolean,
    createdAt:Date,
    updatedAt?:Date,
}
export interface InitialState{
    product: Product,
    allProducts:Product[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState: InitialState ={
    product:{} as Product,
    allProducts:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig = {
    state:RootState
}
export const createProduct = createAsyncThunk<Product, FormData, AsyncThunkConfig>('/product/create', async (productData, thunkAPI) => {
    try{
        const token:string = thunkAPI.getState().auth.user!.accessToken;
        return await productsService.createProduct(productData, token);
    } catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const updateProduct = createAsyncThunk<Product, UpdateProductData, AsyncThunkConfig>('/product/update', async (updateProductData, thunkAPI)=>{
    try{
        const token:string = thunkAPI.getState().auth.user!.accessToken;
        return await productsService.updateProduct(updateProductData, token);
    } catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})

export const deleteProduct = createAsyncThunk<Product, string, AsyncThunkConfig>('product/delete', async (Id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await productsService.deleteProduct(Id, token);
    } catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const getProduct = createAsyncThunk<Product, string, AsyncThunkConfig>('product/find', async (Id, thunkAPI)=>{
    try{
        return await productsService.getProduct(Id);
    } catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const getAllProducts = createAsyncThunk<Product[], void, AsyncThunkConfig>('/product/findAll', async (_, thunkAPI)=>{
    try{
        return await productsService.getAllProducts();
    } catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})

export const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers(builder) {
      builder
      .addCase(PURGE, ()=>initialState)
      .addCase(createProduct.pending, (state)=>{
        state.isLoading = true; 
      })
      .addCase(createProduct.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.allProducts.push(action.payload);
      })
      .addCase(createProduct.rejected, (state,action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.allProducts = state.allProducts.filter((item)=>item._id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllProducts.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    }
})
export const productValue = (state: RootState)=>state.products.product;
export const {reset} = productsSlice.actions;
export default productsSlice.reducer;