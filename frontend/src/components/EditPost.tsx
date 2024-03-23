import React from 'react'

function EditPost() {
  return (
    <div>
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
                      {!formik.values.image && (
                        <div className="flex flex-col gap 10 items-center">
                          {(!formik.values.image || formik.errors.image) && (
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
                      {formik.values.image && !formik.errors.image && (
                        <PreviewImage file={formik.values.image} />
                      )}
                    </div>
                    {formik.errors.image && (
                      <p className="text-red-600 text-xs">
                        {formik.errors.image}
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
                      className="rounded-lg description sec p-3 h-40 shadow-lg border-gray-300 outline-none text-xs font-normal"
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
                  </div>
                </div>
                <div className="icons flex text-gray-500 m-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        formik.setFieldValue("image", file);
                      }
                    }}
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
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EditPost