
function RenewPassword() {
  return (
    <>
    <div className="bg-gray-100 flex justify-center items-center h-screen">
    {/* Left: Image */}



    <div className="w-8/12 h-screen hidden lg:block">
      <div className="flex justify-start">
       <img src="../../../public/images/logo/shuffle.png" className=" w-32 m-3" alt="Logo" />
      </div>
   
      <img
        src="../../../public/images/Login img.png"
        alt="Placeholder Image"
        className="object-cover w-full  mt-16  -ml-80" 
      />
    </div>
    {/* Right: Login Form */}
    <div className="lg:p-36 md:p-52 sm:20  -ml-20 p-8 w-full lg:w-1/2">
      <div className='flex flex-col items-center'>
        <h1 className=" text-4xl font-semibold mb-2">New Password</h1>
        <h1 className="text-lg font-normal mb-4">Enter New Password</h1>
      </div>
      <div className="rounded-t mb-0 px-6 py-6">
    


  </div>
      <form  action="#" method="POST">
       
        {/* Password Input */}
        <div className="mb-4">
          
          <input
            type="password"
            id="password"
            name="confirm-password"
            placeholder='Confirm Password'
            className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>
                {/* Confirm Password Input */}

        <div className="mb-4">
          
          <input
            type="password"
            id="password"
            name="password"
            placeholder='password'
            className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
        </div>
    
        {/* Login Button */}
        <button
          type="submit"
          className="bg-gradient-to-b from-purple-600 to-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-4 w-full"
        >
          Continue
        </button>
    
      </form>
      {/* Sign up Link */}
     
    </div>
  </div>
  </>
  )
}

export default RenewPassword