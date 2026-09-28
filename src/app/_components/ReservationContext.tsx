"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

interface ReservationContextType {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
}

const ResercationContext = createContext<ReservationContextType | undefined>(
  undefined,
);

const initialState: DateRange = { from: undefined, to: undefined };

const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [range, setRange] = useState<DateRange | undefined>(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <ResercationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ResercationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ResercationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};

export { ReservationProvider, useReservation };
