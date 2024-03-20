import {apiCall} from './apiCalls'
import { userUrls } from '../endPoints'
import { FormValues } from '../../../utils/validations/registerValidation'

//@dec      Register user
//method    POST
export const postRegister = (userData:FormValues) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrls.register, userData).then((response:any)=>{
                resolve(response);                
                console.log(response)
            })
        } catch (error) {
            resolve({status:500, message: "Somethings wrong."})
        }
    })
}
