import { apiCall } from "./apiCalls";
import { postUrls, userUrls } from "../endPoints";
import { FormValues } from "../../../utils/validations/registerValidation";

//@dec      Register user
//method    POST

export const postRegister = (userData: FormValues) => {
  return new Promise((resolve,reject) => {
    try {
      apiCall("post", userUrls.register, userData).then((response) => {
        resolve(response);
        console.log(response);
      }) .catch((err) => {
        reject(err);
      });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      OTP Verification
//method    POST

export const postOTP = (otp: { otp: string }) => {
  return new Promise((resolve,reject) => {
    try {
      console.log(otp);
      apiCall("post", userUrls.registerOtp, otp).then((response) => {
        resolve(response);
        console.log("apiMethods" + response);
      }) .catch((err) => {
        reject(err);
      });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Resend OTP
//method    POST

export const postResendOTP = (email: { email: string }) => {
  return new Promise((resolve,reject) => {
    try {
      console.log(email);
      apiCall("post", userUrls.resendOtp, email).then((response) => {
        resolve(response);
        console.log("apiMethods" + response);
      }) .catch((err) => {
        reject(err);
      });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      User Login
//method    POST

export const postLogin = (userData: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.login, userData)
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

//@dec      Google signup  user
//method    POST

export const googleAuthenticate = (userData: {
  username: string;
  email: string;
  imageUrl: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.googleAuth, userData)
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

//@dec      Forgot Password
//method    POST


export const forgotPassword = (email: { email: string }) => {
    return new Promise((resolve,reject) => {
      try {
        console.log(email);
        apiCall("post", userUrls.forgotPassword, email).then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        }) .catch((err) => {
          reject(err);
        });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };


  //@dec      Forgot Password OTP sent
//method    POST


  export const forgotOTP = (otp: { otp: string }) => {
    return new Promise((resolve,reject) => {
      try {
        console.log(otp);
        apiCall("post", userUrls.forgotOtp, otp).then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        }) .catch((err) => {
          reject(err);
        });
      } catch (error) {
        resolve({ status: 500, message: "Somethings wrong." });
      }
    });
  };

//@dec      Renew Password
//method    POST

  export const renewPassword = (userData: { password: string; confirmPassword: string }) => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", userUrls.resetPassword, userData)
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


//@dec      Add new Post
//method    POST

export const addPost = (postData: {userId:any, imageUrl: string; title: string; description:string,hideLikes:boolean,hideComment:boolean }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.addPost, postData)
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


//@dec      Get All Posts
//method    POST

export const    getAllPosts = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", postUrls.getAllPosts, null)
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

//@dec      Get User Post
//method    POST

export const    getUserPost = (userId:{userId:any}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.getUserPosts, userId)
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



//@dec      Edit User post
//method    POST

export const editPost = (postData: {postId:any,  title: string; description:string,hideLikes:boolean,hideComment:boolean }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.editPost, postData)
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