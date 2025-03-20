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
  "Technology & IT": [
    "Software Development",
    "Cybersecurity",
    "Artificial Intelligence (AI) & Machine Learning (ML)",
    "Blockchain",
    "Cloud Computing",
    "Data Science & Analytics",
    "IT Support & Infrastructure",
    "Internet of Things (IoT)",
    "Web & App Development",
    "UI/UX Design"
  ],
  "Healthcare & Medicine": [
    "Pharmaceuticals",
    "Biotechnology",
    "Medical Devices",
    "Telemedicine",
    "Health Tech (Digital Health)",
    "Mental Health & Wellness",
    "Healthcare Administration",
    "Nursing & Patient Care",
    "Public Health",
    "Veterinary Medicine"
  ],
  "Finance & Banking": [
    "Investment Banking",
    "FinTech",
    "Insurance",
    "Wealth Management",
    "Accounting & Auditing",
    "Personal Finance & Budgeting",
    "Taxation",
    "Risk Management",
    "Corporate Finance",
    "Stock Market & Trading"
  ],
  "Education & Training": [
    "EdTech",
    "K-12 Education",
    "Higher Education",
    "Vocational Training",
    "Corporate Training",
    "Online Learning & e-Learning",
    "Skill Development"
  ],
  "Manufacturing & Engineering": [
    "Automotive",
    "Aerospace & Defense",
    "Electrical & Electronics",
    "Robotics",
    "Civil & Structural Engineering",
    "Chemical Engineering",
    "Industrial Automation",
    "Textile & Apparel"
  ],
  "Retail & E-commerce": [
    "Online Marketplaces",
    "Fashion & Apparel",
    "Consumer Electronics",
    "Luxury Goods",
    "Grocery & Food Delivery",
    "B2B & B2C E-commerce"
  ],
  "Media & Entertainment": [
    "Film & Television",
    "Music Industry",
    "Gaming & eSports",
    "Publishing & Journalism",
    "Social Media & Content Creation",
    "Animation & VFX",
    "Podcasting"
  ],
  "Energy & Utilities": [
    "Renewable Energy (Solar, Wind, Hydro)",
    "Oil & Gas",
    "Power Generation & Distribution",
    "Electric Vehicles & Battery Technology",
    "Water & Waste Management"
  ],
  "Legal & Compliance": [
    "Corporate Law",
    "Intellectual Property (IP) Law",
    "Criminal Law",
    "Civil & Human Rights Law",
    "Regulatory Compliance",
    "Cyber Law"
  ],
  "Agriculture & Food Industry": [
    "AgriTech",
    "Farming & Horticulture",
    "Food Processing",
    "Supply Chain & Logistics",
    "Organic & Sustainable Farming"
  ],
  "Transportation & Logistics": [
    "Shipping & Freight",
    "Aviation",
    "Railway & Metro",
    "Warehousing & Supply Chain",
    "Last-Mile Delivery"
  ],
  "Real Estate & Construction": [
    "Commercial & Residential Real Estate",
    "Property Management",
    "Architecture & Interior Design",
    "Smart Cities"
  ],
  "Travel & Hospitality": [
    "Tourism & Travel Agencies",
    "Hotels & Resorts",
    "Airlines & Aviation Services",
    "Food & Beverage Industry"
  ],
  "Government & Public Sector": [
    "Policy & Governance",
    "Public Administration",
    "Defense & Law Enforcement",
    "Non-Profit Organizations (NGOs)"
  ],
  "Space & Astronomy": [
    "Space Exploration",
    "Satellite Technology",
    "Aerospace Engineering"
  ]
};