import { Button, Form, Input, message } from "antd";
import WelcomeContent from "../common/welcome-content";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("Register successfull , please login to continue");
      navigate("/login");
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
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
          onFinish={onSubmit}
        >
          <h1 className="text-2xl font-bold text-primary">
            Register on CrowdSpark
          </h1>

          <hr />

          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

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
            Register
          </Button>

          <span className="text-sm">
            Have an account on CrowdSpark ? <Link to="/login">Login</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
