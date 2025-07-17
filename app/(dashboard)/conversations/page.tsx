import Image from "next/image";
import DashboardLayout from "../DashboardLayout";
import { ConversationSidebar } from "../components";

export default function Home() {
  return (
   <DashboardLayout activePage="conversations">
     <section className="flex h-[75vh]">
        <div className="overflow-y-auto w-[400px]">
          <ConversationSidebar/>
        </div>
        <div className="flex-1 flex flex-col">

        </div>
     </section>
   </DashboardLayout>
  );
}
