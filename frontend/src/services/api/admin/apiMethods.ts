import { adminUrl } from "../endPoints";
import adminApiCalls from "./apiCalls";
import { FormValues } from "../../../utils/validations/loginValidations";

//@dec      Admin login
//@method   POST
export const adminPostLogin = (adminData: FormValues) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("post", adminUrl.login, adminData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//@dec      All Users List
//@method   Get
export const adminUserList = (page:number,limit=6) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(page,limit)
      const queryParams = `?page=${page}&limit=${limit}`;
      adminApiCalls("get", adminUrl.userList+queryParams, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//@dec      All Users List
//@method   Get
export const adminUserBlock = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("post", adminUrl.userBlock, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//@dec      Add new Hashtag
//@method   Get
export const addHashTags = (hashtag: { hashtag: string }) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("post", adminUrl.addHashtag, hashtag)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//@dec      Get Hashtags
//method    get

export const getHashtags = (page:number,limit=6) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = `?page=${page}&limit=${limit}`;

      adminApiCalls("get", adminUrl.hashtagList+queryParams, null)
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
export const adminHashtagBlock = (hashtagId: { hashtagId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("put", adminUrl.blockHashtag, hashtagId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//@dec     Edit hashtags
//@method   Post
export const adminHashtagEdit = (hashtagData: {
  hashtagId: string;
  hashtag: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("patch", adminUrl.editHashtag, hashtagData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};




//@dec      All Posts List
//@method   Get
export const adminPostList = (page:number,limit=6) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = `?page=${page}&limit=${limit}`;
      console.log(page,limit)
      adminApiCalls("get", adminUrl.postList+queryParams, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};



//@dec      Admin Post Block
//@method   Post
export const adminPostBlock = (postId: { postId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("put", adminUrl.postBlock, postId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};


//@dec      All Posts List
//@method   Get
export const adminReportList = (page:number,limit=6) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = `?page=${page}&limit=${limit}`;
      console.log(page,limit)
      adminApiCalls("get", adminUrl.getReports+queryParams, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//@dec     Get Chart Data
//@method   Get
export const chartData = () => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("get", adminUrl.chartData, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};



//@dec     Get Dashboard Stats
//@method   Get
export const getDashboardStats = () => {
  return new Promise((resolve, reject) => {
    try {
      adminApiCalls("get", adminUrl.dashboardStats, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};