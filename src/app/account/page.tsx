import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest area",
};

const Account = () => {
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, Raghad
    </h2>
  );
};

export default Account;
