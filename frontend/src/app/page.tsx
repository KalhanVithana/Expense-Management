'use client'
import SignUpForm from "@/src/components/organisms/SignupForm";
import SplitLayout from "@/src/components/templates/SplitLayout";
export default function Home() {
  return (
    <>
    <SplitLayout
      leftContent={<h2 className="text-white text-4xl">Welcome to Signup</h2>}
      rightContent={<SignUpForm onSubmit={(data) => console.log('Form data:', data)} />}
    />
    </>
  );
}
