import axios from "axios";
import apiRoutes from "./apiRoutes";

export const baseURL = "https://api.proximity.press"; // PROD
// export const baseURL = "https://staging.api.proximity.press"; // STAGE
// export const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const submitQuestionnaire = async (payload) => {
  return await api.post(apiRoutes.submit_questionnaire, payload);
};

const getTopics = async (topicId) => {
  return await api.get(apiRoutes.get_topics, { topicId });
};

const getAllTopic = async (topicId) => {
  return await api.get(apiRoutes.get_all_topics, { topicId });
};

const addTopic = async (payload) => {
  return await api.post(apiRoutes.create_topic, payload);
};

const checkAuth = async (payload) => {
  return await api.post(apiRoutes.check_auth, payload);
};

const login = async (payload) => {
  return await api.post(apiRoutes.login, payload);
};

const verifyUserRegistration = async (payload) => {
  return await api.get(apiRoutes.email_verify(payload));
};

const resetPassword = async (payload) => {
  return await api.post(apiRoutes.reset_password , payload);
};

const verifyOtp = async (payload) => {
  return await api.post(apiRoutes.verify_otp , payload);
};

const changePassword = async (payload) => {
  return await api.post(apiRoutes.change_password , payload);
};




const requests = {
  submitQuestionnaire,
  getTopics,
  addTopic,
  getAllTopic,
  checkAuth,
  login,
  verifyUserRegistration,
  changePassword,
  verifyOtp,
  resetPassword
};

export default requests;
