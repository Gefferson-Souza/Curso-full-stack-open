
import { useState } from "react";
import Weather from "./Weather";


const Display = ({
  name,
  continent,
  capital,
  area,
  population,
  languages,
  flag,
  number
}) => {
  
  const [show, setShow] = useState(false)

  return (
    <div className="display">
      <h1>{name} <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button></h1> 
      {show  &&
      <div>
        <img alt="FLAG" src={flag} />
        <p><strong>Continent:</strong> {continent}</p>
        <p><strong>Capital:</strong> {capital}</p>
        <p><strong>Area:</strong> {area}m²</p>
        <p><strong>Population:</strong> {population}</p>
        <strong>Languages: </strong>
        <ul>
          {languages.map((language, i) => (
            <li key={i}>{Object.values(language)}</li>
          ))}
        </ul>
        <div>
          <Weather key={number} cityName={capital}  />
        </div>
      </div>
      }
    </div>
  );
};


const DisplayOne = ({
  name,
  continent,
  capital,
  area,
  population,
  languages,
  flag,
  number
}) => {
  


  return (
    <div className="display">
      <h1>{name}</h1> 
      <div>
        <img alt="FLAG" src={flag} />
        <p><strong>Continent:</strong> {continent}</p>
        <p><strong>Capital:</strong> {capital}</p>
        <p><strong>Area:</strong> {area}m²</p>
        <p><strong>Population:</strong> {population}</p>
        <strong>Languages: </strong>
        <ul>
          {languages.map((language, i) => (
            <li key={i}>{Object.values(language)}</li>
          ))}
        </ul>
      </div>
      <Weather key={number} cityName={capital} />
    </div>
  );
};

export {DisplayOne};

export default Display;
