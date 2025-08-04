import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { register } from "@/services/authService";import { RegisterFormSchema } from '@/lib/rules';
import clsx from "clsx";
import PersonIcon from '@/components/icons/person';
import LocationIcon from '@/components/icons/location';
import MailIcon from '@/components/icons/mail';
import CalendarIcon from '@/components/icons/calendar';

const RegisterForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // validation
      RegisterFormSchema.parse({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmpassword,
      });
      // backend call
      await register(values);
    } catch (err: any) {
      if (err.errors) {
        form.setFields(
          err.errors.map((zodErr: any) => ({
            name: zodErr.path[0] === 'confirmPassword' ? 'confirmpassword' : zodErr.path[0],
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