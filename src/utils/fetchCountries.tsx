import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface Country {
  name: string;
}

// Removed setShowList from the interface
interface FetchCountriesHook {
  countries: Country[];
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
}

export const FetchCountries = (countryName: string): FetchCountriesHook => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [debouncedCountryName] = useDebounce(countryName, 100);

  useEffect(() => {
    //function to fetch countries based out on user input
    const fetchCountries = async () => {
      try {
        if (debouncedCountryName.length > 0) {
          const response: AxiosResponse<Country[]> = await axios.get(
            `https://restcountries.com/v3.1/name/${debouncedCountryName}`
          );

          if (response && response.data) {
            setCountries(response.data);
          }
        } else {
          setCountries([]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [debouncedCountryName]);

  return { countries, setCountries };
};
