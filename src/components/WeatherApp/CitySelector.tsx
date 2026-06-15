import React, { useState } from 'react';
import type { WeatherResponse } from "./weather"



type City = {
  name: string;
  latitude: number;
  longitude: number;
};

type Current = {
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_speed_10m: number;
}

type Daily = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

type Weather = {
  current: Current
  daily: Daily;
}

type DailyWeather = {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
  time: string;
}

const cities: City[] = [
  { name: "東京", latitude: 35.6762, longitude: 139.6503 },
  { name: "大阪", latitude: 34.6937, longitude: 135.5023 },
  { name: "札幌", latitude: 43.0621, longitude: 141.3544 },
  { name: "福岡", latitude: 33.5904, longitude: 130.4017 },
  { name: "名古屋", latitude: 35.1815, longitude: 136.9066 },
  { name: "仙台", latitude: 38.2682, longitude: 140.8694 },
  { name: "那覇", latitude: 26.2124, longitude: 127.6809 },
];

export const DropdownList: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<City | null>(null);
    const [isArrowActive, setArrowActive] = useState(false); //これは何？

    const handleselectOption = (event: React.ChangeEvent<HTMLSelectElement>) => { 
         const selectedValue = event.target.value;
         const selected = cities.find((City) => City.name === selectedValue);
         if(selected !== undefined) {
             setSelectedOption(selected);
         } 
         return
    };


    
const arrowClassName = `select-arrow ${isArrowActive ? 'active' : ''}`;
return (
    <div className="container">
      <h2>都市を選択してください</h2>
      <div className="select-container">
        <select
          value={selectedOption?.name}
          onChange={handleselectOption}
          onFocus={() => setArrowActive(true)}
          onBlur={() => setArrowActive(false)}
        >
          <option value="">選択してください</option>
          {cities.map((City) => (
            <option key={City.name} value={City.name}>
              {City.name}
            </option>
          ))}
        </select>
        <div className={arrowClassName}></div>
      </div>
      {selectedOption && <p>選択されたオプション： {selectedOption.name}</p>}
    </div>
)};