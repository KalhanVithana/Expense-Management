'use client'
import LoginForm from "@/src/components/organisms/LoginForm";
import SplitLayout from "@/src/components/templates/SplitLayout";

export default function LoginPage() {
  return (
    <>
    <SplitLayout
      leftContent={<h2 className="text-white text-4xl">Welcome to Signup</h2>}
      rightContent={<LoginForm onSubmit={(data) => console.log('Form data:', data)} />}
    />
    </>
  );
}
