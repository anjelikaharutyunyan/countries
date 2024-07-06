import { useEffect, useState } from 'react';
import './App.css';

const theadInfo = ['Flag', 'Country', 'Capital Name', 'Region', 'Subregion', 'Language', 'Currency', 'Independent', 'Area'];

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCapital, setSelectedCapital] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => { 
        setCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  useEffect(() => {
    filterCountries();
  });

  const filterCountries = () => {
    let filtered = countries;

    if (selectedCountry) {
      filtered = filtered.filter(country => country.name.common.includes(selectedCountry));
    }
    if (selectedRegion) {
      filtered = filtered.filter(country => country.region.includes(selectedRegion));
    }
    if (selectedCapital) {
      filtered = filtered.filter(country => country.capital.includes(selectedCapital));
    }

    setFilteredCountries(filtered);
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'country') {
      setSelectedCountry(value);
    } else if (name === 'region') {
      setSelectedRegion(value);
    } else if (name === 'capital') {
      setSelectedCapital(value);
    }
  }

  const clearFilters = () => {
    setSelectedCountry('');
    setSelectedRegion('');
    setSelectedCapital('');
  }

  return (
    <>
      <div className='filter'>
        <label>Country</label>
        <select name="country" value={selectedCountry} onChange={handleFilterChange}>
          <option value="">All</option>
          {countries.map((country) => (
            <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
          ))}
        </select>
        <label>Region</label>
        <select name="region" value={selectedRegion} onChange={handleFilterChange}>
          <option value="">All</option>
          {countries.map((country) => (
            <option key={country.region} value={country.region}>{country.region}</option>
          ))}
        </select>
        <label>Capital</label>
        <select name="capital" value={selectedCapital} onChange={handleFilterChange}>
          <option value="">All</option>
          {countries.map((country) => (
            <option key={country.capital} value={country.capital}>{country.capital}</option>
          ))}
        </select>
        <button className='clear' onClick={clearFilters}>Clear All Filters</button>
      </div>
      <table>
        <thead>
          <tr>
            {theadInfo.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country, index) => (
            <tr key={index}>
              <td><img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="50" /></td>
              <td>{country.name.common}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td>{country.subregion}</td>
              <td>{Object.values(country.languages || {}).join(', ')}</td>
              <td>{Object.values(country.currencies || {}).map(currency => currency.name).join(', ')}</td>
              <td>{country.independent ? 'Yes' : 'No'}</td>
              <td>{country.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CountryList;
