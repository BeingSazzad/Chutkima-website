"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App as AntApp } from "antd";

const theme = {
  token: {
    colorPrimary: "#0e7a5f",
    colorInfo: "#0e7a5f",
    colorsuccess: "#108a66",
    borderRadius: 12,
    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
    colorTextBase: "#0f1b17",
  },
  components: {
    Button: { borderRadius: 999, controlHeight: 44, fontWeight: 600 },
    Segmented: { borderRadius: 999 },
    Modal: { borderRadiusLG: 20 },
    Drawer: {},
  },
};

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <AntApp>{children}</AntApp>
      </ConfigProvider>
    </AntdRegistry>
  );
}
