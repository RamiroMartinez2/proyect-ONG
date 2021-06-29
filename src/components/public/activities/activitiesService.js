import axios from "axios";

export const getActivitiesList = async () => {
  try {
    const response = await axios.get("http://ongapi.alkemy.org/api/activities");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getActivity = async (id) => {
  try {
    const response = await axios.get("http://ongapi.alkemy.org/api/activities/"+id);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};