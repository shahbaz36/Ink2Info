"use client";

import { Point, Stroke, ZoneLabel } from "@/types/canvas";
import { useRef, ComponentRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { identifyZone } from "@/lib/utils/geometry";
import { PRESCRIPTION_ZONES } from "@/lib/constants/zone";

type SignatureCanvasRef = ComponentRef<typeof SignatureCanvas>;

export default function Canvas() {
  const canvasRef = useRef<SignatureCanvasRef>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [lastZone, setLastZone] = useState<ZoneLabel | undefined>();

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current.getCanvas();
        const rect = canvas.getBoundingClientRect();
        setCanvasSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleStrokeEnd = () => {
    const canvasComponent = canvasRef.current;
    if (!canvasComponent) return;

    const allData = canvasComponent.toData();
    if (allData.length === 0) return;

    const lastStrokeRaw: any[] = allData[allData.length - 1];
    const lastStrokePoints: Point[] = lastStrokeRaw.map((p) => ({
      x: p.x,
      y: p.y,
      time: p.time,
    }));

    // Simplify stroke to reduce data size
    // const lastStrokePoints = simplifyStroke(lastStrokePoints, 0.5);

    const { width, height } = canvasSize;

    const zoneLabel = identifyZone(lastStrokePoints, width, height);
    setLastZone(zoneLabel);

    const currStroke: Stroke = {
      timestamp: Date.now(),
      points: lastStrokePoints,
      zoneLabel,
    };

    setStrokes((prev) => [...prev, currStroke]);
    console.log("Stroke captured in zone:", zoneLabel, currStroke);
  };

  const clearCanvas = () => {
    canvasRef.current?.clear();
    setStrokes([]);
  };

  const savePrescription = async () => {
    const prescriptionData = {
      timestamp: Date.now(),
      strokes,
    };

    try {
      const response = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prescriptionData),
      });

      if (response.ok) {
        alert("Prescription saved successfully!");
        clearCanvas();
      } else {
        alert("Failed to save prescription.");
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Error saving prescription.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto p-4">
      <div className="relative border-2 border-gray-400 rounded-lg shadow-xl bg-white overflow-hidden w-full aspect-[1/1.414]">
        {/* Prescription Template Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img 
            src="/assets/Prescription.png" 
            alt="Template" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Zone Highlights (Optional: for debugging or guidance) */}
        <div className="absolute inset-0 pointer-events-none">
          {PRESCRIPTION_ZONES.map((zone) => (
            <div
              key={zone.label}
              style={{
                position: "absolute",
                left: `${zone.x * 100}%`,
                top: `${zone.y * 100}%`,
                width: `${zone.width * 100}%`,
                height: `${zone.height * 100}%`,
                backgroundColor: zone.color,
                border: "1px dashed rgba(0,0,0,0.1)",
              }}
            >
              <span className="text-[8px] font-bold text-gray-500 uppercase p-1">
                {zone.label}
              </span>
            </div>
          ))}
        </div>

        <SignatureCanvas
          ref={canvasRef}
          onEnd={handleStrokeEnd}
          penColor="blue"
          throttle={16}
          canvasProps={{
            className: "w-full h-full cursor-crosshair",
          }}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={clearCanvas}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Clear
        </button>
        <button
          onClick={savePrescription}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Prescription
        </button>
      </div>
      
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="text-sm text-gray-600">
          Captured Strokes: <span className="font-bold">{strokes.length}</span>
        </div>
        {lastZone && (
          <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
            Detected Zone: <span className="uppercase">{lastZone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
