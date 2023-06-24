import mongoose, { Types } from 'mongoose';

export interface UserDocument extends mongoose.Document{
    vorname:string;
    nachname:string;
    username:string;
    email:string;
    street:string;
    number:string;
    plz:string;
    city:string;
    password:string;
    isAdmin:boolean;
    createdAt: Date;
    updatedAt: Date;
    _doc?: any;
    organization: Types.ObjectId;
  }
const UserSchema = new mongoose.Schema<UserDocument>({
    vorname:{type:String, required:true},
    nachname:{type:String, required:true},
    username:{type:String, unique:true, required:true },
    email:{type:String, required:true },
    street:{type:String, required:true },
    number:{type:String, required:true },
    plz:{type:String, required:true },
    city:{type:String, required:true },
    password:{type:String, required:true },
    isAdmin:{type:Boolean, default:false},
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
}, 
    {timestamps:true}
)

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;