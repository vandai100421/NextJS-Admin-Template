import React, { useState } from "react";
import { Alert, Button, Card, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "apis/auth";
import { isValidEmail, isValidPhoneNumber } from "utils/validate";
import { LoginData } from "constants/types/auth.type";
import { useNavigate } from "react-router-dom";
import { DEFAULT } from "routes/route.constant";
import styles from "pages/Login/login.module.css";
import appStore from "pages/App/store";
import { useHookstate } from "@hookstate/core";

type FormLoginData = {
  accessValue: string;
  password: string;
};

const loginSchema = Yup.object().shape({
  accessValue: Yup.string().required(
    "Email/Số điện thoại/Tên đăng nhập không được để trống."
  ),
});

const Login = () => {
  const navigate = useNavigate();
  const appState = useHookstate(appStore);

  // self state
  const [loginError, setLoginError] = useState<string>("");

  const initFormLoginData: FormLoginData = {
    accessValue: "",
    password: "",
  };

  const formLogin = useFormik({
    initialValues: initFormLoginData,
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      const loginData: LoginData = {
        password: data.password,
      };
      if (isValidEmail(data.accessValue)) {
        loginData.email = data.accessValue;
      } else if (isValidPhoneNumber(data.accessValue)) {
        loginData.phone = data.accessValue;
      } else {
        loginData.username = data.accessValue;
      }

      try {
        await authApi.login(loginData);
        appState.isLogged.set(true);
        navigate(DEFAULT);
      } catch (error: any) {
        setLoginError(error.response.data.errors);
      }
    },
  });

  return (
    <section className={styles.section}>
      <div className={styles.headerSection}>
        <span className={styles.logo}>
          <img src="https://preview.pro.ant.design/logo.svg" alt="logo" />
        </span>
        <span className={styles.header}>Darwin Shuttle Bus</span>
      </div>
      <div className={styles.description}>
        <span>Darwin Shuttle Bus là website quản lý vận hành xe khách.</span>
      </div>
      <div className={styles.formSection}>
        <Card>
          {loginError && (
            <Alert message={loginError} type="error" className="mb-4" />
          )}
          <Form onFinish={formLogin.handleSubmit}>
            <Form.Item
              validateStatus={
                formLogin.errors.accessValue && formLogin.touched.accessValue
                  ? "error"
                  : ""
              }
              help={
                formLogin.touched.accessValue && formLogin.errors.accessValue
              }
            >
              <Input
                placeholder="Email/Số điện thoại/Tên đăng nhập"
                name="accessValue"
                value={formLogin.values.accessValue}
                onChange={formLogin.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Mật khẩu"
                type="password"
                name="password"
                value={formLogin.values.password}
                onChange={formLogin.handleChange}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Button block type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form>
        </Card>
      </div>
      <div className={styles.copyright}>
        <span>© 2022 Developed by Darwin Technology</span>
      </div>
    </section>
  );
};

export default Login;
