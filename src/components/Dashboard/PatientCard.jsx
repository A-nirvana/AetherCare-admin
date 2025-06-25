"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { BsThermometerHalf } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { PiPulseBold } from "react-icons/pi";
import { TbWaveSawTool } from "react-icons/tb";
import { useSocket } from "@/context/SocketContext";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { getLastObjectByKey } from "@/lib/util";

export default function UserRiskCard() {
  const socket = useSocket();
  const userData = useUser();
  const [healthData, setHealthData] = useState({
    Latitude: 0,
    Longitude: 0,
    Temperature: 0,
    Respiratory_Rate: 0,
    BPM: 0,
    SpO2: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SOCKET_URL}/api/rtdb/all`
        );
        const data = res.data.data.sensorData;
        const latestData = getLastObjectByKey(data);
        setHealthData(latestData);
      } catch (err) {
        console.error("Failed to fetch health data:", err);
        setError("Failed to load health data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Use useMemo to re-calculate stats only when healthData changes
  const stats = useMemo(() => {
    if (!healthData) {
      return [];
    }
    const getBPMStatus = (bpm) => {
      if (bpm >= 60 && bpm <= 100) return "Normal";
      if (bpm < 60) return "Low";
      return "High";
    };

    const getRRStatus = (rr) => {
      if (rr >= 12 && rr <= 20) return "Normal";
      if (rr < 12) return "Low";
      return "High";
    };

    const getSpO2Status = (spo2) => {
      if (spo2 >= 95) return "Good";
      if (spo2 >= 90 && spo2 < 95) return "Warning";
      return "Critical";
    };

    const getTempStatus = (tempCelsius) => {
      const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
      if (tempFahrenheit >= 97.0 && tempFahrenheit <= 99.0) return "Normal";
      if (tempFahrenheit > 99.0) return "Elevated";
      return "Low";
    };

    return [
      {
        label: "BMI",
        value: userData.user.bmi ? userData.user.bmi : "--",
        unit: "",
        status: "Healthy",
      },
      {
        label: "Temperature",
        value: healthData.Temperature
          ? ((healthData.Temperature * 9) / 5 + 32).toFixed(1)
          : "--",
        unit: "°F",
        status: getTempStatus(healthData.Temperature),
      },
      {
        label: "Respiratory Rate",
        value: healthData.Respiratory_Rate ? healthData.Respiratory_Rate : "--",
        unit: "Breaths",
        status: getRRStatus(healthData.Respiratory_Rate),
      },
      {
        label: "BPM",
        value: healthData.BPM,
        unit: "BPM",
        status: getBPMStatus(healthData.BPM),
      },
      {
        label: "SpO2",
        value: healthData.SpO2,
        unit: "%",
        status: getSpO2Status(healthData.SpO2),
      },
    ];
  }, [healthData, userData]);

  useEffect(() => {
    if (!socket || !socket.isConnected) return;
    socket.socket.on("sensorData", (obj) => {
      console.log("Received health data update:", obj);
      setHealthData(obj.data);
    });
    return () => {
      socket.socket.off("healthDataUpdate");
    };
  }, [socket]);

  const user = {
    name: "Ravi Sharma",
    age: 45,
    gender: "Male",
    bloodGroup: "B+",
    vitals: {
      bpm: stats[3],
      spo2: stats[4],
      respiratoryRate: stats[2],
      bmi: 24.9,
      temperature: stats[1],
    },
    location: `${healthData.Latitude}, ${healthData.Longitude}`,
  };

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10">An error occured...</div>;

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
          top: expanded ? "50%" : "auto",
          left: expanded ? "50%" : "auto",
          x: expanded ? "-50%" : 0,
          y: expanded ? "-50%" : 0,
          position: expanded ? "fixed" : "relative",
          width: expanded ? "90%" : "400px",
          maxWidth: expanded ? "900px" : "400px",
          zIndex: expanded ? 50 : 10,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
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
            {socket.health.Score < 30
              ? "Critical Risk"
              : socket.health.Score < 60
              ? "Medium Risk"
              : socket.health.Score < 80
              ? "Low Risk"
              : "Healthy"}
          </span>
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          <VitalItem
            icon={<FaHeartbeat />}
            label="BPM"
            value={user.vitals.bpm.value}
            color="text-red-500"
          />
          <VitalItem
            icon={<PiPulseBold />}
            label="SpO₂"
            value={`${user.vitals.spo2.value}%`}
            color="text-green-500"
          />
          <VitalItem
            icon={<TbWaveSawTool />}
            label="RR"
            value={`${user.vitals.respiratoryRate.value.toFixed(2)}/min`}
            color="text-blue-500"
          />
          <VitalItem
            icon={<GiBodyHeight />}
            label="BMI"
            value={user.vitals.bmi}
            color="text-violet-600"
          />
          <VitalItem
            icon={<BsThermometerHalf />}
            label="Temp"
            value={`${user.vitals.temperature.value}°F`}
            color="text-orange-500"
          />
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
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">
                    Current Location
                  </h4>
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

const VitalItem =({ icon, label, value, color })=> {
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
