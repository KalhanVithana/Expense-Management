'use client';

import { useMutation } from '@tanstack/react-query';
import SignUpForm from '@/src/components/organisms/SignupForm';
import SplitLayout from '@/src/components/templates/SplitLayout';
import { User, userService } from '@/src/services/userService';
import { _openNotification } from '@/src/lib/notify';
import { isAxiosError } from 'axios';
import { useNotificationAPI } from '@/src/providers/notificationProvider';
import { useNavigation } from '@/src/hooks/navigation';
import { ROUTES } from '@/src/constants/routesPath';


export default function SignupPage() {
  const {navigateTo} = useNavigation()
   const api = useNotificationAPI();
const { mutateAsync: signUp } = useMutation({
  mutationFn: userService.signUp,
});
  const handleSubmit = async (data: User) => {
    try {
       await signUp(data);
      _openNotification(api,'success', 'SignUp successfully');
      navigateTo(ROUTES.DASHBOARD)
    } catch (error: unknown) {
      let errorMsg = 'Registration failed';
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
      leftContent={<h2 className="text-white text-4xl">Welcome to Signup</h2>}
      rightContent={<SignUpForm onSubmit={handleSubmit} />}
      
    /></>
  );
}
