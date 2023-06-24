import mongoose from 'mongoose'

interface PasswordResetDocument extends mongoose.Document{
    email:string,
    token:string
}
const PasswordResetSchema = new mongoose.Schema<PasswordResetDocument>({
    email:{type:String, required:true},
    token:{type:String, unique:true, required:true}
})

const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);

export default PasswordReset;