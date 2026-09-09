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
  const countries = data.objects ?? [];
  console.log("countries", countries);
  const flag =
    countries?.find((country: Country) => country.name === defaultCountry)
      ?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c: Country) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
