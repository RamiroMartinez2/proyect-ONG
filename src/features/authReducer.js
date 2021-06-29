import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "user",
  initialState: {

    // data: {},
    user: {
      name: null,
      email: null,
      role_id: null,
      loggedIn: false
    }
    
 
  },
  reducers: {

    SET_LOGIN: (state, action) => {
       state.user = action.payload
      
    
    },
    SET_REGISTER: (state, action) => {
      state.user = action.payload
   },

   SET_LOGOUT: (state, action) => {
     state.user = action.payload
        
   },

  },
});

export const {SET_LOGIN, SET_REGISTER, SET_LOGOUT } = authReducer.actions;

export const selectUser = state => state.user.user;

export default authReducer.reducer;