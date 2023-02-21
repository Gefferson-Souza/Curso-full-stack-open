import { useState, useEffect } from "react";
import Display from "./Components/Display";
import allCountries from './services/countries'
import SearchBar from "./Components/SearchBar";
import DisplayOne from "./Components/Display";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const hook = () => {
    allCountries
      .getAll()
      .then(countriesData => {
        setCountries(countriesData)
      })
    .catch(error => {
      if(window.confirm('ERROR cannot find the data on the server, want to refresh?')){
        document.location.reload()
      }
    })
  };
  useEffect(hook, []);


  if(!countries){
    return null
  }

  let message
  if(search === ''){
    message = 'Try typing this example, Ex: Brazil'
  }else if(filteredCountries.length > 11 && filteredCountries.length !== countries.length){
    message = 'To Many results, be more specific.'
  }else if (filteredCountries.length === 0){
    message = 'No country Found'
  }


  const displayCountrie = (filteredCountries.length < 11 && filteredCountries.length > 0) ?
   filteredCountries.map((c,i) => {
    if(filteredCountries.length === 1){
      return <DisplayOne
    key={i}
    name={c.name.common}
    continent={c.continents}
    capital={c.capital}
    area={c.area}
    population={c.population}
    languages={Object.values(c.languages)}
    flag={c.flags.png}
    number={i}
    />
    }else{
      return <Display
    key={i}
    name={c.name.common}
    continent={c.continents}
    capital={c.capital}
    area={c.area}
    population={c.population}
    languages={Object.values(c.languages)}
    flag={c.flags.png}
    number={i}
    />
    }
    
   }) : ''


   const searchCountries = (e) => {
    setSearch(e.target.value);
    const filteredCountrie = countries.filter(c => ((c.name.official).toLowerCase()).indexOf(search.toLowerCase()) !== -1);
    setFilteredCountries(filteredCountrie);
  }


  return (
    <div className="App">
      <SearchBar onChange={(e) => searchCountries(e)} value={search} />
      {message}
      {displayCountrie}
    </div>
  );
}

export default App;
