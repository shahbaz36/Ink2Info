"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


function QuickLookup({ onScan }: { onScan: () => void }) {
  const [loading, setLoading] = useState(false);
  const [abhaId, setAbhaId] = useState("");

  const handleScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onScan();
    }, 1000);
  };

  const handleManualLookup = () => {
    if (!abhaId.trim()) return; 
    handleScan();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-8 max-w-4xl mx-auto"
    >
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Quick Patient Lookup</h2>
          <p className="text-slate-400">Scan QR or enter ABHA ID for instant access</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <button
            onClick={handleScan}
            disabled={loading}
            className="flex-1 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-3 shadow-[0_0_0_0_rgba(239,68,68,0.4)] animate-[pulseGlow_2s_ease-in-out_infinite] disabled:opacity-70 disabled:cursor-wait"
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            )}
            SCAN PATIENT QR
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={abhaId}
              onChange={(e) => setAbhaId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualLookup()}
              placeholder="Enter ABHA ID"
              className="w-full px-4 py-4 bg-slate-700 border border-slate-600 rounded-xl text-white text-lg text-center font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          onClick={handleManualLookup}
          className="w-full mt-4 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-colors"
        >
          Access Critical Info
        </button>
      </div>
    </motion.section>
  );
}

function CriticalInfo({ onNewSearch }: { onNewSearch: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Patient Identity Banner */}
      <section className="bg-slate-800 rounded-2xl border border-slate-700 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center border-4 border-red-500">
            <span className="text-3xl font-bold text-red-400">RK</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">Rajesh Kumar</h2>
            <p className="text-slate-400">Male • 45 years • DOB: 15 Mar 1980</p>
            <p className="text-slate-500 font-mono text-sm mt-1">ABHA ID: 91-1234-5678-9012</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-right">
              <p className="text-xs text-slate-500">Last Updated</p>
              <p className="text-sm text-slate-300">25 Jan 2025, 10:30 AM</p>
            </div>
            <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm font-medium rounded-full text-center">Record Verified</span>
          </div>
        </div>
      </section>

      {/* Critical Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Blood Type */}
        <div className="bg-gradient-to-br from-red-600/30 to-red-900/30 rounded-xl border-2 border-red-500 p-5 hover:translate-y-[-2px] transition-transform duration-200">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
            </svg>
            <span className="text-red-300 font-semibold">BLOOD TYPE</span>
          </div>
          <p className="text-5xl font-bold text-white">B+</p>
          <p className="text-red-300 text-sm mt-2">Rh Positive</p>
        </div>

        {/* Allergies - Critical */}
        <div className="bg-gradient-to-br from-amber-600/30 to-amber-900/30 rounded-xl border-2 border-amber-500 p-5 hover:translate-y-[-2px] transition-transform duration-200 animate-[pulse_1.5s_ease-in-out_infinite]">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-amber-300 font-semibold">ALLERGIES</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-white">Penicillin</span>
              <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">SEVERE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg text-white">Sulfa Drugs</span>
              <span className="px-2 py-0.5 bg-amber-600 text-white text-xs font-bold rounded">MODERATE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg text-slate-300">Pollen</span>
              <span className="px-2 py-0.5 bg-slate-600 text-white text-xs rounded">MILD</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-br from-blue-600/30 to-blue-900/30 rounded-xl border-2 border-blue-500 p-5 hover:translate-y-[-2px] transition-transform duration-200">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-blue-300 font-semibold">EMERGENCY CONTACTS</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-lg font-bold text-white">Sunita Kumar</p>
              <p className="text-blue-300 text-sm">Wife</p>
              <a href="tel:+919876543210" className="text-blue-400 font-mono text-lg hover:underline">+91 98765 43210</a>
            </div>
            <div className="pt-2 border-t border-blue-500/30">
              <p className="text-white">Amit Kumar</p>
              <p className="text-blue-300 text-sm">Son</p>
              <a href="tel:+919123456789" className="text-blue-400 font-mono hover:underline">+91 91234 56789</a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Current Medications */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <h3 className="text-lg font-bold text-white">Current Medications</h3>
              <span className="ml-auto px-2 py-0.5 bg-green-600/20 text-green-400 text-xs rounded-full">5 Active</span>
            </div>
            <div className="divide-y divide-slate-700">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Metformin 500mg</p>
                  <p className="text-sm text-slate-400">Twice daily with meals</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">Diabetes</span>
                  <p className="text-xs text-slate-500 mt-1">Since: Jan 2020</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Amlodipine 5mg</p>
                  <p className="text-sm text-slate-400">Once daily in morning</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded">Blood Pressure</span>
                  <p className="text-xs text-slate-500 mt-1">Since: Mar 2021</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Aspirin 75mg</p>
                  <p className="text-sm text-slate-400">Once daily after dinner</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded">Cardiac</span>
                  <p className="text-xs text-slate-500 mt-1">Since: Mar 2021</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-bold text-white">Known Medical Conditions</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-red-400 font-semibold mb-2">CRITICAL / LIFE-THREATENING</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-red-600/20 text-red-300 rounded-full text-sm font-medium border border-red-500/50">Coronary Artery Disease</span>
                  <span className="px-3 py-1.5 bg-red-600/20 text-red-300 rounded-full text-sm font-medium border border-red-500/50">History of MI (2021)</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-amber-400 font-semibold mb-2">CHRONIC CONDITIONS</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-amber-600/20 text-amber-300 rounded-full text-sm font-medium">Type 2 Diabetes</span>
                  <span className="px-3 py-1.5 bg-amber-600/20 text-amber-300 rounded-full text-sm font-medium">Hypertension</span>
                  <span className="px-3 py-1.5 bg-amber-600/20 text-amber-300 rounded-full text-sm font-medium">Hyperlipidemia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Vitals & History */}
        <div className="space-y-6">
          {/* Last Recorded Vitals */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="text-lg font-bold text-white">Last Recorded Vitals</h3>
              </div>
              <span className="text-xs text-slate-500">20 Jan 2025</span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-5">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm">Blood Pressure</p>
                <p className="text-2xl font-bold text-white mt-1">138/88</p>
                <p className="text-amber-400 text-xs">Slightly Elevated</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm">Heart Rate</p>
                <p className="text-2xl font-bold text-white mt-1">76 <span className="text-base">bpm</span></p>
                <p className="text-green-400 text-xs">Normal</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm">SpO2</p>
                <p className="text-2xl font-bold text-white mt-1">98%</p>
                <p className="text-green-400 text-xs">Normal</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-slate-400 text-sm">Blood Sugar (F)</p>
                <p className="text-2xl font-bold text-white mt-1">142 <span className="text-base">mg/dL</span></p>
                <p className="text-amber-400 text-xs">Elevated</p>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-lg font-bold text-white">Insurance Information</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">Star Health Insurance</p>
                  <p className="text-sm text-slate-400">Family Floater Plan</p>
                </div>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Policy Number</p>
                  <p className="text-white font-mono">SHI-2024-78456123</p>
                </div>
                <div>
                  <p className="text-slate-500">Valid Until</p>
                  <p className="text-white">31 Mar 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Summary
        </button>
        <button className="flex-1 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share with Hospital
        </button>
        <button
          onClick={onNewSearch}
          className="flex-1 py-3 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          New Patient Lookup
        </button>
      </div>

      <footer className="mt-8 text-center pb-8">
        <p className="text-slate-500 text-sm">Emergency access is logged and audited. For life-saving purposes only.</p>
        <p className="text-slate-600 text-xs mt-1">© 2025 Ink2Info - ABDM Compliant</p>
      </footer>
    </motion.div>
  );
}

// --- Main Page Component ---

export default function EmergencyPage() {
  const [view, setView] = useState<'lookup' | 'critical'>('lookup');

  return (
    <main className="min-h-screen bg-slate-900 text-slate-200">
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {view === 'lookup' ? (
            <QuickLookup key="lookup" onScan={() => setView('critical')} />
          ) : (
            <CriticalInfo key="critical" onNewSearch={() => setView('lookup')} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}