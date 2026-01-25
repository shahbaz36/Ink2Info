export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'chemist' | 'doctor';
}

export interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  date: string;
  status: 'active' | 'completed';
}
