"use client";

import React, { useState } from "react";
import { Form, Button, Space, Statistic } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import DashboardLayout from "@/src/components/templates/DashboardLayout";
import { constructExpenseTable } from "@/src/helpers/dataTransformers";
import { useNotificationAPI } from "@/src/providers/notificationProvider";
import {  expenseService } from "@/src/services/expensesService";
import { _openNotification } from "@/src/lib/notify";
import Modal from "@/src/components/atoms/Modal/Modal";
import ExpensesForm from "@/src/components/organisms/AddExpensesForm";
import { useSelector } from "react-redux";
import { useNavigation } from "@/src/hooks/navigation";
import { ROUTES } from "@/src/constants/routesPath";
import { RootState } from "@/src/lib/store";

export default function DashBoardPage() {
  const api = useNotificationAPI();
  const [form] = Form.useForm();
  const [isOpen, setOpen] = useState(false);
  const [editingRecord, setEditingRecord] =
    useState<Record<string, string>>(null);
  const { navigateTo } = useNavigation();
  const userData = useSelector(
    (state: RootState) => state?.user?.userData?.user.id
  );
  const { mutateAsync: createExpense } = useMutation({
    mutationFn: expenseService.createExpense,
  });

  const { mutateAsync: updateExpense } = useMutation({
    mutationFn: expenseService.updateExpense,
  });

  const { mutateAsync: deleteExpense } = useMutation({
    mutationFn: expenseService.deleteExpense,
    onSuccess() {
       _openNotification(api, "success", "Expenses Deleted");
       refetchExpenses()
    },
    onError() {
       _openNotification(api, "error", "Faild Expenses Deleted Please try again");
    },
  });
  const { data, refetch: refetchExpenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => {
      console.log("Fetching expenses...");
      return expenseService.getAllExpenses();
    },
  });
  const { data: limitData, refetch: refreshLimit } = useQuery({
    queryKey: ["limit", userData],
    queryFn: () => {
      console.log("Fetching limit expenses...");
      return expenseService.getMonthlyLimit(userData);
    },
  });

  const selectedTab = (key) => {
    console.log("key", key);

    if (key === "dashboard") refreshLimit();
    if (key === "logout") {
      localStorage.removeItem("accessToken");
      navigateTo(ROUTES.LOGIN);
    } else refetchExpenses();
  };
  const handleSubmit = async (formData: any) => {
    const isEdit = !!editingRecord;
    try {
      if (isEdit) {
        const data = {
          ...formData,
          id: editingRecord?.key,
        };
        await updateExpense(data);
        _openNotification(api, "success", "Expenses Updated");
        refetchExpenses();
      } else {
        await createExpense(formData);
        _openNotification(api, "success", "Expenses Added");
      }
      form.resetFields();
      setOpen(false);
      setEditingRecord(null);
    } catch (error: unknown) {
      let errorMsg = "Failed to save expense. Please try again.";
      if (isAxiosError(error)) {
        errorMsg = error.response?.data?.message || error.message || errorMsg;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      _openNotification(api, "error", errorMsg);
    }
  };

  const onEdit = (record: any) => {
    const updatedRecord = {
      ...record,
      expenseName: record?.name,
    };

    setEditingRecord(updatedRecord);
    form.setFieldsValue(record);
    setOpen(true);
    refetchExpenses();
  };
const { columns, dataSource } = constructExpenseTable(
  data?.data?.expenses || []
);

  columns.push({
    title: "Actions",
    key: "actions",
    render: (_text, record) => (
      <Space>
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        >
          Edit
        </Button>
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteExpense(record?.key)}
        >
          Delete
        </Button>
      </Space>
    ),
  });

  console.log("userId", limitData);

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-[0%] left-[70%] transform -translate-x-1/2 z-10 bg-white p-5 rounded-lg shadow-2xl  w-max">
        <Statistic
          title={limitData?.data?.alert}
          value={limitData?.data?.totalMonthlyExpense || 0}
          precision={1}
          valueStyle={{ color: limitData?.data?.alert ? "#cf1322" : "#3f8600" }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </div>

      <DashboardLayout
        onSubmit={handleSubmit}
        columns={columns as ColumnsType<Record<string, any>>}
        dataSource={dataSource}
        selectedTab={selectedTab}
      />

      <Modal
        visible={isOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
          setEditingRecord(null);
        }}
        
      >
        <ExpensesForm onSubmit={handleSubmit} initialValues={editingRecord} className="!p-0 !m-0" />
      </Modal>
    </div>
  );
}
