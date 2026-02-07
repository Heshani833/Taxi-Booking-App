
import Booking from "@/components/Booking/Booking";
export default function Home() {
  return (
   <div>
    <div className="grid grid-cols-1 md:grid-cols-3 ">
      <div className="bg-blue-200">
        <Booking/>
      </div>
      <div className="col-span-2 bg-amber-100">
        Map
      </div>

    </div>
   </div>
  );
}
