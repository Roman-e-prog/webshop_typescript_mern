import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import descriptionItemService from './descriptionItemsService';
export interface DescriptionItem{
    _id?:string,
    id?:string,
    title:string,
    text:string,
    createdAt: Date,
    updatedAt: Date,
}
export interface InitialState{
    descriptionItem: DescriptionItem[],
    allDescriptionItems: DescriptionItem[],
    isLoading: boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string
}
const initialState: InitialState = {
    descriptionItem:[],
    allDescriptionItems:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig = {
    state:RootState
}

export const getDescriptionItem = createAsyncThunk<DescriptionItem[], string, AsyncThunkConfig>('descriptionItem/get', async (Id, thunkAPI)=>{
    try{
        return await descriptionItemService.getDescriptionItem(Id);
    }catch (error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const getAllDescriptionItem = createAsyncThunk<DescriptionItem[], void, AsyncThunkConfig>('descriptionItem/getAll', async (_, thunkAPI)=>{
    try{
        return await descriptionItemService.getAllDescriptionItem();
    }catch (error:any){
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const descriptionItemSlice = createSlice({
    name:"descriptionItem",
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers(builder){
        builder
        .addCase(getDescriptionItem.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDescriptionItem.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.descriptionItem = action.payload;
        })
        .addCase(getDescriptionItem.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllDescriptionItem.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllDescriptionItem.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allDescriptionItems = action.payload;
        })
        .addCase(getAllDescriptionItem.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset} = descriptionItemSlice.actions;
export default descriptionItemSlice.reducer;