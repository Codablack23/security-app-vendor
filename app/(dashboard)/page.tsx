import DashboardLayout from "./DashboardLayout";
import {
  PMSTotalSupplyOption,
  PMSLeftSupplyOption,
  PMSRequestOption,
  SupplyHistorySection
} from "./components";


export default function Home() {
  return (
   <DashboardLayout>
     <section>
      <div className="grid grid-cols-3 gap-x-7 mb-[56px]">
        <PMSTotalSupplyOption/>
        <PMSLeftSupplyOption/>
        <PMSRequestOption/>
      </div>
      <SupplyHistorySection/>
      <p></p>
     </section>
   </DashboardLayout>
  );
}
