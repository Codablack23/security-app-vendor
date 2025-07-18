import Image from "next/image";
import DashboardLayout from "../DashboardLayout";

export default function Home() {
  return (
   <DashboardLayout activePage="settings">
     <section>
      <p className="text-lg text-[rgba(16,24,40,1)] font-semibold">Settings</p>
     </section>
   </DashboardLayout>
  );
}
