import React, { useState, useRef, FormEvent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../public/images/logo/shuffle.png";
import signup from "../../../public/images/signup-img.png";
import { postOTP, postResendOTP } from "../../services/api/user/apiMethods";
import { toast } from "sonner";

function Otp() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const [otp1, setOtp1] = useState<string>("");
  const [otp2, setOtp2] = useState<string>("");
  const [otp3, setOtp3] = useState<string>("");
  const [otp4, setOtp4] = useState<string>("");
  const navigate = useNavigate();
  const otp1Ref = useRef<HTMLInputElement>(null);
  const otp2Ref = useRef<HTMLInputElement>(null);
  const otp3Ref = useRef<HTMLInputElement>(null);
  const otp4Ref = useRef<HTMLInputElement>(null);

  const initialTimer = parseInt(localStorage.getItem("otpTimer") || "60");
  const [timer, setTimer] = useState<number>(initialTimer);
  const [resend, setResend] = useState<boolean>(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        localStorage.setItem("otpTimer", (timer - 1).toString());
      } else {
        clearInterval(countdownInterval);
        setResend(true);
        toast.error("Time expired please resend otp");
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timer]);

  const startResendTimer = () => {
    setResend(false);
    setTimer(60);
    localStorage.setItem("otpTimer", "60");
  };

  const handleResendClick = () => {
    console.log("hello");
    startResendTimer();
    setOtp1("");
    setOtp2("");
    setOtp3("");
    setOtp4("");
    postResendOTP({ email: email })
      .then((response: any) => {
        toast.success("OTP has been resend to" + response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOtpChange = (
    otp: string,
    setOtp: React.Dispatch<React.SetStateAction<string>>,
    prevRef: React.RefObject<HTMLInputElement> | null,
    nextRef: React.RefObject<HTMLInputElement> | null
  ) => {
    const regex = /^[0-9\b]+$/;
    if (otp === "" || regex.test(otp)) {
      setOtp(otp);
      if (otp === "" && prevRef && prevRef.current) {
        prevRef.current.focus();
      } else if (otp.length === 1 && nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otp: string = otp1 + otp2 + otp3 + otp4 || "";
    if (otp.trim().length !== 4 || otp == "") {
      toast.error("Enter a Valid Otp");
      return;
    }
    if (timer == 0) {
      setResend(true);
      toast.info("OTP has been expired. Please Resend OTP");
      return;
    }

    postOTP({ otp: otp })
      .then((response: any) => {
        localStorage.removeItem("otpTimer");
        const data = response.data;
        if (response.status === 200) {
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-8/12 h-screen hidden lg:block">
          <div className="flex justify-start">
            <img src={logo} className="w-32 m-3" alt="Logo" />
          </div>
          <img
            src={signup}
            alt="Placeholder Image"
            className="object-cover h-5/6 mt-10 -ml-60"
          />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 -ml-20 p-8 w-full lg:w-1/2">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold mb-2">Enter Your OTP</h1>
            <h1 className="text-md font-normal mb-4">
              OTP has been sent to {email}
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-4">
              <div className="mb-4 mr-4">
                <input
                  ref={otp1Ref}
                  type="text"
                  value={otp1}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, setOtp1, null, otp2Ref)
                  }
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
                  onChange={(e) =>
                    handleOtpChange(e.target.value, setOtp2, otp1Ref, otp3Ref)
                  }
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
                  onChange={(e) =>
                    handleOtpChange(e.target.value, setOtp3, otp2Ref, otp4Ref)
                  }
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
                  onChange={(e) =>
                    handleOtpChange(e.target.value, setOtp4, otp3Ref, null)
                  }
                  maxLength={1}
                  className="w-full border border-gray-300 rounded-xl py-4 px-4 text-4xl text-center focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex justify-between mb-4  items-center ">
              <div className="flex gap-2  items-center">
                {!resend ? (
                  <p className="text-s text-grey-600">
                    Resend in{" "}
                    <span className="text-blue-600 text-lg">{timer}</span>{" "}
                    seconds
                  </p>
                ) : (
                  ""
                )}
              </div>

              {resend ? (
                <button
                  onClick={handleResendClick}
                  className="text-s text-red-600 hover:underline focus:outline-none"
                >
                  Resend OTP
                </button>
              ) : (
                ""
              )}
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
