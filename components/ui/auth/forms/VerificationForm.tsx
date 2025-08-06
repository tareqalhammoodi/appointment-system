'use client';

import React, { useState, useEffect } from "react";
import { Form, Button, Input, Typography, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { confirmCode, checkUserExists } from "@/services/authService";
import { useRouter } from "next/navigation";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useAuth } from '@/contexts/authContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthenticationForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const { verificationId, phoneNumber, clearVerification } = useAuth();

  useEffect(() => {
    // Check if we have the required data
    if (!verificationId || !phoneNumber) {
      message.error('Verification session expired. Please try again.');
      router.push('/login');
    }
  }, [verificationId, phoneNumber, router]);

  const handleCodeChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
    const newCodeArray = digitsOnly.split("");
    while (newCodeArray.length < 6) {
      newCodeArray.push("");
    }
    setCode(newCodeArray);
  };
  

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      if (!verificationId) {
        message.error('Verification session expired. Please try again.');
        router.push('/login');
        return;
      }

      const verificationCode = code.join('');
      
      // Confirm the verification code
      const result = await confirmCode(verificationId, verificationCode);
      console.log('After confirm, currentUser:', getAuth().currentUser);
      
      // Wait for Firebase auth state to update
      const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
        console.log('onAuthStateChanged:', firebaseUser);
        if (firebaseUser) {
          unsubscribe();
          // Check if user exists in DB and redirect
          checkUserExists(phoneNumber).then(userCheck => {
            if (userCheck.exists) {
              message.success('Login successful!');
              clearVerification();
              router.push('/home');
            } else {
              sessionStorage.setItem('newUserData', JSON.stringify({
                uid: result.user.uid,
                phoneNumber: phoneNumber
              }));
              router.push('/register');
            }
          });
        } else {
          // If not authenticated, log for debugging
          console.log('User not authenticated after code confirmation.');
        }
      });
    } catch (err: any) {
      console.error('Error confirming code:', err);
      message.error(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      // TODO: implemented resend verification code
      message.info('Verification code resent!');
    } catch (err: any) {
      message.error('Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  // If no verificationId, show loading
  if (!verificationId || !phoneNumber) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-18 w-18 border-b-1 theme-object-primary mx-auto"></div>
        <p className="mt-4 text-lg theme-object-primary">Loading...</p>
      </div>
    );
  }

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
            rules={[{ required: true, message: "Please enter the verification code" }]}
          >
            <Input
              placeholder="# # # # # #"
              className="h-12 theme-input tracking-widest text-center text-lg"
              value={code.join("")}
              onChange={(e) => handleCodeChange(e.target.value)}
              maxLength={6}
            />
          </Form.Item>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isLoading}
            className="theme-link hover:theme-link-hover absolute right-0 top-0"
            style={{ zIndex: 1 }}
          >
            Resend Code
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="theme-object-primary">Remember this device</Checkbox>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full h-12 mt-2 theme-button-primary"
            disabled={code.join('').length !== 6}
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
