const apiRoutes = {
  // submit_questionnaire: "/article/submit-questionnaire",
  submit_questionnaire: "/topic/questionnaire",
  get_topics: "/topic/get",
  get_all_topics: "/topic",
  create_topic: "/topic/create",
  check_auth: "/api/auth/check-auth",
  login: "/api/auth/login",
  email_verify: (token) => `/api/auth/verify/${token}`,
};

export default apiRoutes;
