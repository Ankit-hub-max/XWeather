import { useState,useEffect} from "react"
import './CardStyle.css'
import axios from 'axios';
function App() {
  const [city,setCity]=useState('');
  const [searchCity,setSearchCity]=useState('');
  const [weather,setWeather]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  

  useEffect(()=>{
     if (!searchCity) return;
    

    const fetchWeather=async ()=>{
    setLoading(true)
    setError('');
    setWeather(null);
    try{
      const url=`https://api.weatherapi.com/v1/current.json?key=84cc51eb17b14698bc8115151250606&q=${searchCity}`;
      const response=await axios.get(url);
      setWeather(response.data);
    }catch(error){
      alert("Failed to fetch weather data");
      setError(error.message || "Failed to fetch weather data");
    }finally{
      setLoading(false);
    }
  };
    fetchWeather();

  },[searchCity])

  
 

  return (
    <>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center', 
        background:'rgba(240,248,255,255)',height:'100vh',width:'100vw'}}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
          <div style={{display:'flex',gap:'10px',marginBottom:'10px'}}>
        <input type="text"
        placeholder='Enter city name'
        style={{height:'40px',width:'200px',borderRadius:'7px'}} value={city}
        onChange={(e)=>setCity(e.target.value)}/>

        <button onClick={()=>setSearchCity(city)} style={{background:'rgba(76,175,80,255)',height:'45px',
           width:'80px',borderRadius:'8px',cursor:'pointer',color:'#fff',marginLeft:'8px' }}>
            Search
            </button>
        </div>
        {loading && <p>Loading data...</p>}
        {error && <p style={{color:'red'}}>{error}</p>}
        {weather && (
          <div className="weather-cards">

            <div className="weather-card">
            <p>Temperature: {weather.current.temp_c} *C</p>
            </div>

            <div className="weather-card">
            <p>Humidity: {weather.current.humidity}%</p>
            </div>

            <div className="weather-card">
            <p>Condition: {weather.current.condition.text}</p>
            </div>

            <div className="weather-card">
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
            </div>

            </div>
        )}
      
      </div>
      </div>
    </>
  )
}

export default App
