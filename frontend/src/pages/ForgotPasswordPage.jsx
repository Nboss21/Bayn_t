import ForgotPasswordForm from '../components/ForgotPasswordForm';
import LoginIllustration from '../components/LoginIllustration';

export default function ForgotPasswordPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 sm:p-8 relative"
      style={{ backgroundImage: "url('/src/assets/login.png')" }}
    >
      <div className="flex w-full max-w-[900px] h-[550px] bg-white/30 backdrop-blur-[12px] border border-white/40 rounded-[2.5rem] shadow-lg p-2">
        <ForgotPasswordForm />
        <LoginIllustration />
      </div>
    </div>
  );
}
