import Sidebar from "../app/components/Sidebar";
import Header from "../app/DashBoard/Header";
import HealthScore from "../app/components/HealthScore";
import ClimateCard from "../app/components/Climate Card";
import UserRiskCard from "../app/components/PatientCard";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Header />
        <div className="flex flex-row gap-6 max-w-3xl">
          <div className="flex flex-col gap-4 max-w-screen">
            <HealthScore className="max-w-360"/>
            <div className="flex flex-row gap-4">
            <UserRiskCard/>
            <UserRiskCard/>
            </div>

          </div>
            <ClimateCard />
          </div>
      </div>
      </div>
  );
}