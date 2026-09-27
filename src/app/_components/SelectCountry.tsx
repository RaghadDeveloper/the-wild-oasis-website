import { getCountries } from "@/app/_lib/data-service";
import { Country } from "../_types";

interface SelectCountryProps {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}

const SelectCountry = async ({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) => {
  const data = await getCountries();
  const countries = data.data.objects;
  const flag =
    countries?.find(
      (country: Country) => country.names.common === defaultCountry,
    )?.flag.url_png ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries?.map((c: Country) => (
        <option key={c.names.common} value={`${c.names.common}%${c.flag}`}>
          {c.names.common}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
