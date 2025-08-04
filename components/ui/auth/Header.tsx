import React from 'react';
import LanguageSelector from '../../elements/LanguageSelector';
import { CalendarOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <CalendarOutlined className="theme-object-secondary" style={{ fontSize: '32px' }} />
      <LanguageSelector />
    </div>
  );
};

export default Header;
