import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center text-violet-950">
        Authentication
      </h1>
      <AuthForm />
    </div>
  );
}
