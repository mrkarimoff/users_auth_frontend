import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config.json";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const validateMessages = {
    required: " ${name} is required!",
    pattern: {
      mismatch: "${name} is invalid ",
    },
  };
  // {withCredentials: true}

  const onFinish = (values) => {
    axios
      .post(config.baseUrl + "/auth/login", values, { withCredentials: true })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        toast(error?.response?.data?.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div className="main">
        <div className="main-cont">
          <h2>Sign in to your account</h2>
          <p>
            Don't have an account? <Link to={"/register"}>Sign Up</Link>
          </p>

          <Card
            style={{
              width: "100%",
              padding: "8px",
            }}
          >
            <Form
              validateMessages={validateMessages}
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                ]}
              >
                <Input type="email" size="large" placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  size="large"
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item style={{ marginTop: "30px" }}>
                <Button size="large" style={{ width: "100%" }} type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
