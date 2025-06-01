import React from "react";
import { Modal as AntModal } from "antd";

interface BasicModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  title?: string;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  children?: React.ReactNode;
}

const Modal: React.FC<BasicModalProps> = ({
  visible,
  onCancel,
  onOk,
  title = "",
  okText = "OK",
  cancelText = "Cancel",
  confirmLoading = false,
  children,
}) => {
  return (
    <AntModal
      open={visible}    
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      footer={null}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
