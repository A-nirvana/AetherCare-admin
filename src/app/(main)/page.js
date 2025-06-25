import Sidebar from "@/components/Sidebar";
import Header from "@/components/Dashboard/Header";
import HealthScore from "@/components/Dashboard/HealthScore";
import ClimateCard from "@/components/Dashboard/Climate Card";
import UserRiskCard from "@/components/Dashboard/PatientCard";
import BotpressChat from "@/components/Dashboard/webchat";

export default function Home() {
  return (
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Header />
        <div className="flex flex-row gap-6 max-w-screen">
          <div className="flex flex-col gap-4 max-w-screen">
            <HealthScore className="w-180"/>
            <div className="grid grid-cols-2 gap-4">
            <UserRiskCard className="w-full max-w-[450px] p-6" />
            </div>

          </div>
            <ClimateCard className="max-h-[180px]"/>
          </div>
          <BotpressChat />
      </div>
  );
}