"use client"; 

import { Spin } from "antd";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" tip="Loading..." />
    </div>
  );
}
