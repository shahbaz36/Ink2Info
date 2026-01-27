'use client'
import { useState } from "react";
import Canvas from "@/components/canvas/Canvas";

// Fake Data
const patients = [
  { id: '1', name: 'Rajesh Kumar', initials: 'RK', age: 45, gender: 'Male', abhaId: '91-1234-5678-9012', bloodGroup: 'B+', allergies: ['Penicillin', 'Sulfa drugs'], conditions: ['Type 2 Diabetes', 'Hypertension'], visitReason: 'Follow-up' },
  { id: '2', name: 'Priya Sharma', initials: 'PS', age: 32, gender: 'Female', abhaId: '91-2345-6789-0123', bloodGroup: 'O+', allergies: ['Aspirin'], conditions: ['Asthma'], visitReason: 'Breathing issues' },
  { id: '3', name: 'Amit Patel', initials: 'AP', age: 58, gender: 'Male', abhaId: '91-3456-7890-1234', bloodGroup: 'A-', allergies: [], conditions: ['Coronary Artery Disease'], visitReason: 'Chest pain' },
  { id: '4', name: 'Sunita Devi', initials: 'SD', age: 67, gender: 'Female', abhaId: '91-4567-8901-2345', bloodGroup: 'AB+', allergies: ['Ibuprofen'], conditions: ['Osteoarthritis'], visitReason: 'Joint pain' },
  { id: '5', name: 'Vikram Singh', initials: 'VS', age: 29, gender: 'Male', abhaId: '91-5678-9012-3456', bloodGroup: 'B-', allergies: [], conditions: [], visitReason: 'Fever & Cold' },
];

const prescriptions = [
  { id: 'RX-2025-0456', patientName: 'Rajesh Kumar', date: '15 Jan 2025', diagnosis: 'Viral Fever', status: 'completed' },
  { id: 'RX-2025-0455', patientName: 'Priya Sharma', date: '12 Jan 2025', diagnosis: 'Acute Bronchitis', status: 'completed' },
  { id: 'RX-2025-0454', patientName: 'Amit Patel', date: '10 Jan 2025', diagnosis: 'Angina', status: 'completed' },
  { id: 'RX-2025-0453', patientName: 'Sunita Devi', date: '08 Jan 2025', diagnosis: 'Osteoarthritis flare', status: 'pending' },
];

const RajeshHistory = [
  { date: '15 Jan 2025', reason: 'Follow-up for diabetes', prescription: 'RX-2025-0456' },
  { date: '01 Jan 2025', reason: 'Blood sugar review', prescription: 'RX-2025-0412' },
  { date: '15 Dec 2024', reason: 'Hypertension check', prescription: 'RX-2024-0398' },
  { date: '01 Dec 2024', reason: 'General checkup', prescription: 'RX-2024-0376' },
  { date: '15 Nov 2024', reason: 'Flu symptoms', prescription: 'RX-2024-0354' },
];





export default function DashboardPage() {
  const [selectedPatientId, setSelectedPatientId] = useState('1');

  function handleSelectPatient(id: string) {
    setSelectedPatientId(id);
  }

  return (
    <div className=" min-h-screen bg-surface-900 w-full">
      <StatusBar />
      <main className="max-w-400 mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <LeftSideBar selectedPatientId={selectedPatientId}
            handleSelectPatient={handleSelectPatient} />
          <section className="col-span-12 lg:col-span-6">
            <PatientHead selectedPatientId={selectedPatientId} />
            <Canvas />
          </section>
          <aside className="col-span-12 lg:col-span-3 space-y-4">
            <VisitHistory />
            <RightSideBarBottom />
          </aside>
        </div>
      </main>
    </div>
  );
}


function StatusBar() {
  return (
    <div className="bg-surface-700 border-b border-stroke-muted">
      <div className="max-w-400 mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-xl p-4 animate-fadeIn delay-1 hover-lift">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">12</p>
                <p className="text-xs text-slate-600">Today&apos;s Patients</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 delay-2 hover-lift">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">28</p>
                <p className="text-xs text-slate-600">Prescriptions This Week</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 animate-fadeIn delay-3 hover-lift">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">3</p>
                <p className="text-xs text-slate-600">Pending Sync</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 animate-fadeIn delay-4 hover-lift">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">94%</p>
                <p className="text-xs text-slate-600">OCR Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeftSideBar({ selectedPatientId, handleSelectPatient }: { selectedPatientId: string; handleSelectPatient: (id: string) => void }) {
  function selectPatient(pid: string) {
    handleSelectPatient(pid);
  }

  return (
    <aside className="col-span-12 lg:col-span-3 space-y-4">
      {/* <!-- Search & Scan --> */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex gap-2 mb-3">
          <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex  justify-center gap-2 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
            Scan ABHA
          </button>
          <button className="px-3 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
        <input type="text" placeholder="Search patients..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></input>
      </div>

      {/* <!-- Patient List --> */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-fadeIn delay-2">
        <div className="px-4 py-3 border-b border-slate-100"><h2 className="font-semibold text-slate-800">Today&apos;s Patients</h2></div>
        <div className="divide-y divide-slate-100 max-h-100 overflow-y-auto" id="patientList">
          {
            patients.map((p) => (
              <button key={p.id} onClick={() => selectPatient(p.id)} className={`w-full p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left ${selectedPatientId === p.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${selectedPatientId === p.id ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                  <span className={`font-semibold text-sm ${selectedPatientId === p.id ? 'text-indigo-600' : 'text-slate-600'}`}>{p.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.age}y, {p.gender} • {p.visitReason}</p>
                </div>
                {p.allergies.length > 0 && <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" title="Has allergies"></span>}
              </button>
            ))
          }
        </div>
      </div>

      {/* <!-- Recent Prescriptions --> */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden ">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Recent Prescriptions</h2>
          <button className="text-xs text-indigo-600 hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-100 max-h-[250px] overflow-y-auto" id="prescriptionList">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-slate-800">{rx.patientName}</p>
                <span className={`px-2 py-0.5 text-xs rounded-full ${rx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{rx.status}</span>
              </div>
              <p className="text-xs text-slate-500">{rx.date} • {rx.diagnosis}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}


function PatientHead({ selectedPatientId }: { selectedPatientId: string }) {
  const patient = patients.find(p => p.id === selectedPatientId);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 animate-fadeIn" id="patientHeader">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-indigo-600" id="patientInitials">{patient?.initials}</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800" id="patientName">{patient?.name}</h2>
            <p className="text-sm text-slate-500" id="patientMeta">{patient?.age} years, {patient?.gender} • {patient?.bloodGroup}</p>
            <p className="text-xs text-slate-400 font-mono" id="patientAbha">ABHA: {patient?.abhaId}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" id="patientTags">
        <div className="flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-full">
          <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span className="text-xs font-medium text-red-700">Allergies: {patient?.allergies}</span>
        </div>
        {patient?.conditions.map((cond) => (
          <span key={cond} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">{cond}</span>
        ))}
      </div>
    </div>
  )
}

function PrescriptionPad() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-fadeIn delay-2">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">Prescription Pad</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Undo">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Clear">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      <div className="p-4 bg-slate-50">
        <div className="bg-white border-2 border-slate-200 rounded-lg p-4 min-h-[450px]">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 mb-3 hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors cursor-text">
            <p className="text-xs font-medium text-slate-400 mb-1">PATIENT INFO</p>
            <div className="h-10 text-slate-400 text-sm">Patient: Rajesh Kumar | Age: 45 | Male</div>
          </div>
          <div className="border-2 border-dashed border-amber-300 rounded-lg p-3 mb-3 hover:border-amber-400 hover:bg-amber-50/30 transition-colors cursor-text">
            <p className="text-xs font-medium text-amber-500 mb-1">DIAGNOSIS</p>
            <div className="h-14 flex items-center justify-center text-amber-400 text-sm">Write diagnosis here...</div>
          </div>
          <div className="border-2 border-dashed border-green-300 rounded-lg p-3 mb-3 hover:border-green-400 hover:bg-green-50/30 transition-colors cursor-text">
            <p className="text-xs font-medium text-green-500 mb-1">MEDICINES (Rx)</p>
            <div className="h-24 flex items-center justify-center text-green-400 text-sm">Write prescriptions here...</div>
          </div>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 mb-3 hover:border-blue-400 hover:bg-blue-50/30 transition-colors cursor-text">
            <p className="text-xs font-medium text-blue-500 mb-1">TESTS</p>
            <div className="h-10 flex items-center justify-center text-blue-400 text-sm">Write tests here...</div>
          </div>
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-3 hover:border-purple-400 hover:bg-purple-50/30 transition-colors cursor-text">
            <p className="text-xs font-medium text-purple-500 mb-1">ADVICE</p>
            <div className="h-10 flex items-center justify-center text-purple-400 text-sm">Write advice here...</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function VisitHistory() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden ">
      <div className="px-4 py-3 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Visit History</h2>
        <p className="text-xs text-slate-500">Rajesh Kumar</p>
      </div>
      <div className="divide-y divide-slate-100 max-h-[200px] overflow-y-auto" id="visitHistory">
        {RajeshHistory.map((visit) => (
          <div key={visit.prescription} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-slate-800">{visit.date}</p>
              <span className="text-xs text-indigo-600 font-mono">{visit.prescription}</span>
            </div>
            <p className="text-xs text-slate-500">{visit.reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RightSideBarBottom() {
  return (
    <>
      {/* <!-- OCR Preview --> */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 animate-fadeIn delay-4" >
        <h2 className="font-semibold text-slate-800 mb-3">OCR Preview</h2>
        <div className="space-y-3">
          <div className="p-2 bg-amber-50 rounded-lg"><p className="text-xs text-amber-600 mb-1">Diagnosis</p><p className="text-sm text-slate-700">Waiting for input...</p></div>
          <div className="p-2 bg-green-50 rounded-lg"><p className="text-xs text-green-600 mb-1">Medicines</p><p className="text-sm text-slate-700">Waiting for input...</p></div>
          <div className="p-2 bg-blue-50 rounded-lg"><p className="text-xs text-blue-600 mb-1">Tests</p><p className="text-sm text-slate-700">Waiting for input...</p></div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
          <span className="text-slate-500">Confidence</span><span className="font-medium text-slate-800">--</span>
        </div>
      </div >

      {/* <!-- Actions --> */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 animate-fadeIn delay-4" >
        <h2 className="font-semibold text-slate-800 mb-3">Actions</h2>
        <div className="space-y-2">
          <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">Save Prescription</button>
          <button className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">Print Copy</button>
          <button className="w-full py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">Sync to ABDM</button>
        </div>
      </div >

      {/* <!-- Quick Templates --> */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 animate-fadeIn delay-4" >
        <h2 className="font-semibold text-slate-800 mb-3">Quick Templates</h2>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200">Fever</button>
          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200">Cold</button>
          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200">Diabetes</button>
          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200">BP Check</button>
          <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200">Gastritis</button>
        </div>
      </div >
    </>
  )
}