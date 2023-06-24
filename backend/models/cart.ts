import mongoose from "mongoose";
export interface CartDocument extends mongoose.Document{
    user:object;
    cartProduct:object[];
    netto:number,
    amount:string,
    quantity:number,
    createdAt: Date;
    updatedAt: Date;
  };
const CartSchema = new mongoose.Schema<CartDocument>({
    user:{type:Object, required:true},
    cartProduct:{type:[{type:Object}], required:true},
    netto:{type:Number, required:true},
    amount:{type:String, required:true},
    quantity:{type:Number, required:true},
},
{timestamps:true}
)
const Cart = mongoose.model<CartDocument>("Cart", CartSchema);

export default Cart;