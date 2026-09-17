import LoginForm from '../components/LoginForm';
import LoginIllustration from '../components/LoginIllustration';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundImage: "url('/src/assets/login.png')" }}
    >
      <div className="flex w-full max-w-4xl h-[550px] bg-white/20 backdrop-blur-lg border border-white/30 rounded-[2.5rem] shadow-2xl overflow-hidden p-2">
        <LoginForm />
        <LoginIllustration />
      </div>
    </div>
  );
}
