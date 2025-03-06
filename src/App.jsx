import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "./components/SideBar/SideBar";
import Dashboard from "./pages/Dashboard";
import Package from "./pages/Package";
import TopicGenerator from "./pages/TopicGenerator";
import ArticleGenerator from "./pages/ArticleGenerator";
import Login from "./pages/Login";
import Registration from "./pages/Registraion";
import { routes, socketEvents } from "./utils";
import { Pricing } from "./pages/Pricing";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import FillQuestionnaire from "./pages/FillQuestionnaire";
import QuestionnaireForm from "./pages/QuestionnaireForm";
import ArticlesUnlocked from "./pages/ArticlesUnlocked";
import TitleSuggestions from "./pages/TitleSuggestions";
import GeneratedArticle from "./pages/GeneratedArticle";
import PRServices from "./pages/PRServices";
import PopupSearch from "./pages/PopupSearch";
import ProtectedRoute from "./components/common/ProtectedRoutes";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import TopicUnlocked from "./pages/TopicUnlocked";
import { SecondaryQuestionnaire } from "./pages/SecondaryQuestionnaire";
import { LoadingPage } from "./pages/LoadingPage";
import { TextGenerating } from "./pages/TextGenerating";
import { io } from "socket.io-client";
import { addNotification } from "./redux/slices/notificationSlice";
import { baseURL } from "./axios/instance";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import TermsAndConditions from "./pages/TermsAndConditions"

const stripePromise = loadStripe(
  "pk_test_51QWIkaBBg8UnRcHy6LiZZOsitw0AHYmTHUIMjMtSXhbn6cB1BKjCruCm9yXQDEvaaLgXUsowR8NgF18IYpSYjDPK00SPnOWbsq"
); // Replace with your Stripe publishable key

const App = () => {
  const location = useLocation();
  const validRoutes = Object.values(routes); // Extract the valid route paths from the routes object
  const isValidRoute = validRoutes.includes(location.pathname); // Check if the current location matches any of the valid routes

  // Determine if we should show the Sidebar (exclude login and registration routes)
  const isNoSidebar = [
    routes.login,
    routes.registration,
    routes.primary_questionnaire,
    routes.secondary_questionnaire,
    routes.basicInformation,
    routes.forgot_password,
    routes.generated_article,
    routes.terms_condition
  ].includes(location.pathname);
  const isErrorRoute = !isValidRoute; // If it's not a valid route, it's an error (404)
  const dispatch = useDispatch()



    useEffect(() => {
      const socket = io(baseURL);
  
      // Listen for the broadcast notification from the server
      socket.on(socketEvents.TEST__BROADCAST, (data) => {
        console.log(data.message,"SOCKET")
        dispatch(addNotification(data))
      });
  
      // Cleanup by disconnecting the socket when the component unmounts
      return () => {
        socket.disconnect();
      };
    }, []);
  return (
      <div className="antialiased flex h-screen">
        {!isNoSidebar && !isErrorRoute && (
          <div className="relative w-fit h-screen">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 overflow-auto min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path={routes.login} Component={Login} />
            <Route path={routes.registration} Component={Registration} />
            <Route path={routes.forgot_password} Component={ForgotPassword} />
            <Route path={routes.terms_condition} Component={TermsAndConditions} />


            {/* Protected Routes */}

            <Route
              path={routes.root}
              element={<ProtectedRoute Component={Dashboard} />}
            />
            <Route
              path={routes.text}
              element={<ProtectedRoute Component={TextGenerating} />}
            />
            {/* <Route
              path={routes.primary_questionnaire}
              element={<ProtectedRoute Component={Questionnair} />}
            /> */}
            <Route
              path={routes.basicInformation}
              element={<ProtectedRoute Component={LoadingPage} />}
            />
            <Route
              path={routes.email_verfication}
              element={<EmailVerification/>}
            />
            <Route
              path={routes.secondary_questionnaire}
              element={<ProtectedRoute Component={SecondaryQuestionnaire} />}
            />
            <Route
              path={routes.package}
              element={<ProtectedRoute Component={Package} />}
            />
            <Route
              path={routes.pr_services}
              element={<ProtectedRoute Component={PRServices} />}
            />
            <Route
              path={routes.topic_generator}
              element={<ProtectedRoute Component={TopicGenerator} />}
            />
            <Route
              path={routes.article_writer}
              element={<ProtectedRoute Component={ArticleGenerator} />}
            />
            <Route
              path={routes.pricing}
              element={<ProtectedRoute Component={Pricing} />}
            />
            <Route
              path={routes.fill_questionnaire}
              element={<ProtectedRoute Component={FillQuestionnaire} />}
            />
            <Route
              path={routes.profile}
              element={<ProtectedRoute Component={Profile} />}
            />
            <Route
              path={routes.error}
              element={<ProtectedRoute Component={ErrorPage} />}
            />
            <Route
              path={routes.questionnaire_form}
              element={<ProtectedRoute Component={QuestionnaireForm} />}
            />
            <Route
              path={routes.articles_unlocked}
              element={<ProtectedRoute Component={ArticlesUnlocked} />}
            />
            <Route
              path={routes.topic_unlocked}
              element={<ProtectedRoute Component={TopicUnlocked} />}
            />
            <Route
              path={routes.title_suggestions}
              element={<ProtectedRoute Component={TitleSuggestions} />}
            />
            <Route
              path={routes.generated_article}
              element={<ProtectedRoute Component={GeneratedArticle} />}
            />
            <Route
              path={routes.popup_search}
              element={<ProtectedRoute Component={PopupSearch} />}
            />
            {/* <Route
              path={routes.payment}
              element={
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              }
            /> */}
            {/* <Route path={routes.package} Component={Package} />
            <Route path={routes.pr_services} Component={PRServices} />
            <Route path={routes.topic_generator} Component={TopicGenerator} />
            <Route path={routes.article_writer} Component={ArticleGenerator} />
           
            <Route path={routes.profile} Component={Profile} />
            <Route path={routes.error} Component={ErrorPage} />
            <Route
              path={routes.questionnaire_form}
              Component={QuestionnaireForm}
            />
            <Route
              path={routes.articles_unlocked}
              Component={ArticlesUnlocked}
            />
            <Route
              path={routes.title_suggestions}
              Component={TitleSuggestions}
            />
            <Route
              path={routes.generated_article}
              Component={GeneratedArticle}
            />
            <Route path={routes.popup_search} Component={PopupSearch} /> */}
          </Routes>
        </main>
        <ToastContainer />
      </div>
    
  );
};

export default App;
