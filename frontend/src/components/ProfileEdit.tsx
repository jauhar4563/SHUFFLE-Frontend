import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from 'yup';
import { loginSuccess } from "../utils/context/reducers/authSlice";
import { editProfile } from "../services/api/user/apiMethods";
import { useNavigate } from "react-router-dom";

function ProfileEdit({ user }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const [isPrivate, setIsPrivate] = useState(user.isPrivate);

  const formik = useFormik({
    initialValues: {
      name: user.userName,
      phone: user.phone,
      bio: user.bio,
      gender: user.gender,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      const userId = user._id;
      const { name, phone, bio, gender } = values;
      try {
        await editProfile({
          userId,
          name,
          phone,
          bio,
          gender,
          isPrivate
        }).then((response: any) => {
          const userData = response.data;
          dispatch(loginSuccess({ user: userData }));
          toast.info("Profile updated successfully");
          Navigate('/profile')
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
    },
  });

  const handlePrivateToggle = () => {
    setIsPrivate(!isPrivate);
  };

  return (
    <div>
      <div className="addpost-popup z-50">
        <div className="addpost-popup">
          <div className="addpost-modal rounded-xl flex bg-gray-100 mx-auto w-10/12 flex-col text-gray-800 border z-50 border-gray-300 p-5 shadow-lg max-w-2xl">
            <p className="font-semibold text-2xl m-3">Edit Profile</p>
            <hr />
            <form onSubmit={formik.handleSubmit}>
              <div className="flex">
                <div className="w-6/12">
                  <div className="image-preview flex items-center bg-white shadow-lg justify-center h-36 cursor-pointer">
                    <img
                      style={{ height: "100px", borderRadius: "10px" }}
                      src={user.profileImg}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col w-6/12">
                  <p className="font-semibold">Name</p>
                  <input
                    type="text"
                    placeholder="Name"
                    className="rounded-lg shadow-lg p-2 py-3 mb-3 outline-none text-xs font-normal"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-600 text-xs">
                      {formik.errors.name}
                    </p>
                  )}
                  <p className="font-semibold">Email</p>
                  <input
                    type="text"
                    placeholder="Email"
                    className="rounded-lg shadow-lg p-2 py-3 mb-3 outline-none text-xs font-normal"
                    value={user.email}
                    name="email"
                    disabled
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="font-semibold mb-2">Bio</p>
                <textarea
                  className="rounded-lg description sec w-full p-3 h-24 shadow-lg border-gray-300 outline-none text-xs font-normal"
                  spellCheck="false"
                  placeholder="Describe everything about you here"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="bio"
                ></textarea>
              </div>
              <div className="flex w-full gap-2">
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter a Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Phone"
                    className="rounded-lg shadow-lg p-2 py-3 mb-3 w-full outline-none text-xs font-normal"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="phone"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Gender
                  </label>
                  <select
                    id="gender"
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="icons flex text-gray-500 m-2">
                <label className="inline-flex items-center me-5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="" 
                    className="sr-only peer"
                    checked={isPrivate}
                    onChange={handlePrivateToggle}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  <span className="ms-3 text-sm font-semibold text-gray-900 dark:text-gray-900">
                    Private
                  </span>
                </label>
              </div>
              <div className="buttons flex">
                <div className="text-xs  btn border border-gray-300 px-6 py-3 rounded-lg cursor-pointer text-gray-500 ml-auto hover:bg-red-600  hover:text-white ">
                  Cancel
                </div>
                <button
                  type="submit"
                  className="text-xs rounded-lg btn border px-6 py-3 cursor-pointer text-white ml-2 bg-gradient-to-b from-purple-600 to-blue-400  hover:bg-green-600"
                >
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
