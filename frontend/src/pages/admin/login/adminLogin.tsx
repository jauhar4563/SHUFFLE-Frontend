import logo from "../../../../public/images/logo/shuffle.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  initialValues,
  validationSchema,
  FormValues,
} from "../../../utils/validations/loginValidations";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { adminPostLogin } from '../../../services/api/admin/apiMethods';
import TextError from "../../../components/textError";
import { useDispatch } from "react-redux";
import { AdminLoginSuccess } from "../../../utils/context/reducers/adminAuthSlice";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = (values: FormValues) => {
  
    adminPostLogin(values).then((response:any) => {

      const data = response.data
      if(response.status === 200) {
       toast.success(data.message)
       dispatch(AdminLoginSuccess({ admin: data }));        
       navigate('/admin/');
      } else {
        console.log(response.message);
        toast.error(data.message)
      }
    }).catch((error) => {
      console.log(error?.message)
      toast.error(error?.message);
    })
  };

  return (
    <>
        <div className="top-0 flex bg-gray-100 justify-start w-full">

<img src={logo} className=" w-32 m-3" alt="Logo" />
</div>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
    


        {/* Right: Login Form */}
        <div className=" lg:p-10 md:p-10 sm:20 bg-white rounded-xl  lg:w-2/6">
           
          <div className="flex flex-col items-center">

            <h1 className=" text-4xl font-semibold mb-2">Admin Login</h1>
            <h1 className="text-lg font-normal mb-4">Login to your account</h1>
          </div>
        
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            <Form className="space-y-4 ">
              {/* Username Input */}
              <div className="mb-4 flex justify-center">
                <Field
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  className=" w-96 border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <ErrorMessage name="email" component={TextError} />
              </div>
              {/* Password Input */}
              <div className="mb-4 flex justify-center">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className="w-96 border border-gray-300 rounded-xl py-4 px-4 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>
              {/* Remember Me Checkbox */}
              
              {/* Login Button */}
              <div className="flex justify-center">

              <button
                type="submit"
                className="bg-gradient-to-b from-purple-600  to-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-3 px-4 w-96"
              >
                Login
              </button>
              </div>
            </Form>
          </Formik>{" "}
          {/* Sign up Link */}
         
        </div>
      </div>
    </>
  );
}

export default Login;
