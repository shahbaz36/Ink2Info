import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav>Ink2Info</nav>
      </header>
      <div className="flex-1">
        {children}
      </div>
      <footer className="bg-gray-100 p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Ink2Info
      </footer>
    </main>
  );
}
