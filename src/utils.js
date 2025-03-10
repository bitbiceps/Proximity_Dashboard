export const routes = {
  root: "/",
  package: "/package",
  topic_generator: "/topic_generator",
  article_writer: "/article_writer",
  login: "/login",
  pr_services: "/pr_services",
  registration: "/registration",
  pricing: "/pricing",
  fill_questionnaire: "/fill_questionnaire",
  profile: "/profile",
  logout: "/logout",
  error: "*",
  questionnaire_form: "/questionnaire_form",
  articles_unlocked: "/articles_unlocked",
  topic_unlocked: "/topic_unlocked",
  title_suggestions: "/title_suggestions",
  generated_article: "/generated_article",
  popup_search: "/popup_search",
  primary_questionnaire: "/primary-questionnaire",
  secondary_questionnaire: "/secondary-questionnaire",
  basicInformation: "/basic-information",
  text: "/text",
  email_verfication: "/verify/:token",
  forgot_password : "/forgot-password",
  terms_condition : "/terms_condition",
  team_reply : "/team-message"
  // payment:"/payment"
};

export const sideBarTabs = {
  dashboard: "Dashboard",
  package: "Package",
  topicGenerator: "Topic Generator",
  articleWriter: "Article Writer",
  profile: "Profile",
  logout: "Logout",
  articles_unlocked: "Articles Unlocked",
  team_reply : "Team Message"
};

export const cookieAccessKeys = {
  tokens: {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  },
};

export const socketEvents = {
  TEST__BROADCAST: "TEST__BROADCAST",
};



export const getCroppedImg = async (imageSrc, crop, zoom) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width;
      canvas.height = crop.height;

      // Create a circular clipping path
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        0,
        2 * Math.PI
      );
      ctx.clip(); // Clip to circle

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      }, "image/png"); // Use PNG to preserve transparency
    };

    image.onerror = (err) => reject(new Error("Failed to load image: " + err.message));
  });
};


export const industryJobRoles = {
  "Software and IT": [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "AI/ML Engineer",
    "Cybersecurity Analyst",
    "System Administrator",
    "Network Engineer",
    "Database Administrator",
    "UI/UX Designer",
  ],
  "Finance and Banking": [
    "Financial Analyst",
    "Investment Banker",
    "Accountant",
    "Risk Manager",
    "Auditor",
    "Compliance Officer",
  ],
  "Healthcare and Medicine": [
    "Doctor",
    "Nurse",
    "Medical Researcher",
    "Pharmacist",
    "Healthcare Administrator",
    "Physician Assistant",
  ],
  "Education and Research": [
    "Professor",
    "Lecturer",
    "Research Scientist",
    "Academic Advisor",
    "Teacher",
    "Research Assistant",
  ],
  "Marketing and Advertising": [
    "Marketing Manager",
    "SEO Specialist",
    "Social Media Manager",
    "Content Strategist",
    "Brand Manager",
    "Market Research Analyst",
  ],
  "Sales and Business Development": [
    "Sales Executive",
    "Business Development Manager",
    "Account Manager",
    "Client Relationship Manager",
    "Sales Director",
  ],
  "Human Resources": [
    "HR Manager",
    "Talent Acquisition Specialist",
    "HR Generalist",
    "Compensation & Benefits Analyst",
    "Training & Development Specialist",
  ],
  "Manufacturing and Engineering": [
    "Mechanical Engineer",
    "Civil Engineer",
    "Electrical Engineer",
    "Production Manager",
    "Quality Assurance Engineer",
  ],
  "Legal and Compliance": [
    "Corporate Lawyer",
    "Compliance Officer",
    "Legal Consultant",
    "Paralegal",
    "Contract Manager",
  ],
  "Creative and Design": [
    "Graphic Designer",
    "UX/UI Designer",
    "Video Editor",
    "Animator",
    "Illustrator",
    "Creative Director",
  ],
};


