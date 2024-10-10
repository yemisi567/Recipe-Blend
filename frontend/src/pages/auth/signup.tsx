import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import { useForm } from "react-hook-form";
import Button from "../../components/button/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Checkbox } from "../../components/checkbox/check-box";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { SignupData } from "../../types/auth";
import { signup } from "../../store/auth/auth-slice";
import LogoImage from "../../components/icons/logo.png";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),
});

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [checkedPrivacyBox, setCheckPrivacyBox] = useState(true);
  const [consentPrivacyBox, setConsentPrivacyBox] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // React hook form values
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupData) => {
    try {
      const result = await dispatch(signup(data)).unwrap();
      toast.success(result.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error || "Account creation failed.");
      console.error("Signup error:", error);
    }
  };

  const isRequiredFieldEmpty = () => {
    const watchEmail = watch("email");
    const watchPassword = watch("password");
    const watchFirstName = watch("first_name");
    const watchLastName = watch("last_name");
    const requiredFieldIsEmpty =
      watchEmail === "" ||
      watchPassword === "" ||
      watchLastName === "" ||
      watchFirstName === "" ||
      !checkedPrivacyBox;
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
        <div className="md:hidden mb-12 flex justify-start w-full min-[500px]:w-[70%] md:w-full"></div>
        <div className="h-auto w-full min-[500px]:w-[70%] md:w-full min-[900px]:w-[60%] bg-white rounded-3xl p-32">
          <div>
            <h1 className="font-semibold text-4xl mb-[32px]">Sign up Now</h1>
            <form
              className="mt-16 flex flex-col gap-y-4"
              id="signup"
              name="signup"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-12 mb-12">
                <div className="w-full">
                  <Input
                    {...register("first_name")}
                    label="First name"
                    hasError={!!errors.first_name}
                    errorText={errors.first_name?.message}
                    isRequired
                  />
                </div>

                <div className="w-full">
                  <Input
                    {...register("last_name")}
                    label="Last name"
                    hasError={!!errors.last_name}
                    errorText={errors.last_name?.message}
                    isRequired
                  />
                </div>
              </div>
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
                <p className="text-smm text-gray mt-[12px]">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </p>
              </div>
              <div className="flex items-center gap-8 mt-[12px]">
                <Checkbox
                  value=""
                  name="privacy_box"
                  isChecked={checkedPrivacyBox}
                  handleChange={() => setCheckPrivacyBox(!checkedPrivacyBox)}
                />
                <p className="text-smm text-gray">
                  By creating an account, I agree to our Terms of use and
                  Privacy Policy
                </p>
              </div>
              <div className="flex items-start gap-8 mt-[24px]">
                <Checkbox
                  value=""
                  isChecked={consentPrivacyBox}
                  name="consent_box"
                  handleChange={() => setConsentPrivacyBox(!consentPrivacyBox)}
                />
                <p className="text-smm text-gray leading-snug -mt-2">
                  By creating an account, I am also consenting to receive SMS
                  messages and emails, including product new feature update, and
                  marketing promotions
                </p>
              </div>
              <div className="flex items-center gap-32 mt-24">
                <Button
                  aria-label="submit btn"
                  type="submit"
                  form="signup"
                  disabled={loading || isRequiredFieldEmpty()}
                  className="w-[150px] rounded-[30px] h-[42px]"
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="w-16 h-16 border-4 border-r-red border-solid border-t-transparent rounded-full animate-spin-fast"></div>
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </Button>
                <div className="text-center mt-6">
                  <p className="text-gray font-normal text-sm">
                    Already have an account?
                    <Link
                      className="text-primary font-medium inline-block ml-1 text-sm"
                      to="/login"
                    >
                      Login
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

export default SignUpPage;
