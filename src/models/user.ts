// install mongoose librarry y basically ik warm h jo k ik connection h jo k hmny y k hmny mongodb sy bt krni h tu ksy krni h 

import mongoose, { Schema, Document} from "mongoose";
// import schema and documents why documnents safety  k liye

export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type:String , // mongos m string smaller m jsy upr dekh lo or typescript m larger m likhty h means alpabats 
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }

})


export interface User extends Document{
    username: string;
    email: string;
    passward: string;
    verifycode:string;
    verifycodeExpiry:Date;
    isAcceptedMessage:boolean;
    isVerifed:boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type:String , // mongos m string smaller m jsy upr dekh lo or typescript m larger m likhty h means alpabats 
        required:[true,"username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match: [
            /^[\w\.-]+@[\w\.-]+\.\w{2,}$/, 
            'Please use a valid email address']
          
    },
    passward:{
        type:String,
        required:[true,"Passward  is required"],

    },
    verifycode:{
        type:String,
        required:[true,"verify code is required"],

    },
    verifycodeExpiry:{
        type:Date,
        required:[true,"verify code is required"],

    },
    isVerifed:{
        type:Boolean,
        Default:false

    },
    isAcceptedMessage:{
        type:Boolean,
        Default:true

    },
    messages:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User" , UserSchema)

// usermodel y wo wla part k database m already model h jo bhi creater h wo mujhy mil rha h  but moongose.model<user> y jo h y typescript h  but gar hm first time schema bna rhy h tu hm || kr k likhy gy or sb type bhi dy gy

export default UserModel;