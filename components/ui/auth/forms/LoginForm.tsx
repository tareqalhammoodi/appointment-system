'use client';

import React, { useState, useRef } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { RecaptchaVerifier } from 'firebase/auth';
import { verifyNumber } from '@/services/authService';
import { useRouter } from 'next/navigation';
import Tooltip from '@/components/elements/Tooltip';
import PhoneIcon from '@/components/icons/phone';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';

// Extend Window interface for TypeScript
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const { setVerificationId, setPhoneNumber } = useAuth();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      let phoneNumber = values.phonenumber;
      setPhoneNumber(phoneNumber);
      const result = await verifyNumber(phoneNumber, 'recaptcha-container');
      setVerificationId(result.verificationId);
      message.success('Verification code sent!');
      router.push(`/login/authenticate?phonenumber=${encodeURIComponent(phoneNumber)}`);
    } catch (err: any) {
      message.error(err.message || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full">
      <Form form={form} name="login" layout="vertical" onFinish={onFinish} size="large">
        <Form.Item
          name="phonenumber"
          label={<span className="theme-object-primary">Phone Number</span>}
          rules={[
            {
              required: true,
              message: 'Phone number is required',
            },
            {
              pattern: /^\+[0-9]{10,15}$/,
              message: 'Phone number should be between 10-15 digits, starts with +.',
            },
          ]}
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
            {isLoading ? 'Sending Code...' : 'Continue'}
          </Button>
        </Form.Item>
      </Form>

      <div id="recaptcha-container" ref={recaptchaRef}></div>
      
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