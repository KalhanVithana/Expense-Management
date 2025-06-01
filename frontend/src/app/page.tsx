'use client'

import { useSelector } from "react-redux";
import { useNavigation } from "../hooks/navigation";
import { ROUTES } from "../constants/routesPath";
import { useEffect } from "react";
import { RootState } from "../lib/store";
export default function Home() {
  const {navigateTo} = useNavigation();
  const isLoggedIn = useSelector((state:RootState) => state?.user?.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigateTo(ROUTES.DASHBOARD)
    } else {
      navigateTo(ROUTES.LOGIN);
    }
  }, [isLoggedIn, navigateTo]);

  return null; 
}
