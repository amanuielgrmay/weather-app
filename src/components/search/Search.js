import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    if (!inputValue) {
      return Promise.resolve({
        options: [],
        hasMore: false,
      });
    }

    return fetch(
      `${GEO_API_URL}cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (!response || !response.data) {
          return {
            options: [],
            hasMore: false,
          };
        }

        return {
          options: response.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          })),
          hasMore: false,
        };
      })
      .catch((err) => {
        console.error(err);
        return {
          options: [],
          hasMore: false,
        };
      });
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search For City"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
