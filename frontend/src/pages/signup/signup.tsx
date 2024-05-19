import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../components/textError";
import {
  validationSchema,
  FormValues,
  initialValues,
} from "../../utils/validations/registerValidation";
import {
  postRegister,
  googleAuthenticate,
} from "../../services/api/user/apiMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../../public/images/logo/shuffle.png";
import signupImg from "../../../public/images/signup-img.png";
import { provider, auth } from "../../utils/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { loginSuccess } from "../../utils/context/reducers/authSlice";

function Signup() {
  const dispatch = useDispatch();
  localStorage.removeItem("otpTimer");
  const navigate = useNavigate();
  const submit = (values: FormValues) => {
    postRegister(values)
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          toast.success(data.message);
          navigate(`/otp?email=${data.email}`);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  const handlegoogleSignUp = () => {
    signInWithPopup(auth, provider).then((data: any) => {
      console.log(data);

      const userData = {
        username: data.user.displayName,
        email: data.user.email,
        imageUrl: data.user.photoURL,
      };

      googleAuthenticate(userData)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            toast.success(data.message);
            dispatch(loginSuccess({ user: data }));
            navigate("/");
          } else {
            console.log(response.message);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error?.message);
        });
    });
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}

        <div className="w-8/12 h-screen hidden lg:block">
          <div className="flex justify-start">
            <img src={logo} className=" w-32 m-3" alt="Logo" />
          </div>

          <img
            src={signupImg}
            alt="Placeholder Image"
            className="object-cover h-5/6  mt-10  -ml-60"
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:20  lg:-ml-20 p-8 w-full lg:w-1/2">
          <div className="lg:hidden mb-10 flex justify-center">
            <img src={logo} className=" w-32 m-3" alt="Logo" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl tex-center font-semibold mb-2">Create Your Account</h1>
            <h1 className="text-lg font-normal mb-2">Signup to your account</h1>
          </div>
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="btn-wrapper text-center">
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-3 rounded-md outline-grey focus:outline-none mr-3 mb-5  uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
                onClick={handlegoogleSignUp}
              >
                <img
                  alt="..."
                  className="w-5 mr-1"
                  src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                />
                Google
              </button>
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-3 rounded outline-none focus:outline-none mr-2 mb-5 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img
                  alt="..."
                  className="w-5 mr-1"
                  src="https://static-00.iconduck.com/assets.00/facebook-icon-512x512-seb542ju.png"
                />
                Facebook
              </button>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  id="username"
                  placeholder="Name"
                  name="username"
                  className=" w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <ErrorMessage name="username" component={TextError} />
              </div>
              {/* Email Input */}
              <div className="mb-4">
                <Field
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  className=" w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <ErrorMessage name="email" component={TextError} />
              </div>
              {/* Password Input */}
              <div className="mb-4">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>
              {/* Password Input */}
              <div className="mb-4">
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confrim Password"
                  className="w-full border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <ErrorMessage name="confirmPassword" component={TextError} />
              </div>
              {/* Remember Me Checkbox */}
              <div className="flex mb-4">
                <p className=" text-gray-500 text-xs">
                  By signing up you agree to our Terms of Service and Privacy
                  policy and confirm that you are at least 18 years old
                </p>
              </div>
              {/* Login Button */}
              <button
                type="submit"
                className="bg-gradient-to-b from-purple-600 to-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-4 w-full"
              >
                Signup
              </button>
            </Form>
          </Formik>
          {/* Username Input */}

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

export default Signup;
