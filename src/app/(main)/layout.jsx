"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/context/SocketContext";
import { useUser } from "@/context/UserContext";
import FullPageLoader from "@/components/FullPageLoader";
import AlertModal from "@/components/Alert";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({ children }) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user.isLoading && !user.isAuthenticated) {
      router.push("/login");
    }
  }, [user.isLoading, user.isAuthenticated, router]);
  if (user.isLoading) {
    return <FullPageLoader />;
  }
  if (!user.isAuthenticated) {
    return <FullPageLoader />;
  }
  return (
    <div className="flex bg-green-50">
      <Sidebar />
      <SocketProvider>
        {children}
        <AlertModal className="w-40%" />
        <Toaster />
      </SocketProvider>
    </div>
  );
}
