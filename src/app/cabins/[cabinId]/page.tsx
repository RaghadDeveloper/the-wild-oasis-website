import CabinInfo from "@/app/_components/CabinInfo";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Cabin } from "@/app/_types";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const cabin: Cabin = await getCabin((await params).cabinId);
  const { name } = cabin;

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins: Cabin[] = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));
  return ids;
}

const Page = async ({ params }: { params: Promise<{ cabinId: string }> }) => {
  const cabin: Cabin = await getCabin((await params).cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinInfo cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
