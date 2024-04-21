import LoginForm from "./components/LoginForm";
export default function Login({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen h-full bg-stone-200">
      <div className="flex items-center justify-center min-h-screen w-full">
        <LoginForm />
      </div>
    </div>
  );
}