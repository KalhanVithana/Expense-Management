'use client';

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

type MenuItem = {
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  ariaLabel?: string;
};

type SidebarMenuProps = {
  items: MenuItem[];
  selectedKey?: string[];
  onItemClick?: (key: string) => void;
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  selectedKey = ['dashboard'],
  onItemClick,
}) => {
  const menuItems: MenuProps['items'] = items.map(({ key, icon, label, ariaLabel }) => ({
    key,
    icon,
    label,
    'aria-label': ariaLabel,
  }));

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKey}
      onClick={({ key }) => onItemClick?.(key)}
      items={menuItems}
    />
  );
};

export default SidebarMenu;
