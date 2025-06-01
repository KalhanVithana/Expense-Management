import {
  BarChartOutlined,
  DollarOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';


export const MENU_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: BarChartOutlined,
    path: '/dashboard',
  },
  {
    key: 'expenses',
    label: 'Expenses',
    icon: DollarOutlined,
    path: '/expenses',
  },
  {
    key: 'add-expense',
    label: 'Add Expense',
    icon: PlusOutlined,
    path: '/expenses/add',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: SettingOutlined,
    path: '/settings',
  },
];
