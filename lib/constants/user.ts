import { Role } from "@/types/index";

export const ROLE_CONFIG: Record<Role, { color: string; title: string }> = {
    Doctor: { color: 'bg-indigo-600', title: 'Doctor Interface' },
    Chemist: { color: 'bg-emerald-600', title: 'Chemist Interface' },
    Emergency: { color: 'bg-red-600', title: 'Emergency Interface' },
};
