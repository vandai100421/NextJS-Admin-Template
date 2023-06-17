import React, { ReactNode, useState } from "react";
import { Menu } from "antd";
import { CUSTOMERS, STAFFS } from "routes/route.constant";
import { Link } from "react-router-dom";
import styles from "pages/App/subcomponents/MainLayout/subcomponents/SideBar/sidebar.module.css";
import {
  DashboardOutlined,
  IdcardOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import cx from "classnames";

type SubMenuItem = {
  title: string;
  path: string;
};

type MenuItem = {
  title: string;
  key: string;
  submenus?: Array<SubMenuItem>;
  icon?: ReactNode;
};

const menus: Array<MenuItem> = [
  {
    title: "Thống kê chung",
    key: "dashboard",
    icon: <DashboardOutlined />,
  },
  {
    title: "Quản lý nhân sự",
    key: "staff",
    icon: <IdcardOutlined />,
    submenus: [
      {
        title: "Danh sách nhân sự",
        path: STAFFS,
      },
    ],
  },
  {
    title: "Quản lý khách hàng",
    key: "customer",
    icon: <IdcardOutlined />,
    submenus: [
      {
        title: "Danh sách khách hàng",
        path: CUSTOMERS,
      },
    ],
  },
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div>
      <div className={styles.section}>
        <Menu mode="inline" className={styles.menu} inlineCollapsed={collapsed}>
          {menus.map((menu) =>
            menu.submenus ? (
              <Menu.SubMenu key={menu.key} title={menu.title} icon={menu.icon}>
                {menu.submenus &&
                  menu.submenus.map((submenu) => (
                    <Menu.Item key={submenu.path}>
                      <Link to={submenu.path}>{submenu.title}</Link>
                    </Menu.Item>
                  ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={menu.key} icon={menu.icon}>
                {menu.title}
              </Menu.Item>
            )
          )}
        </Menu>
        <div
          className={styles.collapse}
          onClick={() => setCollapsed((state) => !state)}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </div>
      </div>
      <div className={cx(styles.menu, { [styles.collapsed]: collapsed })} />
    </div>
  );
};

export default SideBar;
