import mongoose from 'mongoose';

export interface NewsletterOrderDocument extends mongoose.Document{
    vorname:string,
    nachname:string,
    email:string,
    radiodata:string
}
const NewsletterOrderSchema = new mongoose.Schema<NewsletterOrderDocument>({
    vorname:{type:String, required:true},
    nachname:{type:String, required:true},
    email:{type:String, required:true},
    radiodata:{type:String, required:true},  
},
{timestamps:true}
)
const NewsletterOrder = mongoose.model<NewsletterOrderDocument>("NewsletterOrder", NewsletterOrderSchema);
export default NewsletterOrder;