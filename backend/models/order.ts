import mongoose from "mongoose";
export interface OrderDocument extends mongoose.Document{
    user:object
    netto:number;
    amount:string;
    createdAt: Date;
    updatedAt: Date;
  };
const OrderSchema = new mongoose.Schema<OrderDocument>({
    user:{type:Object, required:true},
    netto:{type:Number, required:true},
    amount:{type:String, required:true},
},
{timestamps:true}
);
const Order = mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;