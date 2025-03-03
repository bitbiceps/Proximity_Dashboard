import axios from "axios";
import apiRoutes from "./apiRoutes";

// export const baseURL = "https://api.proximity.press";
export const baseURL = "http://localhost:5000";

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

const requests = {
  submitQuestionnaire,
  getTopics,
  addTopic,
  getAllTopic,
  checkAuth,
  login,
  verifyUserRegistration,
};

export default requests;
