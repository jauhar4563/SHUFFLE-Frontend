import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../../../public/images/logo/shuffle.png";
import forgotIMG from "../../../public/images/iphone forgot.png";
import { forgotPassword } from "../../services/api/user/apiMethods";
import TextError from "../../components/textError";
import * as Yup from "yup";
import { toast } from "sonner";

function ForgotPassword() {
  localStorage.removeItem("otpTimer");
  const navigate = useNavigate();

  const email: string = "";

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const submit = (values: any) => {
    forgotPassword({ email: values.email })
      .then((response: any) => {
        const data = response.data;
        toast.success(data.message);
        navigate(`/forgot-otp?email=${data.email}`);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-8/12 h-screen hidden lg:block">
          <div className="flex justify-start">
            <img src={logo} className="w-32 m-3" alt="Logo" />
          </div>
          <img
            src={forgotIMG}
            alt="Placeholder Image"
            className="object-cover w-6/12 mt-10 ml-32"
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:20 -ml-48 p-8 w-full lg:w-1/2">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold mb-2">Forgot Password</h1>
            <h1 className="text-lg font-normal mb-4">Recover Password</h1>
          </div>
          <Formik
            initialValues={{ email: email }}
            validationSchema={emailValidationSchema}
            onSubmit={submit}
          >
            {(
              { handleSubmit } // Destructure handleSubmit from props
            ) => (
              <Form onSubmit={handleSubmit}>
                {" "}
                {/* Pass handleSubmit to onSubmit */}
                {/* Email Input */}
                <div className="mb-4">
                  <Field
                    type="text"
                    id="email"
                    placeholder="Email"
                    name="email"
                    className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                    autoComplete="off"
                  />
                  <ErrorMessage name="email" component={TextError} />
                </div>
                {/* Remember Me Checkbox */}
                <div className="flex mb-4">
                  <p className="text-gray-500 text-xs">
                    By signing up you agree to our Terms of Service and Privacy
                    policy and confirm that you are at least 18 years old
                  </p>
                </div>
                {/* Login Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-b from-purple-600 to-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-4 w-full"
                >
                  Send OTP
                </button>
              </Form>
            )}
          </Formik>{" "}
          {/* Sign up Link */}
          <div className="mt-6 text-sm text-center">
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
