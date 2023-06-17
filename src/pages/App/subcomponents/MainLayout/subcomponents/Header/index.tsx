import React, { useCallback } from "react";
import { Avatar, Dropdown, Menu, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import authApi from "apis/auth";
import styles from "pages/App/subcomponents/MainLayout/subcomponents/Header/header.module.css";
import appStore from "pages/App/store";
import { useHookstate } from "@hookstate/core";

const Header = () => {
  const appState = useHookstate(appStore);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      appState.isLogged.set(false);
    } catch (error) {
      message.error("Đăng xuất không thành công. Vui lòng thử lại.");
    }
  };

  const menu = useCallback(
    () => (
      <Menu>
        <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    ),
    []
  );

  return (
    <header className={styles.section}>
      <span className={styles.logo}>
        <img src="https://preview.pro.ant.design/logo.svg" alt="logo" />
      </span>
      <div>
        <span>
          <Dropdown overlay={menu}>
            <Avatar />
          </Dropdown>
        </span>
      </div>
    </header>
  );
};

export default Header;
