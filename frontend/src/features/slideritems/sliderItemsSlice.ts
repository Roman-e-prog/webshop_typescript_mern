import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import sliderItemService from './sliderItemsService'
export interface SliderItems{
    _id?:string,
    id?:string,
    img:string,
    alt:string,
    title:string,
    createdAt:string,
    updatedAt:string,
}
export interface InitialState{
    sliderItem: SliderItems[],
    allSliderItems:SliderItems[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState:InitialState ={
    sliderItem:[],
    allSliderItems:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig ={
    state:RootState,
}
export const getAllSliderItems = createAsyncThunk<SliderItems[], void, AsyncThunkConfig>('/sliderItems/findAll', async (_, thunkAPI)=>{
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
