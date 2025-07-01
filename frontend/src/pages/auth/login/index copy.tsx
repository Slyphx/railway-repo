import { Button, Form, Input, message } from "antd";
import WelcomeContent from "../common/welcome-content";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      message.success("Login successfull");
      Cookies.set("token", response.data.token);
      navigate("/");
    } catch (error: any) {
      message.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="welcome-content bg-primary md:flex justify-center items-center hidden">
        <WelcomeContent />
      </div>
      <div className="form-content flex items-center justify-center">
        <Form
          className="flex flex-col gap-5 w-96"
          layout="vertical"
          onFinish={onFinish}
        >
          <h1 className="text-2xl font-bold text-primary">
            Login to your CrowdSpark account
          </h1>

          <hr />

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>

          <span className="text-sm">
            Don't have an account on CrowdSpark ? <Link to="/register">Register</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
