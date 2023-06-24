import {createSlice} from '@reduxjs/toolkit';
import {PURGE} from 'redux-persist';
export interface CartProduct{
    product:object,
    _id:string,
    quantity:number;
    price:number;
}
export interface InitialState{
    cartProduct:CartProduct[],
    quantity:number,  
}
const initialState: InitialState ={
    cartProduct:[],
    quantity:0, 
}

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state, action)=>{
            const item = state.cartProduct.find((item)=>item._id === action.payload._id);
            if(item){
                item.quantity+= action.payload.quantity;
            } 
            else{
                state.cartProduct.push(action.payload);
            }
        },
        removeFromCart:(state, action)=>{
            state.cartProduct = state.cartProduct.filter(item=>item._id !== action.payload);   
        },
        resetCart:(state)=>{
            state.cartProduct = [];
            state.quantity = 0;
        }
    }, extraReducers(builder) {
        builder
        .addCase(PURGE, ()=>initialState)
        }
})

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;