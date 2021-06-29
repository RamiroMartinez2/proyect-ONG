import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const handleError = () => {
  Swal.fire({
    title: "Error",
    text: "Algo salió mal, por favor refresque la página",
    icon: "error",
    confirmButtonText: "OK",
  });
};

export const fetchOrganizationData = createAsyncThunk("state/fetchOrganizationData", async () => {
    try {
        const response = await axios.get(`http://ongapi.alkemy.org/api/organization`);
        return response.data.data[0];
    } catch (error) {
        handleError();
    }
  });

export const fetchActivities = createAsyncThunk("state/fetchActivities", async () => {
  try {
      const response = await axios.get(`http://ongapi.alkemy.org/api/activities`);
      return response.data.data;
  } catch (error) {
      handleError();
  }
})

export const organizationReducer = createSlice({
  name: "organization",
  initialState: {
    error: "",
    status: "idle",
    organizationData: {},
    activitiesData: [],
  },
    // reducers: {
    //     deleteOrganizationData: (state) => {
    //         state.organizationData = {}
    //     }
    // },
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrganizationData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchOrganizationData.fulfilled, (state, action) => {
            state.organizationData = action.payload;
            state.status = "idle";
        })
        .addCase(fetchOrganizationData.rejected, (state, action) => {
            state.error = action.error;
            state.status = "idle";
        })
        .addCase(fetchActivities.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchActivities.fulfilled, (state, action) => {
          state.activitiesData = action.payload;
          state.status = "idle";
        })
        .addCase(fetchActivities.rejected, (state, action) => {
          state.error = action.error;
          state.status = "idle";
        })
        }
});

// export const { deleteOrganizationData } = organizationReducer.actions;
export default organizationReducer.reducer;