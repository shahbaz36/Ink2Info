'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Role } from '@/types/index'
import { ROLE_CONFIG } from '@/lib/constants/user';

export default function Navbar() {
    const pathname = usePathname();

    let loggedUser: Role = 'Doctor';
    if (pathname.includes('/chemist')) loggedUser = 'Chemist';
    else if (pathname.includes('/emergency')) loggedUser = 'Emergency';

    const config = ROLE_CONFIG[loggedUser];

    return (
        <nav className={`w-full ${loggedUser === 'Emergency' ? 'bg-danger' : 'bg-surface-700'}  border-b border-stroke-muted sticky top-0 z-50`}>
            <div className={`${loggedUser === 'Doctor' ? 'max-w-full' : 'max-w-6xl'} mx-auto px-4 py-3 flex items-center justify-between`}>
                {loggedUser === 'Emergency' ? <EmergencyNav /> : <>
                    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center`}>
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground-900">Ink2Info</h1>
                            <p className="text-xs text-foreground-600">{config.title}</p>
                        </div>
                    </Link>
                    <UserNav role={loggedUser} />
                </>}

            </div>
        </nav >
    )
}

function UserNav({ role }: { role: Role }) {
    const userData = {
        Doctor: { name: 'Dr. Anita Sharma', subtitle: 'General Physician', initials: 'AS', color: 'bg-indigo-100', textColor: 'text-indigo-600' },
        Chemist: { name: 'Pharmacy Central', subtitle: 'Licensed Chemist', initials: 'PC', color: 'bg-emerald-100', textColor: 'text-emerald-600' },
        Emergency: { name: 'Emergency Unit', subtitle: 'First Responder', initials: 'EU', color: 'bg-red-100', textColor: 'text-red-600' },
    }[role];

    return (
        <div className="flex items-center gap-4">
            <div id="syncStatus" className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm cursor-pointer hover:bg-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full "></span>
                <span>Synced</span>
            </div>
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-foreground-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-stroke-muted">
                <div className={`w-8 h-8 ${userData.color} rounded-full flex items-center justify-center`}>
                    <span className={`${userData.textColor} font-semibold text-sm`}>{userData.initials}</span>
                </div>
                <div className="hidden sm:block">
                    <p className="text-sm font-medium text-foreground-900">{userData.name}</p>
                    <p className="text-xs text-foreground-600">{userData.subtitle}</p>
                </div>
            </div>
        </div>
    )
}

function EmergencyNav() {
    return (
        <>
            <div className="flex items-center gap-3 ">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center ">
                    <svg className="w-6 h-6 " fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">EMERGENCY ACCESS</h1>
                    <p className="text-xs text-white/50">Life-Saving Information • No Login Required</p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-white">
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-white/45">Access Time</p>
                    <p className="text-sm font-mono font-medium" id="accessTime">--:--:--</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-sm">ABDM Verified</span>
                </div>
            </div>
        </>
    )
}
