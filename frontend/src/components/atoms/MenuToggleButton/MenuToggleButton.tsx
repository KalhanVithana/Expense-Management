'use client';

import React from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface Props {
  collapsed: boolean;
  toggle: () => void;
}

const MenuToggleButton: React.FC<Props> = ({ collapsed, toggle }) => (
  <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={toggle}
    style={{
      fontSize: '16px',
      width: 64,
      height: 64,
    }}
  />
);

export default MenuToggleButton;
