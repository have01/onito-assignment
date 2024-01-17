import React, { useState } from "react";
import { FetchCountries } from "../utils/fetchCountries";
import { TextField } from "@mui/material";

type props = {
  countryName: string;
  setCountryName: React.Dispatch<React.SetStateAction<string>>;
};
const Country: React.FC<props> = ({ countryName, setCountryName }) => {
  const [showList, setShowList] = useState<boolean>(true);

  const { countries } = FetchCountries(countryName);
  console.log(countries, showList);
  const handleSelectCountry = (country: string) => {
    setCountryName(country);
    setShowList(false);
  };
  const handleCountryName = (country: string) => {
    console.log(countryName);
    setShowList(true);
    setCountryName(country);
  };
  return (
    <>
      <div className="flex w-full flex-col justify-start">
        <TextField
          type="text"
          onChange={(e) => handleCountryName(e.target.value)}
          value={countryName}
          label="Country"
          variant="outlined"
        />
        {showList && countries.length > 0 && (
          <ul className="w-[285px] max-h-40 overflow-y-auto shadow-md bg-white py-2 text-sm text-gray-700  ">
            {countries.map((country) => (
              <li
                key={country.cca2}
                onClick={() => handleSelectCountry(country.name.common)}
                className="max-h-20  px-2 py-2  w-full cursor-pointer hover:bg-slate-200"
              >
                {country?.name?.common}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Country;
