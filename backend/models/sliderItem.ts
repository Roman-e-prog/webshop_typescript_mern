import mongoose from 'mongoose';
export interface SliderItemsDocument extends mongoose.Document{
    img:string;
    cloudinary_id:string;
    alt:string;
    title:string;
    createdAt: Date;
    updatedAt: Date;
  };
  const SliderItemsSchema = new mongoose.Schema<SliderItemsDocument>({
    img:{type:String, required:true},
    cloudinary_id:{type:String, required:true},
    alt:{type:String, required:true},
    title:{type:String, required:true},
    
  },
  {timestamps:true},
  );
  const SliderItems = mongoose.model<SliderItemsDocument>("SliderItems", SliderItemsSchema);

  export default SliderItems;