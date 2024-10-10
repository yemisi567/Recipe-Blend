import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, signupUser, validateToken } from "../auth/auth-api";
import { initialState, LoginData, SignupData, User } from "../../types/auth";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: SignupData, { rejectWithValue }) => {
    try {
      const response = await signupUser(userData);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Network error or server is unreachable");
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: LoginData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const validToken = createAsyncThunk("auth/validate-token", async (token: string, { rejectWithValue }) => {
  try {
    const response = await validateToken(token);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(validToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        validToken.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(validToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
