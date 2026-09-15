import ResetPasswordForm from '../components/ResetPasswordForm';
import LoginIllustration from '../components/LoginIllustration';

export default function ResetPasswordPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ backgroundImage: "url('/src/assets/login.png')" }}
    >
      <div className="w-full max-w-[900px] mb-2 px-2">
        <span className="text-white/80 text-[14px]">MainContainer</span>
      </div>
      <div className="flex w-full max-w-[900px] h-[550px] bg-white/30 backdrop-blur-[12px] border border-white/40 rounded-[2.5rem] shadow-lg p-2">
        <ResetPasswordForm />
        <LoginIllustration />
      </div>
    </div>
  );
}
