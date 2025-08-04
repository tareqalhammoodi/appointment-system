'use client';

import { useState } from 'react';
import { Dropdown, MenuProps, Space } from 'antd';
import GlobalIcon from '../icons/global';
import DownArrowIcon from '../icons/down-arrow';

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('English');

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: 'English',
      onClick: () => setSelectedLang('English'),
    },
    {
      key: 'tr',
      label: 'Türkçe',
      onClick: () => setSelectedLang('Türkçe'),
    }
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()} className="theme-object-primary">
        <Space className=" px-4 rounded">
          <GlobalIcon />
          {selectedLang}
          <DownArrowIcon />
        </Space>
      </a>
    </Dropdown>
  );
};

export default LanguageSelector;
