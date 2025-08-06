'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import { Button, Card, Typography, Space, message } from 'antd';
import { logout } from '@/services/authService';
import { checkUserExists } from '@/services/authService';
import PersonIcon from '@/components/icons/person';
import PhoneIcon from '@/components/icons/phone';
import MailIcon from '@/components/icons/mail';
import LocationIcon from '@/components/icons/location';
import ExitIcon from '@/components/icons/exit';

const { Title, Text } = Typography;

export default function MainPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          setUserLoading(true);
          const userCheck = await checkUserExists(user.phoneNumber || '');
          if (userCheck.exists) {
            setUserData(userCheck.userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setUserLoading(false);
        }
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      message.error('Failed to logout');
    }
  };

  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-18 w-18 border-b-1 theme-object-primary mx-auto"></div>
          <p className="mt-4 text-lg theme-object-primary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Title level={2} className="!mb-0">
            Welcome to Appointment System
          </Title>
          <Button 
            type="primary" 
            danger 
            icon={<ExitIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* User Information */}
        <Card title="User Information" className="mb-6">
          <Space direction="vertical" size="large" className="w-full">
            <div className="flex items-center space-x-2">
              <PersonIcon className="text-gray-500" />
              <Text strong>Name:</Text>
              <Text>
                {userData ? `${userData.firstName} ${userData.lastName}` : 'Not provided'}
              </Text>
            </div>
            
            <div className="flex items-center space-x-2">
              <PhoneIcon className="text-gray-500" />
              <Text strong>Phone:</Text>
              <Text>{user?.phoneNumber || 'Not available'}</Text>
            </div>

            {userData?.email && (
              <div className="flex items-center space-x-2">
                <MailIcon className="text-gray-500" />
                <Text strong>Email:</Text>
                <Text>{userData.email}</Text>
              </div>
            )}

            {userData?.address && (
              <div className="flex items-center space-x-2">
                <LocationIcon className="text-gray-500" />
                <Text strong>Address:</Text>
                <Text>{userData.address}</Text>
              </div>
            )}

            {userData?.gender && (
              <div className="flex items-center space-x-2">
                <Text strong>Gender:</Text>
                <Text className="capitalize">{userData.gender}</Text>
              </div>
            )}
          </Space>
        </Card>
      </div>
    </div>
  );
}