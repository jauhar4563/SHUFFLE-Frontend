import {apiCall} from './apiCalls'
import { userUrls } from '../endPoints'
import { FormValues } from '../../../utils/validations/registerValidation'

//@dec      Register user
//method    POST
export const postRegister = (userData:FormValues) => {
    return new Promise((resolve) => {
        try {
            apiCall("post", userUrls.register, userData).then((response)=>{
                resolve(response);                
                console.log(response)
            })
        } catch (error) {
            resolve({status:500, message: "Somethings wrong."})
        }
    })
}


export const postOTP = (otp:{otp:string})=>{
    return new Promise((resolve)=>{
        try {
            console.log(otp)
            apiCall("post", userUrls.registerOtp, otp).then((response)=>{
                
                resolve(response);
                console.log("apiMethods"+response);
            })
            
        } catch (error) {
            resolve({status:500, message: "Somethings wrong."})
            
        }
    })
    }


// Resend OTP

export const postResendOTP = (email:{email:string})=>{
    return new Promise((resolve)=>{
        try {
            console.log(email)
            apiCall("post", userUrls.resendOtp, email).then((response)=>{
                
                resolve(response);
                console.log("apiMethods"+response);
            })
            
        } catch (error) {
            resolve({status:500, message: "Somethings wrong."})
            
        }
    })
    }