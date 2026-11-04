import { useForm } from "react-hook-form";
import {useDispatch} from "react-redux";
import { loginAction, registerAction } from "../api/authAction";

export const useAuth = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();

//   handleRegister function to handle registration form submission
  const handleRegister = async (data) => {
    try {
      // console.log("Form Data:", data);
      dispatch(registerAction(data));
      reset();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

//   handleLogin function to handle login form submission
  const handleLogin = async (data) => {
    try {
        dispatch(loginAction(data));
        reset();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

//   handleGoogleLogin function to handle Google OAuth login
  const handleGoogleLogin = () => {
    // window.location.href = "http://localhost:5000/api/auth/google";
    console.log("Redirecting to Google OAuth...");
  };


  return {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    handleRegister,
    handleLogin,
    handleGoogleLogin,
  };
};
