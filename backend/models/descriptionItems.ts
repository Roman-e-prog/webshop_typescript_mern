import mongoose from 'mongoose';
export interface DescriptionItemDocument extends mongoose.Document{
    title:string;
    text:string;
    createdAt: Date;
    updatedAt: Date;
  }
const DescriptionItemSchema = new mongoose.Schema<DescriptionItemDocument>({
    title:{type:String, required:true},
    text:{type:String, required:true},
},
{timestamps:true},
);
const DescriptionItem = mongoose.model<DescriptionItemDocument>("DescriptionItem", DescriptionItemSchema);

export default DescriptionItem;