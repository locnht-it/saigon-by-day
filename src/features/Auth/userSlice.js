import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";

// Thunk để đăng ký người dùng
export const register = createAsyncThunk("user/register", async (payload) => {
  // Gọi API để đăng ký
  const data = await userApi.register(payload);

  // Lưu dữ liệu vào local storage
  localStorage.setItem("access_token", data.jwt);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  // Gọi API để đăng ký
  const data = await userApi.login(payload);

  // Lưu dữ liệu vào local storage
  localStorage.setItem("access_token", data.jwt);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
});

// Tạo slice cho người dùng
const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

// Trích xuất reducer
const { reducer } = userSlice;
export default reducer;
