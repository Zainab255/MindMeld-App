import { sendVerficationEmail } from "@/helpers/sendverificationemail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";

import { sendVerficationEmail } from "@/helpers/sendverificationemail";

export async function POST(request:Request){
    await dbConnect()

    try {

        const {username, email  ,passward}= await request.json()

        const existingVerifiedUsername = UserModel.findOne({
            username,
            isVerifed:true
        })

        if (existingVerifiedUsername){
            return Response.json({
                success:false,
                messgae:"username is already taken"
            } ,{status:400})
        }


        const existingUserByEmail = await UserModel.findOne({email})

        const verfiedCode = Math.floor(100000+Math.random()*900000).toString()

        if(existingUserByEmail){
            if(existingUserByEmail.isVerfied){
                return Response.json({
                    success:false,
                    messgae:"user already exit with this email"
                },{status:400})
            }

else{
    const hashedPassward = await bcrypt.hash(passward , 10)
    existingUserByEmail.passward=hashedPassward;
    existingUserByEmail.verifycode= verfiedCode;
    existingUserByEmail.verifycodeExpiry= new Date(Date.now()+3600000)
    await existingUserByEmail.save()
}

        }else{
         const hashedPassward = await bcrypt.hash(passward, 10)
         const expiryDate= new Date()
         expiryDate.setHours(expiryDate.getHours()+1)

         const newUser = new UserModel({
             username,
                email,
                passward: hashedPassward,
                verifycode:verfiedCode,
                verifycodeExpiry:expiryDate,
                isAcceptedMessage :true,
                isVerifed: false,
                messages: []
         })

         await newUser.save()
        }

        // send verification email

        const emailResponse = await sendVerficationEmail(
            email,  
            username,
            verfiedCode
        )

        if(!emailResponse.success){
             return Response.json({
                success:false,
                message: emailResponse.message

             }, {status:500})
        }

        return Response.json({
            success:true,
            message: "user registerd successfuly . please verify email now"

         }, {status:201})
        
    } catch (error) {
        console.log('error registering user', error)
        return Response.json(
            {
                success:  false,
                message: 'error registering user'
            },
            {
                status:500
            }
        )
        
    }
}