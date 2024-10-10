import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { login, validToken } from "../../store/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { LoginData } from "../../types/auth";
import LogoImage from "../../components/icons/logo.png";
import Input from "../../components/input/input";
import Button from "../../components/button/button";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // React hook form values
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),

    mode: "onChange",
  });

  const validateToken = async (token: string) => {
    try {
      const response = await dispatch(validToken(token)).unwrap();
      if (response.status === "success") {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Token validation failed.");
      console.error("Token validation error:", error);
    }
  };

  const handleLogin = async (data: LoginData) => {
    try {
      const response = await dispatch(login(data)).unwrap();
      validateToken(response.data.token);
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
      console.error("Login error:", error);
    }
  };

  const isRequiredFieldEmpty = () => {
    const watchEmail = watch("email");
    const watchPassword = watch("password");
    const requiredFieldIsEmpty = watchEmail === "" || watchPassword === "";
    return requiredFieldIsEmpty;
  };

  return (
    <div className="p-5 max-h-screen h-svh block md:flex">
      <div className="bg-black hidden md:basis-1/2 md:h-full md:rounded-md p-14 md:flex md:flex-col md:justify-center md:gap-y-8 md:relative">
        <div className="absolute top-14 left-14">
          <div className="inline-flex">
            <h1
              className={`text-primary font-medium text-base origin-left duration-300  `}
            >
              <img src={LogoImage} alt="" width={100} height={100} />
            </h1>
          </div>
        </div>
        <div className="text-white -mt-20">
          <h2 className="font-semibold text-7xl mb-24 font-serif">
            Welcome to the Recipe Blend!
          </h2>
          <p className="text-[#E4DBDB] text-base font-normal italic">
            Whether you're a beginner or a seasoned chef, our platform is
            designed to inspire your culinary journey and help you bring
            exciting flavors to life.
            <p className="mt-24 font-medium text-base">
              Let’s cook up something amazing together!
            </p>
          </p>
        </div>
      </div>
      <div className="w-full md:basis-1/2 h-full flex flex-col md-[500px]:flex-row items-center justify-center relative md:pl-5 min-[900px]:pl-0">
        <div className="md:hidden mb-8 flex justify-start w-full min-[500px]:w-[70%] md:w-full"></div>
        <div className="h-auto w-full min-[500px]:w-[70%] md:w-full min-[900px]:w-[60%] bg-white rounded-3xl p-32">
          <div>
            <h1 className="font-semibold text-4xl mb-[32px]">Welcome back!</h1>
            <form
              className="mt-16 flex flex-col gap-y-4"
              id="login"
              name="login"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="mb-12">
                <Input
                  {...register("email")}
                  label="Email"
                  hasError={!!errors.email}
                  errorText={errors.email?.message}
                  isRequired
                />
              </div>
              <div className="mb-12">
                <Input
                  {...register("password")}
                  label="Password"
                  hasError={!!errors.password}
                  errorText={errors.password?.message}
                  isRequired
                />
              </div>
              <div className="flex items-center gap-32 mt-24">
                <Button
                  aria-label="submit btn"
                  type="submit"
                  form="login"
                  disabled={loading || isRequiredFieldEmpty()}
                  className="w-[150px] rounded-[30px] h-[42px]"
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="w-16 h-16 border-4 border-r-red border-solid border-t-transparent rounded-full animate-spin-fast"></div>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="text-center mt-6">
                  <p className="text-gray font-normal text-sm">
                    Don&apos;t have an account?
                    <Link
                      className="text-primary font-medium inline-block ml-2 text-sm"
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
