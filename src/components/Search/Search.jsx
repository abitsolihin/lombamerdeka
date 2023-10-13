"use client";

import useCustomRouter from "@/middleware/useCustomRouter";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { query, pushQuery } = useCustomRouter();

  // Fungsi untuk memfilter data berdasarkan input pengguna
  const handleSearch = (search) => {
    pushQuery({ ...query, search });
  };

  

  return (
    <div className="search-wrapper left-6 right-6 lg:left-24 lg:right-24 h-10 absolute -bottom-5 outline outline-1 bg-white z-20 rounded flex items-center px-3 space-x-2">
      <div className="icon">
        <FiSearch />
      </div>
      <div className="input-wrapper w-full h-full">
        <input
          type="text"
          placeholder="Mencari Lomba.."
          className="w-full h-full outline-none text-xl"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearch(e.target.value);
        }}
        />
      </div>
    </div>
  );
};

export default Search;
