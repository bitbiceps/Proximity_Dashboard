import axios from "axios";
import apiRoutes from "./apiRoutes";

const instance = {
  local: {
    public: axios.create({
      baseURL: "http://locahost:5000", // Replace with your API base URL
      headers: {
        "Content-Type": "application/json",
      },
    }),
  },
};

const submitQuestionnaire = async (payload) => {
  return await instance.local.public.post(apiRoutes.submit_questionnaire, payload);
};

const requests = {
    submitQuestionnaire
};
export default requests;
