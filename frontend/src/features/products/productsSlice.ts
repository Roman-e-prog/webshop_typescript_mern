import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import productsService from "./productsService";
export interface Product{
    _id?:string,
    id:string,
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
    product:Product,
    allProducts:Product[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState: InitialState ={
    product: {} as Product,
    allProducts:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig = {
    state:RootState
}
export const getProduct = createAsyncThunk<Product, string, AsyncThunkConfig>('/product/find', async (Id, thunkAPI)=>{
    try{
        return await productsService.getProduct(Id);
    }catch(error:any){
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
    }catch(error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})

export const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers(builder) {
        builder
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
    },
})
export const {reset} = productSlice.actions;
export default productSlice.reducer;