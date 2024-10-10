export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export interface SignupData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }

export interface LoginData {
    email: string;
    password: string;
  }