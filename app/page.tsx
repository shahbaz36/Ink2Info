'use client'

import { User } from '@/types/index'
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Role = User['role'];

export default function Home() {
  const router = useRouter();

  const isLoggedIn = true;
  const loggedUser: Role = 'Doctor';

  useEffect(() => {
    if (isLoggedIn) {
      if (loggedUser === 'Chemist') {
        router.push('/chemist');
      } else if (loggedUser === 'Doctor') {
        router.push('/doctor');
      } else if (loggedUser === 'Emergency') {
        router.push('/emergency');
      }
    }
  }, [isLoggedIn, loggedUser, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {!isLoggedIn ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Ink2Info</h1>
          <p className="mb-6">Select a portal to continue:</p>
        </div>
      ) : null}
    </div>
  );
}
