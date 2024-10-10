import { LoginData, SignupData } from "../../types/auth";
import axios from "../../utils/axios";

// Function to handle user signup
export const signupUser = async (userData: SignupData) => {
  const response = await axios.post("/auth/signup", userData);
  return response.data;
};

// Function to handle user login
export const loginUser = async (userData: LoginData) => {
  const response = await axios.post("/auth/login", userData);
  return response.data;
};

// Function to handle user login
export const validateToken = async (token: string) => {
  const response = await axios.post("/auth/validate-token", {
    token
  });
  return response.data;
};
