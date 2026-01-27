export type ZoneLabel = "patient info" | "lab reports" | "medical history" | "chief complaint" | "vitals" | "rx" | "sign";

export interface Point {
  x: number;
  y: number;
  time: number;
}

export interface Stroke {
  points: Point[];
  timestamp: number;
  penColor?: string;
  zoneLabel?: ZoneLabel;
}

export interface Zone {
  label: ZoneLabel;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface VectorizedPrescription {
  id: string;
  timestamp: number;
  strokes: Stroke[];
}
