import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { UpdateSliderItemsData } from '../../pages/SliderItemsEdit'
import sliderItemService from './sliderItemService'
export interface SliderItem{
    _id?:string,
    id?:string,
    img:string,
    alt:string,
    title:string,
    createdAt:string,
    updatedAt:string,
}
export interface InitialState{
    sliderItem: SliderItem,
    allSliderItems:SliderItem[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState:InitialState ={
    sliderItem:{} as SliderItem,
    allSliderItems:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig ={
    state:RootState,
}
export const createSliderItem = createAsyncThunk<SliderItem, FormData, AsyncThunkConfig>('/sliderItems/create', async (sliderItemData, thunkAPI)=>{
    try{
        const token:string = thunkAPI.getState().auth.user!.accessToken;
        return sliderItemService.createSliderItem(sliderItemData, token);
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const updateSliderItem = createAsyncThunk<SliderItem, UpdateSliderItemsData, AsyncThunkConfig>('/sliderItems/update', async (updateSliderData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        console.log(updateSliderData)
        return sliderItemService.updateSliderItem(updateSliderData, token);
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const deleteSliderItem = createAsyncThunk<SliderItem, string, AsyncThunkConfig>('/sliderItems/delete', async (Id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return sliderItemService.deleteSliderItem(Id, token);
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const getSliderItem = createAsyncThunk<SliderItem, string, AsyncThunkConfig>('/sliderItems/find', async (Id, thunkAPI)=>{
    try{;
        return sliderItemService.getSliderItem(Id);
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const getAllSliderItems = createAsyncThunk<SliderItem[], void, AsyncThunkConfig>('/sliderItems/findAll', async (_, thunkAPI)=>{
    try{
        return sliderItemService.getAllSliderItems();
    }catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message as string)
    }
})
export const sliderItemsSlice = createSlice({
    name:"sliderItems",
    initialState,
    reducers:{
        reset: (state)=>initialState,
    },
    extraReducers(builder){
        builder
        .addCase(createSliderItem.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createSliderItem.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allSliderItems.push(action.payload);
        })
        .addCase(createSliderItem.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateSliderItem.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateSliderItem.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.sliderItem = action.payload;
        })
        .addCase(updateSliderItem.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteSliderItem.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteSliderItem.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allSliderItems = state.allSliderItems.filter((item)=>item._id !== action.payload.id);
        })
        .addCase(deleteSliderItem.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
        .addCase(getSliderItem.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getSliderItem.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.sliderItem = action.payload;
        })
        .addCase(getSliderItem.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getAllSliderItems.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllSliderItems.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.allSliderItems = action.payload;
        })
        .addCase(getAllSliderItems.rejected, (state, action:any)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})
export const {reset} = sliderItemsSlice.actions;
export default sliderItemsSlice.reducer;
