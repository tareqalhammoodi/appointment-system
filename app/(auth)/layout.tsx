import Header from '@/components/ui/auth/Header';
import Image from '@/components/ui/auth/Image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen theme-bg">
      {/* Left Side */}
      <div className="flex flex-col w-full lg:w-2/3 px-15 py-15">
        {/* Header at the top of the page */}
        <Header />
        <main className="flex flex-col flex-grow justify-center">
          {children}
        </main>
      </div>
      {/* Right Side */}
      <Image />
    </div>
  );
} 