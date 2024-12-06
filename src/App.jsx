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

const App = () => {
  const location = useLocation();
  const noSidebarRoutes = [routes.login, routes.registration];

  const isNoSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <Provider store={store}>
      <div className="flex">
        {!isNoSidebar && <Sidebar />}
        <div className={isNoSidebar ? "flex-1 w-full" : "flex-1"}>
          <Routes>
            <Route path={routes.login} Component={Login} />
            <Route path={routes.registration} Component={Registration} />
            <Route path={routes.root} Component={Dashboard} />
            <Route path={routes.package} Component={Package} />
            <Route path={routes.topic_generator} Component={TopicGenerator} />
            <Route path={routes.article_writer} Component={ArticleGenerator} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
};

export default App;
