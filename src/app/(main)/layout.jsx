"use client";

import Sidebar from "@/components/Sidebar";
import { SocketProvider } from "@/context/SocketContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullPageLoader from "@/components/FullPageLoader";
import AlertModal from "@/components/Alert";

export default function MainLayout({ children }) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user.isLoading && !user.isAuthenticated) {
      router.push("/login");
    }
  }, [user.isLoading, user.isAuthenticated, router]);
  //   if (user.isLoading) {
  //     return <FullPageLoader/>
  //   }
  //   if (!user.isAuthenticated) {
  //     return (<FullPageLoader />);
  //   }
  return (
    <div className="flex bg-green-50">
      <button
        onClick={() => showAlert("This is an alert message!")}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Alert
      </button>
      <Sidebar />
      <SocketProvider>
        {children}
        <AlertModal className="w-40%"/>
      </SocketProvider>
    </div>
  );
}
