import axios from "axios";
import apiRoutes from "./apiRoutes";

const instance = {
  local: {
    public: axios.create({
      baseURL: "http://localhost:5000", // Replace with your API base URL
      headers: {
        "Content-Type": "application/json",
      },
    }),
  },
};

const submitQuestionnaire = async (payload) => {
  return await instance.local.public.post(
    apiRoutes.submit_questionnaire,
    payload
  );
};
const getTopics = async (topicId) => {
  return await instance.local.public.get(apiRoutes.get_topics, { topicId });
};

const addTopic = async (payload) => {
  return await instance.local.public.post(apiRoutes.create_topic, payload);
};
const requests = {
  submitQuestionnaire,
  getTopics,
  addTopic,
};
export default requests;
