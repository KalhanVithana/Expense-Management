'use client'
import LoginForm from "@/src/components/organisms/LoginForm";
import SplitLayout from "@/src/components/templates/SplitLayout";
import { ROUTES } from "@/src/constants/routesPath";
import { setUserData } from "@/src/entities/user/userSlice";
import { useNavigation } from "@/src/hooks/navigation";
import { _openNotification } from "@/src/lib/notify";
import { useNotificationAPI } from "@/src/providers/notificationProvider";
import { User, userService } from "@/src/services/userService";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";

export default function LoginPage() {
   const {navigateTo} = useNavigation()
     const api = useNotificationAPI();
     const{formatMessage} = useIntl()
      const dispatch = useDispatch();
  const { mutateAsync: login } = useMutation({
    mutationFn: userService.login,
  });

    const handleSubmit = async (data: User) => {
      try {
         const _userData = await login(data);
        _openNotification(api,'success', 'Login successfully');
         dispatch(setUserData(_userData))
        navigateTo(ROUTES.DASHBOARD)
      } catch (error: unknown) {
        let errorMsg = 'Login failed';
        if (isAxiosError(error)) {
          errorMsg = error.response?.data?.message || error.message || errorMsg;
        } else if (error instanceof Error) {  errorMsg = error.message;
        }
        _openNotification(api,'error', errorMsg);
      }
    }
  return (
    <>
    <SplitLayout
      leftContent={<h1 className="text-white    text-3xl   !font-extralight"> {formatMessage({ id: 'app.welcome' })} </h1>}
      rightContent={<LoginForm onSubmit={handleSubmit} />}
    />
    </>
  );
}
