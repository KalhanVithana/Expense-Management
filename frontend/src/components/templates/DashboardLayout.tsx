"use client";

import React, { useEffect, useState } from "react";
import { Button, Layout, theme } from "antd";
import SidebarMenu from "../molecules/SidebarMenu";
import MenuToggleButton from "../atoms/MenuToggleButton/MenuToggleButton";
import {
  BarChartOutlined,
  DollarOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import ExpensesForm from "@/src/components/organisms/AddExpensesForm";
import DynamicTable from "../molecules/Table/Table";
import { ColumnsType } from "antd/es/table";
import Card from "../atoms/Card";
import PieChart from "../atoms/PieChart/PieChart";
import { getCategoryData } from "@/src/helpers/chartHelper";

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  onSubmit?: (data: Record<string, string>) => void;
  dataSource?: Record<string, any>[];
  columns?: ColumnsType<Record<string, any>>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  onSubmit,
  dataSource = [],
  columns = [],
}) => {
  const { formatMessage: t } = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("dashboard");
  const [isMobile, setIsMobile] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
        setIsMobile(true);
      } else {
        setCollapsed(false);
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "dashboard",
      label: t({ id: "menu.dashboard" }),
      icon: <BarChartOutlined />,
      path: "/dashboard",
      ariaLabel: t({ id: "aria.dashboard" }),
    },
    {
      key: "expenses",
      label: t({ id: "menu.expenses" }),
      icon: <DollarOutlined />,
      path: "/expenses",
      ariaLabel: t({ id: "aria.expenses" }),
    },
    {
      key: "add-expense",
      label: t({ id: "menu.addExpense" }),
      icon: <PlusOutlined />,
      path: "/expenses/add",
      ariaLabel: t({ id: "aria.addExpense" }),
    },
    {
      key: "logout",
      label: t({ id: "app.logout" }),
      icon: <SettingOutlined />,
      path: "/logout",
      ariaLabel: t({ id: "app.logouts" }),
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        const pieData = getCategoryData(dataSource);
        return <PieChart data={pieData} />;

      case "expenses":
        if (isMobile) {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dataSource.map((row, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {columns.map((col) => (
                      <div
                        key={String(col.key)}
                        className="flex justify-between text-sm"
                      >
                        <span className="font-medium text-gray-600">
                          {col?.title}
                        </span>
                        <span className="text-gray-900">
                          {row[col?.dataIndex as string]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-between">
                    <Button
                      onClick={() => console.log("Edit clicked for", row)}
                      className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
                    >
                      <FormattedMessage id="buttons.updateExpense" />
                    </Button>
                    <Button
                      onClick={() => console.log("Delete clicked for", row)}
                      className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
                    >
                      <FormattedMessage id="buttons.deleteExpense" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          );
        } else {
          return <DynamicTable columns={columns} dataSource={dataSource} />;
        }

      case "add-expense":
        return <ExpensesForm onSubmit={onSubmit} />;

      case "logout":
        return <div>{t({ id: "app.logout" }) || "Log out"}</div>;

      default:
        return (
          <div>{t({ id: "content.default" }) || "Select a menu item"}</div>
        );
    }
  };

  return (
    <Layout className="w-full min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onBreakpoint={(broken) => setCollapsed(broken)}
        className="min-h-screen md:min-h-full"
      >
        <SidebarMenu
          items={menuItems}
          onItemClick={(key) => setSelectedKey(key)}
          selectedKey={[selectedKey]}
        />
      </Sider>
      <Layout>
        <Header className="p-0" style={{ background: colorBgContainer }}>
          <MenuToggleButton
            collapsed={collapsed}
            toggle={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content
          className="my-6 mx-4 lg:p-6 md:p-6 sm:p-6  p-0 rounded-lg "
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "100vh",
          }}
        >
          <Card className=" !bg-slate-100">{renderContent()}</Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
