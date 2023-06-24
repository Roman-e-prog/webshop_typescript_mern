import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import messageService from './messageService';
import { UpdateMessageData } from '../../components/MessagesEdit';

export interface UserMessage{
    _id?:string,
    id?:string,
    userMessage:string,
    userId:string,
    sendUsername:string
    sendUserId:string,
    createdAt:Date,
    updatedAt:Date,
}
export interface InitialState{
    userMessage:UserMessage[],
    allUserMessages:UserMessage[],
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    message:string,
}
const initialState: InitialState ={
    userMessage:[],
    allUserMessages:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}
type AsyncThunkConfig = {
    state:RootState
}
export const createMessage = createAsyncThunk<UserMessage, object, AsyncThunkConfig>('/userMessage/create', async (userMessageData, thunkAPI) => {
    try{
        const token:string = thunkAPI.getState().auth.user!.accessToken;
        return await messageService.createMessage(userMessageData, token);
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
export const updateMessage = createAsyncThunk<UserMessage[], UpdateMessageData, AsyncThunkConfig>('/userMessage/update', async (updateMessageData, thunkAPI)=>{
    try{
        const token:string = thunkAPI.getState().auth.user!.accessToken;
        return await messageService.updateMessage(updateMessageData, token);
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

export const deleteMessage = createAsyncThunk<UserMessage, string, AsyncThunkConfig>('userMessage/delete', async (Id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user!.accessToken;
        return await messageService.deleteMessage(Id, token);
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
export const getMessage = createAsyncThunk<UserMessage[], string, AsyncThunkConfig>('userMessage/find', async (Id, thunkAPI)=>{
    try{
      const token = thunkAPI.getState().auth.user!.accessToken;
        return await messageService.getMessage(Id, token);
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
export const getAllMessages = createAsyncThunk<UserMessage[], void, AsyncThunkConfig>('/message/findAll', async (_, thunkAPI)=>{
    try{
      const token = thunkAPI.getState().auth.user!.accessToken;
        return await messageService.getAllMessages(token);
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

export const messagesSlice = createSlice({
    name:"messages",
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers(builder) {
      builder
      .addCase(createMessage.pending, (state)=>{
        state.isLoading = true; 
      })
      .addCase(createMessage.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.userMessage.push(action.payload);
        console.log(action.payload)
      })
      .addCase(createMessage.rejected, (state,action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMessage.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(updateMessage.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.userMessage = action.payload;
      })
      .addCase(updateMessage.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMessage.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.userMessage = state.userMessage.filter((item)=>item._id !== action.payload.id);
      })
      .addCase(deleteMessage.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMessage.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(getMessage.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.userMessage = action.payload;
      })
      .addCase(getMessage.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllMessages.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.allUserMessages = action.payload;
      })
      .addCase(getAllMessages.rejected, (state, action:any)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    }
})

export const {reset} = messagesSlice.actions;
export default messagesSlice.reducer;