import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  notification,
  Space,
} from "antd";
import {
  HamburgerOpen,
  HamburgerClose,
  Logo,
  UserIcon,
  ClientsIcon,
  SalesIcon,
} from "@/assets/icons";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";
import uzFlag from "@/assets/images/uz.png";
import ruFlag from "@/assets/images/ru.png";
import enFlag from "@/assets/images/en.png";
import cls from "classnames";

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useStore().user;
  const auth = useStore().authentication;
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  const menu = useMemo(() => {
    const menu: any = [
      {
        key: "/app/sales",
        icon: <SalesIcon />,
        label: t("sales"),
        children: [
          {
            key: "/app/sales/list",
            label: t("sales-order"),
          },
        ],
      },
      {
        key: "/app/clients",
        icon: <ClientsIcon className="text-white size-6" />,
        label: t("clients"),
        children: [
          {
            key: "/app/clients/list",
            label: t("clients"),
          },
        ],
      },
    ];
    return menu;
  }, [t]);

  const handleMenu = useCallback((e: { key: string }) => {
    navigate(e.key);
  }, []);

  const langs = ["ru", "uz"];
  const userLang = localStorage.getItem("i18nextLng");
  const [lang, setLang] = useState(
    langs.findIndex((item) => item === userLang) > -1 ? userLang : "ru",
  );
  const handleLanguage = async (value: number) => {
    try {
      await i18n.changeLanguage(langs[value]);
      setLang(langs[value]);
    } catch (err) {
      notification.error({
        message: "Can not change language",
      });
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "ru",
      icon: <img className="size-5" src={ruFlag} alt={"flag"} />,
      onClick: () => handleLanguage(0),
    },
    {
      key: "3",
      label: "uz",
      icon: <img className="size-5" src={uzFlag} alt={"flag"} />,
      onClick: () => handleLanguage(2),
    },
  ];
  const handleLogout = () => {
    auth.logout();
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <Layout className="layout-main h-full ">
      <Sider
        breakpoint="lg"
        collapsedWidth={collapsedWidth}
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
          if (collapsed) setCollapsedWidth(0);
          else setCollapsedWidth(80);
        }}
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: collapsedWidth !== 0 ? "sticky" : "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 20,
        }}
      >
        <div className="mb-10 flex gap-4 p-4 shadow-lg items-center">
          {!collapsed && (
            <div className="pt-1 w-30 ">
              <Logo />
            </div>
          )}
          <Button
            className={cls("select-none")}
            type="text"
            icon={
              collapsed ? (
                <div className="w-5 h-7">
                  <HamburgerClose className="text-white" />
                </div>
              ) : (
                <div className="w-5 h-7">
                  <HamburgerOpen className="text-white" />
                </div>
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Menu
          className="select-none text-[13px]"
          onClick={handleMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={["/app/sales"]}
          items={menu}
        />
      </Sider>
      <Layout className="transition-all duration-300">
        <Header
          className={cls(
            "bg-white flex items-center" + " shadow-lg z-10",
            {
              "justify-between": collapsedWidth === 0,
            },
            { "justify-end": collapsedWidth !== 0 },
          )}
        >
          <Button
            className={cls("select-none", {
              hidden: collapsedWidth !== 0,
            })}
            type="text"
            icon={
              collapsed ? (
                <div className="w-5 h-7">
                  <HamburgerClose className="text-secondary" />
                </div>
              ) : (
                <div className="w-5 h-7">
                  <HamburgerOpen className="text-secondary" />
                </div>
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="flex items-center gap-7">
            <Dropdown
              placement="bottom"
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: [lang || "ru"],
              }}
            >
              <Button className="flex gap-2 items-center" type={"text"}>
                <Flag name={lang || "ru"} />
              </Button>
            </Dropdown>
            <Dropdown
              placement="bottom"
              menu={{
                selectable: true,
              }}
              dropdownRender={() => (
                <div className="flex justify-center bg-white shadow-md px-2 py-1">
                  <Space style={{ padding: 8 }}>
                    <Button danger type="primary" onClick={handleLogout}>
                      {t("logout")}
                    </Button>
                  </Space>
                </div>
              )}
            >
              <span
                className="flex gap-2 font-bold cursor-pointer select-none items-center"
                onClick={() => handleLanguage}
              >
                <div>
                  <UserIcon className="size-7" />
                </div>
                <span>
                  {user.user.firstName} {user.user.lastName}
                </span>
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content className="pt-7 bg-white overflow-y-auto h-[70vh]">
          <div className="px-8">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

const Flag = ({ name }: { name: string }) => {
  if (name === "en")
    return <img className="size-5" src={enFlag} alt={"flag"} />;

  if (name === "uz")
    return <img className="size-5" src={uzFlag} alt={"flag"} />;

  return <img className="size-5" src={ruFlag} alt={"flag"} />;
};
