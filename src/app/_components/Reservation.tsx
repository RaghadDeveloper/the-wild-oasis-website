import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../_types";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

const Reservation = async ({ cabin }: { cabin: Cabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(String(cabin.id)),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-100">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservation;
