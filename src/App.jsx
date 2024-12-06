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

const App = () => {
  const location = useLocation();
  const validRoutes = Object.values(routes); // Extract the valid route paths from the routes object
  const isValidRoute = validRoutes.includes(location.pathname); // Check if the current location matches any of the valid routes

  // Determine if we should show the Sidebar
  const isNoSidebar = [routes.login, routes.registration].includes(location.pathname); // Example of routes with no sidebar
  const isErrorRoute = !isValidRoute; // If it's not a valid route, it's an error (404)


  return (
    <Provider store={store}>
      <div className="flex">
        {!isNoSidebar && !isErrorRoute && <Sidebar />}
        <div className={isNoSidebar ? "flex-1 w-full" : "flex-1"}>
          <Routes>
            <Route path={routes.login} Component={Login} />
            <Route path={routes.registration} Component={Registration} />
            <Route path={routes.root} Component={Dashboard} />
            <Route path={routes.package} Component={Package} />
            <Route path={routes.topic_generator} Component={TopicGenerator} />
            <Route path={routes.article_writer} Component={ArticleGenerator} />
            <Route path={routes.pricing} Component={Pricing} />
            <Route path={routes.fill_questionnaire} Component={FillQuestionnaire} />
            <Route path={routes.profile} Component={Profile} />
            <Route path={routes.error} Component={ErrorPage} />
            

          </Routes>
        </div>
      </div>
    </Provider>
  );
};

export default App;
