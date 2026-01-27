import { Zone } from "@/types/canvas";

export const PRESCRIPTION_ZONES: Zone[] = [
  {
    label: 'patient info',
    x: 0.03,
    y: 0.14,
    width: 0.46,
    height: 0.20,
    color: 'rgba(59, 130, 246, 0.1)',
  },
  {
    label: 'vitals',
    x: 0.51,
    y: 0.14,
    width: 0.46,
    height: 0.20,
    color: 'rgba(34, 197, 94, 0.1)',
  },
  {
    label: 'medical history',
    x: 0.03,
    y: 0.35,
    width: 0.46,
    height: 0.30,
    color: 'rgba(59, 130, 246, 0.1)',
  },
  {
    label: 'lab reports',
    x: 0.03,
    y: 0.65,
    width: 0.46,
    height: 0.30,
    color: 'rgba(168, 85, 247, 0.1)',
  },
  {
    label: 'chief complaint',
    x: 0.51,
    y: 0.35,
    width: 0.46,
    height: 0.17,
    color: 'rgba(249, 115, 22, 0.1)',
  },
  {
    label: 'rx',
    x: 0.51,
    y: 0.53,
    width: 0.46,
    height: 0.36,
    color: 'rgba(239, 68, 68, 0.1)',
  },
  {
    label: 'sign',
    x: 0.51,
    y: 0.90,
    width: 0.46,
    height: 0.05,
    color: 'rgba(107, 114, 128, 0.1)',
  }
];
