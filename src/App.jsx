import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Sidebar from "./components/SideBar/SideBar";
import Dashboard from "./pages/Dashboard";
import Package from "./pages/Package";
import TopicGenerator from "./pages/TopicGenerator";
import ArticleGenerator from "./pages/ArticleGenerator";
import Login from "./pages/Login";
import Registration from "./pages/Registraion";
import { routes } from "./utils";
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

const App = () => {
  const location = useLocation();
  const validRoutes = Object.values(routes); // Extract the valid route paths from the routes object
  const isValidRoute = validRoutes.includes(location.pathname); // Check if the current location matches any of the valid routes

  // Determine if we should show the Sidebar (exclude login and registration routes)
  const isNoSidebar = [routes.login, routes.registration].includes(
    location.pathname
  );
  const isErrorRoute = !isValidRoute; // If it's not a valid route, it's an error (404)
  return (
    <Provider store={store}>
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

            {/* Protected Routes */}
            <Route
              path={routes.root}
              element={<ProtectedRoute Component={Dashboard} />}
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
          </Routes>
        </main>
      </div>
    </Provider>
  );
};

export default App;
