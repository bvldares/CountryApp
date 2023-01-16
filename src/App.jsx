import React, {useState, useEffect} from "react";
import "./App.css"
import {nanoid} from "nanoid"
import moon from "./assets/moon.svg"
import sun from "./assets/sun.svg"
import search from "./assets/search.svg"


export default function App(){

  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("")
  const [datafetch, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [modalParam, setModalParam] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  

  const handleFilter = (event) => setFilter(event.target.value)
  const handleChange = (event) => setInput(event.target.value)
  
  
  function openModal(event){
    setModalParam(event.target.id)
    document.querySelector("dialog").showModal() 
  }

  function handleClose(){document.querySelector("dialog").close()}

  function toggleTheme(){
    setDarkMode(prev => !prev)
    document.body.style.backgroundColor = !darkMode ? "#202C36" : ""
  }


  useEffect(()=>{
    fetch(`https://restcountries.com/v3.1/${input ? "name/" + input : "all"}`)
    .then(res=>res.json())
    .then(data => setData(data))
  },[input])
  


  const countryElements = 
    datafetch.status !== 404  ? 
    datafetch.map(country =>{
        if(filter === ""){
          return (
            <div className="country-el" key={nanoid()} style={{backgroundColor : darkMode ? "#2B3844" :"" , color: darkMode ? "#fff" : ""}} >
                <img className="country-img" src={country.flags.svg} alt="country flag" id={country.name.official} onClick={openModal} />
                <div className="country-description">
                <p className="country-name" id={country.name.official} onClick={openModal}>{country.name.official}</p>
                <p className="country-population"><span>Population: </span>{country.population.toLocaleString("it-IT")}</p>
                <p className="country-region"><span>Region: </span>{country.region}</p>
                <p className="country-capital"><span>Capital: </span>{country.capital}</p>
                </div>
            </div>
            )
        }else if(country.region === filter){
          return (
            <div className="country-el" key={nanoid()}>
                <img className="country-img" src={country.flags.svg} alt="country flag" id={country.name.common} onClick={openModal} />
                <div className="country-description">
                <p className="country-name" id={country.name.common} onClick={openModal} >{country.name.official}</p>
                <p className="country-population"><span>Population: </span>{country.population.toLocaleString("it-IT")}</p>
                <p className="country-region"><span>Region: </span>{country.region}</p>
                <p className="country-capital"><span>Capital: </span>{country.capital}</p>
                </div>
            </div>
            )
        }
      }):
      <h1 className="errorMessage" style={{color: darkMode ? "#fff" : ""}}>Maybe this country is on another galaxy?</h1> 
      
    
      const modalElement = 
        datafetch.status !== 404 ?
        datafetch.map(country =>{
        if(country.name.official === modalParam){
          return (
            <div className="dialog" key={nanoid()}>
                <img className="dialog-country-img" src={country.flags.svg} alt="country flag" id={country.name.official} onClick={openModal} />
                <div className="dialog-country-description">
                <p className="dialog-name" id={country.name.official} onClick={openModal} >{country.name.common}</p>
                <p className="dialog-p"><span>Native Name: </span>{country.name.official}</p>
                <p className="dialog-p"><span>Population: </span>{country.population.toLocaleString("it-IT")}</p>
                <p className="dialog-p"><span>Region: </span>{country.region}</p>
                <p className="dialog-p"><span>Sub Region: </span>{country.subregion}</p>
                <p className="dialog-p"><span>Capital: </span>{country.capital}</p>
                <p className="dialog-p"><span>Top Level Domain: </span>{country.tld}</p>
                <p className="dialog-p"><span>Currencies </span>{Object.values(country.currencies)[0].name}</p>
                <p className="dialog-p"><span>Languages: </span>{Object.values(country.languages)[0]} </p>
                <div className="dialog-border">
                  {country.borders !== undefined && <p className="dialog-border-title">Border Countries:</p>}
                  {country.borders !== undefined && 
                  <div className="boarder-countries">
                     {country.borders.map(border =>{
                       return <p className="dialog-border-item" key={nanoid()}  style={{color: darkMode ? "#fff" : ""}}>{border}</p>
                     })}
                  </div>}
                </div>
                
                </div>
            </div>
            )
        }
      }):
      console.log("qualcosa è andato storto")


  return (
    <div className="wrapper">
       <header style={{backgroundColor: darkMode ? "#202C36" : "", color: darkMode ? "#FFF" : ""}}>
        <nav>
          <p className="logo">Where in the world?</p>
          <button className="themeToggle-btn" onClick={toggleTheme} style={{color: darkMode ? "#fff" :""}}>
            <img className="themeToggle-btn-icon" src={ darkMode ? sun : moon} alt="moon icon" />
            Dark Mode
          </button>
        </nav>
       </header>
      <main>
        
        <div className="input-wrapper" >
          <div className="input-text-wrapper" style={{backgroundColor : darkMode ? "#2B3844" :"" , color: darkMode ? "#fff" : ""}}>
          <input onChange={handleChange} value={input} type="text" id="search-input" className="search-input" placeholder="Search for a country..." 
              style={{backgroundColor : darkMode ? "#2B3844" :"" , color: darkMode ? "#fff" : ""}}
              />
            
          </div>

          <select onChange={handleFilter} className="dropdown-menu" name="filter" id="filter"  style={{backgroundColor : darkMode ? "#2B3844" :"" , color: darkMode ? "#fff" : ""}}>
              <option value="">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceania</option>
          </select>

        </div>

        <div className="country-wrapper">
            {countryElements}
        </div>

        <dialog open={open} onClose={handleClose}  style={{backgroundColor : darkMode ? "#2B3844" :"" , color: darkMode ? "#fff" : ""}} >
           <button className="closeModal" onClick={handleClose}  
           style={{backgroundColor : darkMode ? "#2B3844" :"" , color: darkMode ? "#fff" : "", boxShadow: darkMode ? "none" : "", border: darkMode ? "1px solid grey" : ""}} 
           >Back</button>
           {modalElement}
        </dialog>

      </main>


    </div>
     

  
  )
}