import React, { useState, useRef, useEffect } from "react";
import { Bell, Bookmark, Mail, LucideKeySquare, ImagePlus } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { addPost, getAllHashtag } from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import CropImage from "./CropImg";
import { Spinner } from "flowbite-react";
import Select from "react-select";

function AddPost({ setNewPost }: any) {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [showModal, setShowModal] = useState(false);
  const [hideLikes, setHideLikes] = useState(false);
  const [hideComment, setHideComment] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagSuggestions, setHashtagSuggestions] = useState([]);
  const [croppedImage, setCroppedImage] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHashtag, setSelectedHashtag] = useState<any>([]);

  useEffect(() => {
    try {
      getAllHashtag().then((response: any) => {
        setHashtags(response.data.hashtags);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleHideLikesToggle = () => {
    setHideLikes(!hideLikes);
  };

  const handleHideCommentToggle = () => {
    setHideComment(!hideComment);
  };
  const handleCreatePostClick = () => {
    setShowModal(true);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log("hello");

  const handleButtonClick = () => {
    fileInputRef.current?.setAttribute("accept", "image/*");
    fileInputRef.current?.click();
  };
  // Options for react-select
  const selectOptions = hashtags.map((tag: any) => ({
    value: tag.hashtag,
    label: tag.hashtag,
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"]; // Add more image types if needed
      const selectedFiles = Array.from(files);
      const invalidFiles = selectedFiles.filter(file => !validImageTypes.includes(file.type));
      if (invalidFiles.length > 0) {
        toast.error("Please select only image files (JPEG, PNG, GIF).");
        return;
      }
      const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
      formik.setFieldValue("images", imageUrls);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      images: [],
      title: "",
      description: "",
      hashtag: "",
    },
    validationSchema: Yup.object({
      images: Yup.array()
        .min(1, "At least one image is required")

        .required("Image file required"),

      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async () => {
      setIsLoading(true);
      console.log("hello", userId);
      console.log(croppedImage);
      const { title, description, hashtag } = formik.values;
      const imageUrls = [];
      for (const image of formik.values.images) {
        const response = await fetch(image);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append("file", blob);
        formData.append("upload_preset", "bnaqltis");

        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dgkfbywof/image/upload",
            formData
          );
          console.log(res.data.secure_url);

          const imageUrl = res.data.secure_url;
          imageUrls.push(imageUrl);
        } catch (error) {
          console.log("Error uploading image:", error);
        }
      }
      addPost({
        userId,
        imageUrls,
        title,
        description,
        hideLikes,
        hideComment,
        hashtag: selectedHashtag,
      })
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            toast.info(data.message);
            setNewPost(response.data.posts);
            setIsLoading(false);
            handleCancelClick();
          } else {
            console.log(response.message);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
          console.log(error?.message);
        });
    },
  });

  const handleCancelClick = () => {
    formik.values.images = [];
    setCroppedImage([]);
    setSelectedHashtag([]);
    console.log(croppedImage);
    setShowModal(false);
  };

  const handleHashtagSelect = (hashtag: string) => {
    formik.setFieldValue("hashtag", hashtag);
    setHashtagSuggestions([]);
  };
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className=" ms-96 w-12/12">
      <div className=" m-4 home-addpost-section h-18%  rounded-xl border border-gray-200 shadow-md">
        <div className="bg-white flex flex-col rounded-lg justify-between p-4">
          <div className="text-gray-500 font-medium text-xs">
            Whats Happening?........
          </div>
          <div className="flex items-center justify-between align-middle">
            <div className="flex">
              <ul className="flex gap-2">
                <li>
                  <Bell className="text-gray-400" strokeWidth={1.5} size={20} />
                </li>
                <li>
                  <Bookmark
                    className="text-gray-400"
                    strokeWidth={1.5}
                    size={20}
                  />
                </li>
                <li>
                  <Mail className="text-gray-400" strokeWidth={1.5} size={20} />
                </li>
                <li>
                  <LucideKeySquare
                    className="text-gray-400"
                    strokeWidth={1.5}
                    size={20}
                  />
                </li>
              </ul>
            </div>
            <button
              onClick={handleCreatePostClick}
              className="text-xs mb-4 bg-gradient-to-b from-purple-600 to-blue-400 text-white px-4 py-2 mt-6 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Create Post
            </button>
          </div>
          <hr />
        </div>
      </div>
      {showModal && (
        <div className="addpost-popup z-50">
          <div className="addpost-popup">
            <div className="addpost-modal rounded-xl flex bg-gray-100 mx-auto w-10/12 flex-col text-gray-800 border z-50 border-gray-300 p-5 shadow-lg max-w-2xl">
              <p className="font-semibold text-5xl m-3">Create Post</p>
              <hr />
              <form onSubmit={formik.handleSubmit}>
                <div className="flex ">
                  <div className=" w-6/12">
                    <div
                      onClick={handleButtonClick}
                      className="image-preview flex items-center bg-white shadow-lg justify-center h-64 cursor-pointer"
                    >
                      {!formik.values.images.length && (
                        <div className="flex flex-col gap 10 items-center">
                          {(!formik.values.images.length ||
                            formik.errors.images) && (
                            <div className="flex flex-col gap 10 items-center">
                              <ImagePlus
                                color="gray"
                                strokeWidth={1.5}
                                size={40}
                              />
                              <p className="text-blue-700 mt-2">Select Image</p>{" "}
                            </div>
                          )}
                        </div>
                      )}

                      {croppedImage && !formik.errors.images && (
                        <div className="flex  gap-4">
                          {croppedImage.map((preview, index) => (
                            <div key={index}>
                              {preview && (
                                <img
                                  style={{ borderRadius: "10px" }}
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {formik.values.images &&
                      !formik.errors.images &&
                      formik.values.images.map((imageFile, index) => (
                        <React.Fragment key={index}>
                          {index === currentImageIndex && (
                            <CropImage
                              imgUrl={imageFile}
                              aspectInit={{ value: 1 / 1 }}
                              setCroppedImg={setCroppedImage}
                              handleNextImage={handleNextImage}
                            />
                          )}
                        </React.Fragment>
                      ))}

                    {formik.errors.images && (
                      <p className="text-red-600 text-xs">
                        {formik.errors.images}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-6/12">
                    <p className=" font-semibold">Title</p>
                    <input
                      type="text"
                      placeholder="Title"
                      className="rounded-lg shadow-lg p-2 py-3 mb-3 outline-none text-xs font-normal"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="title"
                    />
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-red-600 text-xs">
                        {formik.errors.title}
                      </p>
                    )}
                    <p className="font-semibold mb-2">Description</p>
                    <textarea
                      className="rounded-lg description sec p-3 h-24 shadow-lg border-gray-300 outline-none text-xs font-normal"
                      spellCheck="false"
                      placeholder="Describe everything about this post here"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="description"
                    ></textarea>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-red-600 text-xs">
                          {formik.errors.description}
                        </p>
                      )}
                    <p className=" font-semibold">Hashtag</p>
                    <Select
                      options={selectOptions}
                      value={selectedHashtag} // Set selected value
                      onChange={(selectedOption) => {
                        console.log(selectedOption);

                        setSelectedHashtag(selectedOption);
                      }}
                      isMulti
                    />
                    <div className="">
                      {hashtagSuggestions.length > 0 && (
                        <div className="absolute flex bg-white w-full mt-1 border border-gray-300 rounded-lg shadow-md">
                          {hashtagSuggestions.map((tag: any) => (
                            <div
                              key={tag._id}
                              className="cursor-pointer flex px-3 py-2 hover:bg-gray-100"
                              onClick={() => handleHashtagSelect(tag.hashtag)}
                            >
                              {tag.hashtag}
                            </div>
                          ))}
                        </div>
                      )}
                      {formik.touched.hashtag && formik.errors.hashtag && (
                        <p className="text-red-600 text-xs">
                          {formik.errors.hashtag}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="icons flex text-gray-500 m-2">
                  {/* <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const fileList = Array.from(files);
                        
                        const imageUrls = fileList.map((imageFile) =>
                          
                          URL.createObjectURL(imageFile)
                        );

                        formik.setFieldValue("images", imageUrls);
                      }
                    }}
                    multiple
                  /> */}

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    multiple
                  />

                  <label className="inline-flex items-center me-5 cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={hideComment}
                      onChange={handleHideCommentToggle}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    <span className="ms-3 text-sm font-semibold text-gray-900 dark:text-gray-900">
                      Hide Comments
                    </span>
                  </label>
                  <label className="inline-flex items-center me-5 cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={hideLikes}
                      onChange={handleHideLikesToggle}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    <span className="ms-3 text-sm font-semibold text-gray-900 dark:text-gray-900">
                      Hide Likes
                    </span>
                  </label>

                  <div className="count ml-auto text-gray-400 text-xs font-semibold">
                    0/300
                  </div>
                </div>
                <div className="buttons flex">
                  <div
                    onClick={handleCancelClick}
                    className="text-xs  btn border border-gray-300 px-6 py-3 rounded-lg cursor-pointer text-gray-500 ml-auto hover:bg-red-600  hover:text-white "
                  >
                    Cancel
                  </div>
                  <button
                    type="submit"
                    className="text-xs rounded-lg btn border px-6 py-3 cursor-pointer text-white ml-2 bg-gradient-to-b from-purple-600 to-blue-400  hover:bg-green-600"
                  >
                    {isLoading && (
                      <Spinner
                        aria-label="Extra small spinner example"
                        size="sm"
                      />
                    )}
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPost;
