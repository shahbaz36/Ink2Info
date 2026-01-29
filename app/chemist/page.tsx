"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Medicine = {
  id: number;
  name: string;
  form: string;
  color: string;
  dosage: string;
  duration: string;
  qty: number;
  price: number;
};

const MOCK_MEDICINES: Medicine[] = [
  { id: 1, name: 'Metformin 500mg', form: 'Tablet', color: 'blue', dosage: 'Twice daily with meals', duration: '30 days', qty: 60, price: 120.00 },
  { id: 2, name: 'Amlodipine 5mg', form: 'Tablet', color: 'blue', dosage: 'Once daily in morning', duration: '30 days', qty: 30, price: 85.00 },
  { id: 3, name: 'Aspirin 75mg', form: 'Tablet', color: 'blue', dosage: 'Once daily after dinner', duration: '30 days', qty: 30, price: 45.00 },
  { id: 4, name: 'Atorvastatin 20mg', form: 'Tablet', color: 'blue', dosage: 'Once daily at bedtime', duration: '30 days', qty: 30, price: 150.00 },
  { id: 5, name: 'Pantoprazole 40mg', form: 'Capsule', color: 'amber', dosage: 'Once daily before breakfast', duration: '15 days', qty: 15, price: 95.00 }
];

// --- Helpers ---

const getFormBadgeColor = (form: string) => {
  const colors: Record<string, string> = {
    'Tablet': 'bg-blue-100 text-blue-600',
    'Capsule': 'bg-amber-100 text-amber-600',
    'Syrup': 'bg-purple-100 text-purple-600',
    'Injection': 'bg-red-100 text-red-600'
  };
  return colors[form] || 'bg-slate-100 text-slate-600';
};

// --- Sub-Components ---

function ScanSection({ loading, onScan }: { loading: boolean; onScan: () => void }) {
  return (
    <motion.section
      key="scan"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <div className="bg-white rounded-xl border border-emerald-200 p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Scan Prescription QR</h2>
          <p className="text-slate-500 mb-8">Place the prescription QR code in front of the camera or enter the prescription ID manually.</p>

          <div className="w-full max-w-md space-y-4">
            <button
              onClick={onScan}
              disabled={loading}
              className="w-full px-6 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              )}
              {loading ? 'Processing...' : 'Scan QR Code'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or manually enter ID</span>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Prescription ID (e.g. RX-2025-0789)"
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                Lookup
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function PatientHeader() {
  return (
    <section className="bg-white rounded-xl border border-emerald-200 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-300">
            <span className="text-xl font-bold text-emerald-600">RK</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Rajesh Kumar</h2>
            <p className="text-sm text-slate-500 font-mono">ABHA: 91-1234-5678-9012</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Verified
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">Male, 45y</span>
        </div>
      </div>
    </section>
  );
}

function AlertBanners() {
  return (
    <>
      {/* Restricted Access Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-amber-800">Restricted Access Mode</p>
          <p className="text-xs text-amber-600">You can only view medicine details. Diagnosis, tests, and patient history are not accessible.</p>
        </div>
      </div>

      {/* Allergy Warning */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-red-800">Patient Allergies</p>
          <p className="text-sm text-red-600"><strong>Penicillin</strong> (Severe), <strong>Sulfa Drugs</strong> (Moderate)</p>
        </div>
      </div>
    </>
  );
}

function PrescriptionList({
  medicines,
  dispensedSet,
  onToggleDispense
}: {
  medicines: Medicine[];
  dispensedSet: Set<number>;
  onToggleDispense: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden">
      {/* Prescription Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 text-lg">Prescription</h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">#RX-2025-0789</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Issued: 26 Jan 2025 at 11:45 AM</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-400">Prescribed by</p>
            <p className="text-sm font-semibold text-slate-700">Dr. Anita Sharma</p>
            <p className="text-xs text-slate-500">Reg. No: MCI-12345</p>
          </div>
        </div>
      </div>

      {/* Validity Bar */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">Valid until: <strong className="text-slate-800">26 Feb 2025</strong></span>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
        </div>
        <div className="text-sm">
          <span className="text-emerald-600 font-semibold">{dispensedSet.size}</span>
          <span className="text-slate-500"> of {medicines.length} medicines dispensed</span>
        </div>
      </div>

      {/* Medicines List */}
      <div className="divide-y divide-slate-100">
        {medicines.map((med) => (
          <div
            key={med.id}
            onClick={() => onToggleDispense(med.id)}
            className={`p-4 flex items-center gap-4 hover:bg-slate-50 transition-all cursor-pointer ${dispensedSet.has(med.id) ? 'bg-gradient-to-r from-green-50 to-emerald-50' : ''}`}
          >
            <button className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${dispensedSet.has(med.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-400'}`}>
              {dispensedSet.has(med.id) && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-slate-800">{med.name}</h4>
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${getFormBadgeColor(med.form)}`}>{med.form}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{med.dosage}</p>
              <p className="text-xs text-slate-400">Duration: {med.duration}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-slate-800">Qty: {med.qty}</p>
              <p className="text-sm text-emerald-600 font-medium">₹{med.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingSummary({ totals, count }: { totals: { subtotal: number; gst: number; discount: number; total: number }; count: number }) {
  return (
    <div className="bg-white rounded-xl border border-emerald-200 p-5">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Billing Summary
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Items Selected</span>
          <span>{count}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>₹{totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>GST (12%)</span>
          <span>₹{totals.gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Discount</span>
          <span className="text-green-600">-₹{totals.discount.toFixed(2)}</span>
        </div>
        <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-emerald-600">₹{totals.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function ActionButtons({
  onComplete,
  onScanNew,
  canComplete
}: {
  onComplete: () => void;
  onScanNew: () => void;
  canComplete: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-emerald-200 p-4">
      <h3 className="font-semibold text-slate-800 mb-3">Actions</h3>
      <div className="space-y-2">
        <button
          onClick={onComplete}
          disabled={!canComplete}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Complete Dispensing
        </button>
        <button className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Bill
        </button>
        <button
          onClick={onScanNew}
          className="w-full py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          Scan New Prescription
        </button>
      </div>
    </div>
  );
}

function PastPrescriptions() {
  return (
    <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">Past Prescriptions</h3>
        <p className="text-xs text-slate-500">For this patient</p>
      </div>
      <div className="divide-y divide-slate-100">
        <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-800">RX-2025-0654</p>
            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded">Dispensed</span>
          </div>
          <p className="text-xs text-slate-500">10 Jan 2025 • 4 items</p>
        </div>
        <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-800">RX-2024-0521</p>
            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded">Dispensed</span>
          </div>
          <p className="text-xs text-slate-500">28 Dec 2024 • 3 items</p>
        </div>
        <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-800">RX-2024-0498</p>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">Expired</span>
          </div>
          <p className="text-xs text-slate-500">15 Dec 2024 • 2 items</p>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---

export default function ChemistPage() {
  const [view, setView] = useState<'scan' | 'details'>('scan');
  const [dispensedSet, setDispensedSet] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  // Calculate totals
  let subtotal = 0;
  dispensedSet.forEach(id => {
    const med = MOCK_MEDICINES.find(m => m.id === id);
    if (med) subtotal += med.price;
  });

  const gst = subtotal * 0.12;
  const discount = subtotal > 400 ? subtotal * 0.05 : 0;
  const total = subtotal + gst - discount;

  const totals = { subtotal, gst, discount, total };

  const handleScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('details');
      setDispensedSet(new Set());
    }, 1000);
  };

  const toggleDispense = (id: number) => {
    const newSet = new Set(dispensedSet);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setDispensedSet(newSet);
  };

  const handleComplete = () => {
    if (dispensedSet.size === MOCK_MEDICINES.length) {
      alert(`✅ Prescription dispensed successfully!\n\nReceipt #: RCP-2025-01-26-4521\nPatient: Rajesh Kumar\nTotal: ₹${totals.total.toFixed(2)}`);
      setView('scan');
      setDispensedSet(new Set());
    }
  };

  const handleScanNew = () => {
    setView('scan');
    setDispensedSet(new Set());
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {view === 'scan' ? (
          <ScanSection key="scan" loading={loading} onScan={handleScan} />
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <PatientHeader />
            <AlertBanners />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <PrescriptionList
                  medicines={MOCK_MEDICINES}
                  dispensedSet={dispensedSet}
                  onToggleDispense={toggleDispense}
                />
              </div>

              <div className="space-y-4">
                <BillingSummary totals={totals} count={dispensedSet.size} />
                <ActionButtons
                  onComplete={handleComplete}
                  onScanNew={handleScanNew}
                  canComplete={dispensedSet.size === MOCK_MEDICINES.length}
                />
                <PastPrescriptions />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}