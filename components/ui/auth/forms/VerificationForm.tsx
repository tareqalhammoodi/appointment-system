import React, { useState, useRef } from "react";
import { Form, Button, Input, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { checkMemberState, confirmCode, verifyNumber } from "@/services/authService";
import { useRouter } from "next/navigation";
import Checkbox from "antd/es/checkbox/Checkbox";

const AuthenticationForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const router = useRouter();


  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // backend call
      await confirmCode({ ...values, code: code.join("") }); // confirm verification code if it's correct
      await checkMemberState({ ...values, code: code.join("") }); // check if given phone number already signed to an account
      // Redirect
      // if yes
      // router.push(`/home`);
      // if no
      router.push(`/register`);
    } catch (err: any) {
      if (err.errors) {
        form.setFields(
          err.errors.map((zodErr: any) => ({
            name: zodErr.path[0],
            errors: [zodErr.message],
          }))
        );
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md w-full">
      <Form
        form={form}
        name="authentication"
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <div className="relative">
          <Form.Item
            name="verificationcode"
            label={<span className="theme-object-primary">Enter Code</span>}
            rules={[{ message: "Enter verification code" }]}
          >
            <Input
              placeholder="# # # # # #"
              className="h-12 theme-input"
            />
          </Form.Item>
          <Link href="/" className="theme-link hover:theme-link-hover absolute right-0 top-0" style={{ zIndex: 1 }}>
          Resend Code
          </Link>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="theme-object-primary">Remamber this device</Checkbox>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full h-12 mt-2 theme-button-primary"
          >
            {isLoading ? "Submitting..." : "Submit Code"}
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-6">
        <Typography.Text className="theme-object-secondary">
        If you didn't receive a code resend code or {' '}
          <Link href="/register" className="theme-link hover:theme-link-hover">
            try another number
          </Link>
        .
        </Typography.Text>
      </div>

      <div className="text-center mt-4">
        <Link href="/login" className="font-medium">
          <ArrowLeftOutlined style={{ fontSize: "16px", marginRight: "8px" }} />
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default AuthenticationForm;
