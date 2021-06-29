import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const handleError = (message) => {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};

const handleSuccess = (message) => {
  Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  });
};

const initialState = {
  error: "",
  status: "idle",
  userList: [],
  singleUser: {},
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://ongapi.alkemy.org/api/users");
  return response.data.data;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (id) => {
  const response = await axios.get(`http://ongapi.alkemy.org/api/users/${id}`);
  return response.data.data;
});

export const editUser = createAsyncThunk("users/editUser", async (userData) => {
  try {
    const response = await axios.put(
      `http://ongapi.alkemy.org/api/users/${userData.id}`,
      userData
    );
    handleSuccess("Usuario editado");
    return response.data;
  } catch (error) {
    handleError("Hubo un error");
  }
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://ongapi.alkemy.org/api/users",
        userData
      );
      handleSuccess("Usuario creado");
      return response.data;
    } catch (error) {
      handleError("Hubo un error");
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await axios.delete(
    `http://ongapi.alkemy.org/api/users/${id}`
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeUserFromState: (user, action) => {
      const index = user.userList.indexOf((user) => user.id === action.payload);
      user.userList.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (users) => {
        users.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (user, action) => {
        user.singleUser = action.payload;
        user.status = "idle";
      })
      .addCase(fetchUsers.pending, (users) => {
        users.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (users, action) => {
        users.userList = action.payload;
        users.status = "idle";
      })
      .addCase(fetchUsers.rejected, (users, action) => {
        users.error = action.error;
        users.status = "idle";
      })
      .addCase(createUser.pending, (users) => {
        users.status = "creating user";
      })
      .addCase(createUser.rejected, (users, action) => {
        users.error = action.error;
      })
      .addCase(createUser.fulfilled, (users, action) => {
        users.status = "created user";
        if (action.payload.data !== undefined) {
          users.userList = users.userList.concat(action.payload.data);
        }
      })
      .addCase(editUser.fulfilled, (users, action) => {
        if (action.payload.data !== undefined) {
          const index = users.userList.findIndex(
            (user) => user.id === action.payload.data.id
          );
          users.userList[index] = action.payload.data;
        }
      });
  },
});

export const { removeUserFromState } = userSlice.actions;

export default userSlice.reducer;
