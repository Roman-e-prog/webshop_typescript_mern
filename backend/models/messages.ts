import mongoose from 'mongoose';
interface MessagesDocument extends mongoose.Document{
    userMessage:string,
    userId:string,
    sendUsername:string,
    sendUserId:string
    createdAt:Date,
    updatedAt:Date,
}
const UserMessageSchema = new mongoose.Schema<MessagesDocument>({
    userMessage:{type:String, required:true},
    userId:{type:String},
    sendUsername:{type:String, required:true},
    sendUserId:{type:String, required:true}
},
{timestamps:true}
)

const UserMessage = mongoose.model<MessagesDocument>("UserMessage", UserMessageSchema);
export default UserMessage;