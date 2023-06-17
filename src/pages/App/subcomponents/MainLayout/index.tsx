import React, { FC, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "routes/route.constant";
import Header from "pages/App/subcomponents/MainLayout/subcomponents/Header";
import SideBar from "pages/App/subcomponents/MainLayout/subcomponents/SideBar";
import authApi from "apis/auth";
import styles from "pages/App/subcomponents/MainLayout/mainLayout.module.css";
import appStore from "pages/App/store";
import { useHookstate } from "@hookstate/core";

const MainLayout: FC = () => {
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);
  const appState = useHookstate(appStore);

  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleCheckToken = async () => {
    try {
      await authApi.checkToken();
      appState.isLogged.set(true);
      setIsCheckingToken(false);
    } catch (error) {
      appState.isLogged.set(false);
      setIsCheckingToken(false);
    }
  };

  if (isCheckingToken) {
    return null;
  }

  if (!appState.isLogged.get()) {
    return <Navigate to={LOGIN} replace />;
  }

  return (
    <div>
      <Header />
      <div className={styles.body}>
        <SideBar />
        <div className={styles.mainContent}>
          <Outlet />
          <div className={styles.copyright}>
            <span>© 2022 Developed by Darwin Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
