'use client';

import { useState } from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import { BsThermometerHalf } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

export default function UserRiskCard() {
  const [expanded, setExpanded] = useState(false);

  const user = {
    name: 'Ravi Sharma',
    age: 45,
    gender: 'Male',
    bloodGroup: 'B+',
    vitals: {
      bpm: 108,
      spo2: 91,
      respiratoryRate: 24,
      bmi: 28.5,
      temperature: 38.2,
    },
    location: 'Sector 12, Gwalior, MP',
  };

  return (
    <>
      {expanded && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setExpanded(false)}
        ></div>
      )}
      <div
        onClick={() => setExpanded(true)}
        className={`transition-all duration-300 shadow-lg rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 border-l-4 border-rose-400 px-6 py-5 text-sm font-[Inter] ${
          expanded
            ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-3xl scale-100'
            : 'ml-4 mt-6 w-[270px] cursor-pointer'
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-rose-800 tracking-wide">
            {user.name}
          </h2>
          <span className="text-xs font-bold text-white bg-rose-500 px-2 py-1 rounded-full shadow-md">
            HIGH RISK
          </span>
        </div>

        <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-[13px] text-gray-800 mb-2">
          <p><span className="font-medium">Age:</span> {user.age}</p>
          <p><span className="font-medium">Gender:</span> {user.gender}</p>
          <p><span className="font-medium">Blood Group:</span> {user.bloodGroup}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[13px] text-gray-900 mb-2">
          <div className="flex items-center gap-2">
            <FaHeartbeat className="text-rose-500 text-lg" />
            <span>BPM: {user.vitals.bpm}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeartbeat className="text-green-500 text-lg" />
            <span>SpO₂: {user.vitals.spo2}%</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeartbeat className="text-blue-500 text-lg" />
            <span>RR: {user.vitals.respiratoryRate}/min</span>
          </div>
          <div className="flex items-center gap-2">
            <GiBodyHeight className="text-violet-500 text-lg" />
            <span>BMI: {user.vitals.bmi}</span>
          </div>
          <div className="flex items-center gap-2">
            <BsThermometerHalf className="text-orange-500 text-lg" />
            <span>Temp: {user.vitals.temperature}°C</span>
          </div>
        </div>

        {expanded && (
          <div className="mt-5 text-[13px] text-gray-700">
            <div className="flex items-start gap-3">
              <MdLocationOn className="text-xl text-rose-500" />
              <div>
                <p className="font-medium text-gray-800 mb-1">Current Location</p>
                <p className="text-gray-700 mb-2">{user.location}</p>
                <div className="w-full h-52 rounded-md bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500">
                  Location Map Box
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
