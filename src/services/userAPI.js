import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/user";

const userAPI = {
  fetchUser: async (token) => {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  editProfile: async (token, updatedData) => {
    const response = await axios.post(`${BASE_URL}/edit-profile`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  setProfileImage: async (token, formData) => {
    console.log(formData);
    const response = await axios.post(`${BASE_URL}/profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
  getAllInvites: async (token) => {
    const response = await axios.get(`${BASE_URL}/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  changeInviteRequest: async (token) => {
    const response = await axios.get(
      `${BASE_URL}/change-status-request/:id/:status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },
  getInviteRequestByStatus: async (token) => {
    const response = await axios.get(`${BASE_URL}/requests/:status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};

export default userAPI;
