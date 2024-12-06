import React from "react";
import Sidebar from "./components/SideBar/SideBar";
import { Provider } from "react-redux";
import store from "./redux/store"
import { Routes, Route } from "react-router-dom";
import { routes } from "./utils";
import Dashboard from "./pages/Dashboard";
import Package from "./pages/Package";
import TopicGenerator from "./pages/TopicGenerator";
import ArticleGenerator from "./pages/ArticleGenerator";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex t">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path={routes.root} Component={Dashboard} />
            <Route path={routes.package} Component={Package} />
            <Route path={routes.topic_generator} Component={TopicGenerator} />
            <Route path={routes.article_writer} Component={ArticleGenerator} />
            <Route path={routes.profile} Component={Profile} />
          </Routes>
        </div>
      </div>
    </Provider>

  );
};

export default App;
