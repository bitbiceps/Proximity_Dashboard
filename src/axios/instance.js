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

const requests = {
  submitQuestionnaire,
  getTopics,
  addTopic,
  getAllTopic,
};

export default requests;
