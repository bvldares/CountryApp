import React, {useState, useEffect} from "react";
import "./App.css"
import {nanoid} from "nanoid"
import moon from "./assets/moon.svg"
import sun from "./assets/sun.svg"
import search from "./assets/search.svg"


export default function App(){

  const[input, setInput] = useState("")
  const [filter, setFilter] = useState("")
  const [datafetch, setData] = useState([])

 


  useEffect(()=>{
    fetch(`https://restcountries.com/v3.1/${input ? "name/" + input : "all"}`)
    .then(res=>res.json())
    .then(data => setData(data))
  },[input, filter])


  const countryElements = 
    datafetch.status !== 404  ?
    datafetch.map(country =>{
      return (
        <div className="country-el" key={nanoid()}>
            <img className="country-img" src={country.flags.svg} alt="country flag" />
            <div className="country-description">
            <p className="country-name">{country.name.official}</p>
            <p className="country-population"><span>Population: </span>{country.population.toLocaleString("it-IT")}</p>
            <p className="country-region"><span>Region: </span>{country.region}</p>
            <p className="country-capital"><span>Capital: </span>{country.capital}</p>
            </div>
        </div>
        )}) : 
      <h1 className="errorMessage">Maybe this country is on another galaxy?</h1>





  const handleFilter = (event) => setFilter(event.target.value)
  const handleChange = (event) => setInput(event.target.value)


  return (
    <div className="wrapper">
       <nav>
        <p className="logo">Where in the world?</p>
        <button className="themeToggle-btn">
          <img className="themeToggle-btn-icon" src={moon} alt="moon icon" />
          Dark Mode
        </button>
      </nav>

      <main>
        
        <div className="input-wrapper">
          <div className="input-text-wrapper">
              <label htmlFor="search-input"><img className="input-text-icon" src={search} alt="search icon"/></label>
              <input onChange={handleChange} value={input} type="text" id="search-input" className="search-input" placeholder="Search for a country..." />
          </div>

          <select onChange={handleFilter} className="dropdown-menu" name="filter" id="filter">
              <option value="">Filter by Region</option>
              <option value="africa">Africa</option>
              <option value="america">America</option>
              <option value="asia">Asia</option>
              <option value="europa">Europa</option>
              <option value="oceania">Oceania</option>
          </select>

        </div>

        <div className="country-wrapper">
            {countryElements}
        </div>



      </main>


    </div>
     

      

  )
}