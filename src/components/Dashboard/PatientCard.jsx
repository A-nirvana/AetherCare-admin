'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import { BsThermometerHalf } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { PiPulseBold } from 'react-icons/pi';
import { TbWaveSawTool } from 'react-icons/tb';

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
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        onClick={() => setExpanded(true)}
        initial={false}
        animate={{
          scale: expanded ? 1 : 1,
          top: expanded ? '50%' : 'auto',
          left: expanded ? '50%' : 'auto',
          x: expanded ? '-50%' : 0,
          y: expanded ? '-50%' : 0,
          position: expanded ? 'fixed' : 'relative',
          width: expanded ? '90%' : '400px',
          maxWidth: expanded ? '900px' : '400px',
          zIndex: expanded ? 50 : 10,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl px-6 py-5 font-inter text-gray-900 cursor-pointer overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3 gap-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-rose-800">
              {user.name}
            </h2>
            <p className="text-xs text-gray-700 font-medium">
              {user.bloodGroup} • {user.gender}, {user.age} yrs
            </p>
          </div>
          <span className="bg-gradient-to-tr from-rose-500 to-pink-400 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-md uppercase">
            HIGH RISK
          </span>
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          <VitalItem icon={<FaHeartbeat />} label="BPM" value={user.vitals.bpm} color="text-red-500" />
          <VitalItem icon={<PiPulseBold />} label="SpO₂" value={`${user.vitals.spo2}%`} color="text-green-500" />
          <VitalItem icon={<TbWaveSawTool />} label="RR" value={`${user.vitals.respiratoryRate}/min`} color="text-blue-500" />
          <VitalItem icon={<GiBodyHeight />} label="BMI" value={user.vitals.bmi} color="text-violet-600" />
          <VitalItem icon={<BsThermometerHalf />} label="Temp" value={`${user.vitals.temperature}°C`} color="text-orange-500" />
        </div>

        {/* Expanded Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <MdLocationOn className="text-xl text-rose-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Current Location</h4>
                  <p className="text-gray-700 text-sm mb-3">{user.location}</p>
                  <div className="w-full h-56 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-sm">
                    Map View Placeholder
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function VitalItem({ icon, label, value, color }) {
  return (
    <div className="flex flex-col gap-1 bg-white/60 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 text-sm min-w-0">
      <div className={`flex items-center gap-2 ${color} text-base`}>
        {icon}
        <span className="text-gray-700 font-medium truncate">{label}</span>
      </div>
      <div className="text-lg font-semibold text-gray-800">{value}</div>
    </div>
  );
}
