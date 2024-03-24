import { adminUrl } from "../endPoints"
import adminApiCalls from "./apiCalls"
import { FormValues } from "../../../utils/validations/loginValidations";




//@dec      Admin login
//@method   POST
export const adminPostLogin = (adminData:FormValues) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.login, adminData).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};


//@dec      All Users List
//@method   Get
export const adminUserList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrl.userList, null).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};

//@dec      All Users List
//@method   Get
export const adminUserBlock = (userId:{userId:string}) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.hashtagList, userId).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};