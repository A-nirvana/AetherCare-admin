"use client"

import { useSocket } from "@/context/SocketContext";

const AlertModal = ({ message, onClose }) => {
    const socket = useSocket();
    const isOpen = socket.healthScore<60;
  if (!isOpen) {
    return <></>;
  }

  return (
    // Overlay for the modal, covering the entire screen.
    // It has a semi-transparent black background and uses flexbox for centering its content.
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal content container */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto relative transform transition-all sm:my-8 sm:w-full">
        {/* Modal message display */}
        <p className="text-gray-800 text-lg text-center mb-6">Misbahul Karim is dying</p>

        {/* Close button for the modal */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;