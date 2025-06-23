"use client";

import { useSocket } from "@/context/SocketContext";
import { motion, AnimatePresence } from "framer-motion";
import { MdWarningAmber } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const AlertModal = ({ message = "Patient at critical health level!", onClose }) => {
  const socket = useSocket();
  const isOpen = socket.healthScore < 60;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-md rounded-3xl bg-gradient-to-tr from-red-50 to-red-100 shadow-2xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <IoMdClose size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <MdWarningAmber className="text-red-500 text-5xl mb-4 animate-pulse" />
              <h2 className="text-xl font-bold text-red-700 mb-2">Critical Alert</h2>
              <p className="text-sm text-gray-800 mb-6 leading-relaxed">
                {message || "A patient’s vitals indicate a critical condition. Immediate attention required."}
              </p>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md transition"
              >
                Dismiss Alert
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
