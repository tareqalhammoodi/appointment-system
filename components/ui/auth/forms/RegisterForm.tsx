'use client';

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  message,
} from 'antd';
import { useRouter } from 'next/navigation';
import { saveUser } from "@/services/authService";
import clsx from "clsx";
import PersonIcon from '@/components/icons/person';
import LocationIcon from '@/components/icons/location';
import MailIcon from '@/components/icons/mail';
import CalendarIcon from '@/components/icons/calendar';

const RegisterForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Get user data from session storage
    const storedUserData = sessionStorage.getItem('newUserData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      // If no user data, redirect to login
      router.push('/login');
    }
  }, [router]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      if (!userData) {
        message.error('Registration session expired. Please try again.');
        router.push('/login');
        return;
      }

      // Split full name into first and last name
      const nameParts = values.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Prepare user data for saving
      const userDataToSave = {
        uid: userData.uid,
        phoneNumber: userData.phoneNumber,
        firstName,
        lastName,
        email: values.email || '',
        address: values.address || '',
        birthdate: values.birthdate || '',
        gender: values.gender || 'male',
      };

      // Save user to database
      await saveUser(userDataToSave);
      
      // Clear session storage and context
      sessionStorage.removeItem('newUserData');
      
      message.success('Registration successful! Welcome to our platform.');
      router.push('/home');
      
    } catch (err: any) {
      console.error('Error saving user data:', err);
      message.error(err.message || 'Failed to complete registration');
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
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
        name="register"
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="name"
          label={<span className="theme-object-primary">Full Name</span>}
          rules={[{ required: true, message: "Enter your full name" }]}
        >
          <Input
            prefix={<PersonIcon className='theme-object-tertiary mb-1' />}
            placeholder="ex: H. Fort"
            className="h-12 theme-input"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="theme-object-primary">Email</span>}
          rules={[{ required: true, message: "Enter your email" }]}
        >
          <Input
            prefix={<MailIcon className="theme-object-tertiary mt-1" />}
            placeholder="ex: h.fort@example.com"
            className="h-12 theme-input"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label={<span className="theme-object-primary">Address</span>}
          rules={[{ required: true, message: "Enter your address" }]}
        >
          <Input
            prefix={<LocationIcon className="theme-object-tertiary" />}
            placeholder="ex: 14 street, New York, NY - 5101"
            className="h-12 theme-input"
          />
        </Form.Item>

        <div className="flex gap-4 mb-2">
          <Form.Item
            name="birthdate"
            label={<span className="theme-object-primary">Date of birth</span>}
            rules={[{ required: true, message: "Enter your date of birth" }]}
            className="flex-1"
          >
            <Input
              prefix={<CalendarIcon className="theme-object-tertiary" />}
              placeholder="ex: 20.05.2000"
              className="h-12 theme-input"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label={<span className="theme-object-primary">Gender</span>}
            initialValue="male"
            rules={[{ required: true, message: "Select your gender" }]}
            className="flex-1"
          >
            <div className="flex rounded-full border border-[var(--border)] overflow-hidden w-full h-12">
              <div
                onClick={() => {
                  setGender("male");
                  form.setFieldsValue({ gender: "male" });
                }}
                className={clsx(
                  "w-1/2 text-center flex items-center justify-center cursor-pointer transition-all",
                  gender === "male"
                    ? "bg-[var(--background-tertiary)] text-[var(--object-primary)]"
                    : "bg-[var(--background-secondary)] text-[var(--object-tertiary)]"
                )}
              >
                Male
              </div>
              <div
                onClick={() => {
                  setGender("female");
                  form.setFieldsValue({ gender: "female" });
                }}
                className={clsx(
                  "w-1/2 text-center flex items-center justify-center cursor-pointer transition-all",
                  gender === "female"
                    ? "bg-[var(--background-tertiary)] text-[var(--object-primary)]"
                    : "bg-[var(--background-secondary)] text-[var(--object-tertiary)]"
                )}
              >
                Female
              </div>
            </div>
          </Form.Item>
        </div>

        <Form.Item className="mt-4">
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
    </div>
  );
};

export default RegisterForm;