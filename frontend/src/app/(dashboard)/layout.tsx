"use client";

import { ROUTES } from "@/src/constants/routesPath";
import { useNavigation } from "@/src/hooks/navigation";
import { RootState } from "@/src/lib/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navigateTo } = useNavigation();
  const isLoggedIn = useSelector((state:RootState) => state?.user?.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigateTo(ROUTES.LOGIN);
    }
  }, [isLoggedIn, navigateTo]);
  return <div className="w-full h-full">{children}</div>;
}
