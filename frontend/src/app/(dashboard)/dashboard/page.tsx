'use client';

import React, { useState } from "react";
import { Form, Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import DashboardLayout from "@/src/components/templates/DashboardLayout";
import { constructExpenseTable } from "@/src/helpers/dataTransformers";
import { useNotificationAPI } from "@/src/providers/notificationProvider";
import { expenseService } from "@/src/services/expensesService";
import { _openNotification } from "@/src/lib/notify";
import Modal from "@/src/components/atoms/Modal/Modal";
import ExpensesForm from "@/src/components/organisms/AddExpensesForm";

export default function DashBoardPage() {
  const api = useNotificationAPI();
  const [form] = Form.useForm();
  const [isOpen, setOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const { mutateAsync: createExpense } = useMutation({
    mutationFn: expenseService.createExpense,
  });

  const { mutateAsync: updateExpense } = useMutation({
    mutationFn: expenseService.updateExpense,
  });

   const { mutateAsync: deleteExpense } = useMutation({
    mutationFn: expenseService.deleteExpense,
  });


  const { data, refetch } = useQuery({
    queryKey: ['expenses'],
    queryFn: expenseService.getAllExpenses,
  });

  const handleSubmit = async (formData: any) => {
    const isEdit = !!editingRecord;
console.log(formData,editingRecord);

    try {
      if (isEdit) {
       const data = {
  ...formData,
  id: editingRecord?.key,
}
        await updateExpense(data);
        _openNotification(api, 'success', 'Expenses Updated');
      } else {
        await createExpense(formData);
        _openNotification(api, 'success', 'Expenses Added');
      }

      form.resetFields();
      setOpen(false);
      setEditingRecord(null);
      refetch();
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
    setEditingRecord(record);
    form.setFieldsValue(record); 
    setOpen(true);
  };


  const { columns, dataSource } = constructExpenseTable(data?.data?.expenses || []);

  columns.push({
    title: "Actions",
    key: "actions",
    render: (_text, record) => (
      <Space>
        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}>
          Edit
        </Button>
        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => deleteExpense(record?.key)}>
          Delete
        </Button>
      </Space>
    ),
  });

  return (
    <>
      <DashboardLayout
        onSubmit={handleSubmit}
        columns={columns as ColumnsType<Record<string, any>>}
        dataSource={dataSource}
      />

      <Modal
        title={editingRecord ? "Edit Expense" : "Add Expense"}
        visible={isOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
          setEditingRecord(null);
        }}
      >
        <ExpensesForm
          onSubmit={handleSubmit}
          initialValues={editingRecord}
        />
      </Modal>
    </>
  );
}
