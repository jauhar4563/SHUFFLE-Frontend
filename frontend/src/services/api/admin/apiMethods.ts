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
            adminApiCalls("post", adminUrl.userBlock, userId).then((response) => {
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


//@dec      Add new Hashtag
//@method   Get
export const addHashTags = (hashtag:{hashtag:string}) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.addHashtag, hashtag).then((response) => {
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


//@dec      Get Hashtags
//method    get

export const    getHashtags = () => {
    return new Promise((resolve, reject) => {
      try {
        adminApiCalls("get", adminUrl.hashtagList, null)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };
  
  
  //@dec     Block hashtags
//@method   Post
export const adminHashtagBlock = (hashtagId:{hashtagId:string}) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.blockHashtag, hashtagId).then((response) => {
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