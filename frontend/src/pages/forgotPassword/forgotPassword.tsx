import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}

        <div className="w-8/12 h-screen hidden lg:block">
          <div className="flex justify-start">
            <img
              src="../../../public/images/logo/shuffle.png"
              className=" w-32 m-3"
              alt="Logo"
            />
          </div>

          <img
            src="../../../public/images/iphone forgot.png"
            alt="Placeholder Image"
            className="object-cover w-6/12  mt-10  ml-32 "
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:20 -ml-48 p-8 w-full lg:w-1/2">
          <div className="flex flex-col items-center">
            <h1 className=" text-4xl font-semibold mb-2">
            Forgot Password
            </h1>
            <h1 className="text-lg font-normal mb-4">Recover Password</h1>
          </div>
        
          <form action="#" method="POST">
            {/* Username Input */}
           
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="text"
                id="email"
                placeholder="Email"
                name="email"
                className=" w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
            {/* Password Input */}
            
            {/* Remember Me Checkbox */}
            <div className="flex mb-4">
              <p className=" text-gray-500 text-xs">
              By signing up you agree to our Terms of Service and Privacy policy and confirm that you are at least 18 years old
              </p>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="bg-gradient-to-b from-purple-600 to-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-4 w-full"
            >
              Send OTP
            </button>
          </form>
          {/* Sign up Link */}
          <div className="mt-6 text-sm  text-center">
            You already have an account?
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
