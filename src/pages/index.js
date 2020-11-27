import Head from "next/head";
import { useState } from "react";

import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  function handleSearchInputChange(e) {
    const { value } = e.target;
    setKeyword(value);
  }

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}>Found {countries.length} countries </div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or Sub-region"
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
