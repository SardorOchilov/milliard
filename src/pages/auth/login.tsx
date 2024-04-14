import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification, Spin } from "antd";
import "./login.scss";
import { useTranslation } from "react-i18next";
import { Login } from "@modules/auth/api";
import { useStore } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { Types, Api } from "@modules/auth";
import { setLocalStorage } from "@/utils/local-storage";
import { useMutation, useQuery } from "react-query";
import ChooseCompany from "@modules/auth/components/choose-company";

const LoginForm = () => {
  const auth = useStore().authentication;
  const user = useStore().user;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [chooseCompany, setChooseCompany] = useState<
    null | "sales-doctor" | "milliard"
  >(null);

  const isLogin = async () => {
    // if (token) {
    //   try {
    //     const data = await Api.GetMe(token);
    //     user.setUser(data);
    //     auth.login();
    //     navigate("/app/sales/customer-order");
    //   } catch (err) {
    //     /* empty */
    //   }
    // }
  };

  const login = useMutation("login", Login, {
    onSuccess: async (data) => {
      console.log("success", data);
      localStorage.setItem("token", data.accessToken);
      await setLocalStorage("token", data.accessToken);
      auth.login();
      user.setUser(data.employee);
      notification.success({
        message: t("login-success"),
      });
      navigate("/app/sales/list");
    },
    onError: (err) => {
      notification.error({
        message: t("login-fail"),
      });
      form.resetFields();
    },
  });

  useEffect(() => {
    if (token) isLogin();
  }, []);

  const onSubmit = async (value: Types.Login.Request) => {
    login.mutate(value);
  };

  const handleChooseCompany = (value: "milliard" | "sales-doctor") => {
    setChooseCompany(value);
  };

  return (
    <div className="login-page size-full flex justify-center items-center px-4">
      {token ? (
        <Spin />
      ) : !chooseCompany ? (
        <ChooseCompany setChooseCompany={setChooseCompany} />
      ) : (
        <Form
          form={form}
          className="w-[400px] bg-gradient-to-bl from-[#05BFDBCC] to-[#0A4D68CC]  p-10 rounded-3xl"
          layout="vertical"
          onFinish={onSubmit}
        >
          <h4 className="text-center text-white font-bold text-2xl mb-8">
            {t("authorization")}
          </h4>
          <Form.Item
            label={t("EmployeeCode")}
            name="EmployeeCode"
            rules={[
              {
                required: true,
                message: t("m-input", { what: t("EmployeeCode") }),
              },
            ]}
          >
            <Input size={"large"} />
          </Form.Item>
          <Form.Item
            label={t("ExternalEmployeeNumber")}
            name="ExternalEmployeeNumber"
            rules={[
              {
                required: true,
                message: t("m-input", { what: t("ExternalEmployeeNumber") }),
              },
            ]}
          >
            <Input.Password size={"large"} />
          </Form.Item>
          <Form.Item>
            <Button
              size={"large"}
              loading={login.isLoading}
              className="border w-full rounded-xl bg-white border-none text-secondary font-bold mt-12 hover:bg-lighter-green transition-all duration-300 active:scale-95"
              htmlType="submit"
            >
              {t("login")}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default LoginForm;
