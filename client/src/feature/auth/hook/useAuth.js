import { useForm } from "react-hook-form";
import {useDispatch} from "react-redux";
import { loginAction, registerAction } from "../state/authAction";

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




  return {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    handleRegister,
    handleLogin,
  };
};
