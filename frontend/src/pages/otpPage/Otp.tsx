import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Otp() {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const navigate = useNavigate();
  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);

  const handleOtpChange = (otp, setOtp, prevRef, nextRef) => {
    // Validate input to allow only numbers
    const regex = /^[0-9\b]+$/;
    if (otp === '' || regex.test(otp)) {
      setOtp(otp);
      if (otp === '' && prevRef && prevRef.current) {
        prevRef.current.focus();
      } else if (otp.length === 1 && nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otp1 + otp2 + otp3 + otp4;
    // Call your OTP verification API here
    // Example:
    if (otp === '1234') {
      // Replace '1234' with the actual OTP returned from the API
      navigate('/dashboard'); // Redirect to dashboard upon successful OTP verification
    } else {
      alert('Invalid OTP. Please try again.'); // Display an error message
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-8/12 h-screen hidden lg:block">
          <div className="flex justify-start">
            <img src="../../../public/images/logo/shuffle.png" className="w-32 m-3" alt="Logo" />
          </div>
          <img src="../../../public/images/signup-img.png" alt="Placeholder Image" className="object-cover h-5/6 mt-10 -ml-60" />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 -ml-20 p-8 w-full lg:w-1/2">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold mb-2">Enter Your OTP</h1>
            <h1 className="text-md font-normal mb-4">OTP has been sent to ------@gmail.com</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <div className="mb-4 mr-4">
                <input
                  ref={otp1Ref}
                  type="text"
                  value={otp1}
                  onChange={(e) => handleOtpChange(e.target.value, setOtp1, null, otp2Ref)}
                  maxLength={1}
                  className="w-full border border-gray-300 rounded-xl py-4 px-4 text-4xl text-center focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4 mr-4">
                <input
                  ref={otp2Ref}
                  type="text"
                  value={otp2}
                  onChange={(e) => handleOtpChange(e.target.value, setOtp2, otp1Ref, otp3Ref)}
                  maxLength={1}
                  className="w-full border border-gray-300 rounded-xl py-4 px-4 text-4xl text-center focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4 mr-4">
                <input
                  ref={otp3Ref}
                  type="text"
                  value={otp3}
                  onChange={(e) => handleOtpChange(e.target.value, setOtp3, otp2Ref, otp4Ref)}
                  maxLength={1}
                  className="w-full border border-gray-300 rounded-xl py-4 px-4 text-4xl text-center focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4 mr-4">
                <input
                  ref={otp4Ref}
                  type="text"
                  value={otp4}
                  onChange={(e) => handleOtpChange(e.target.value, setOtp4, otp3Ref, null)}
                  maxLength={1}
                  className="w-full border border-gray-300 rounded-xl py-4 px-4 text-4xl text-center focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-b from-purple-600 to-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-4 w-full"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Otp;
