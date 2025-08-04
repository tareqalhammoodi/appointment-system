import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
} from 'antd';
import Link from 'next/link';
import { verifyNumber } from "@/services/authService";
import { useRouter } from "next/navigation";
import Tooltip from '@/components/elements/Tooltip';
import PhoneIcon from '@/components/icons/phone';

const LoginForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // backend call
      await verifyNumber(values); // verify number by sending verification code
      // Redirect to verification code page with phonenumber as query param
      router.push(`/login/authenticate?phonenumber=${encodeURIComponent(values.phonenumber)}`);
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
        name="login"
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="phonenumber"
          label={<span className="theme-object-primary">Phone Number</span>}
          rules={[{ required: true, message: 'Enter your phone number' }]}
        >
          <Input
            prefix={<PhoneIcon className="theme-object-tertiary" />}
            placeholder="5XX XXX XX XX"
            className="h-14 theme-input"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full h-12 theme-button-primary"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </Button>
        </Form.Item>
      </Form>
      
      <div className="text-center mt-6">
      <Typography.Text className="theme-object-secondary">
        Not a member yet?{' '}
        <Tooltip text="You can start the registration process by entering your phone number.">
          <Link
            href=""
            className="theme-link hover:theme-link-hover font-medium"
          >
            Sign Up
          </Link>
        </Tooltip>{' '}
        Now!
      </Typography.Text>
    </div>

      <div className="text-center mt-30 theme-object-tertiary text-xs">
        <a href="#" className="theme-link">Terms of Service</a> and <a href="#" className="theme-link">Privacy Policy</a>
      </div>
    </div>
  );
};

export default LoginForm;