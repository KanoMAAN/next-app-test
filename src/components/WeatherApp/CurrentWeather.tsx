import { useEffect, useState } from "react";
import { buildWeatherUrl, City } from "./weather";
import { cities, getWeatherInfo } from "./constant";

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

export const WeatherView = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<Weather>();
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);

  //東京 ＝＞ 大阪
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.currentTarget.value;//大阪
    const city = cities.find((c) => c.name === cityName);
    if (city) {
      setSelectedCity(city);
    }
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const city = selectedCity; //選択された都市
        const url = buildWeatherUrl(city.latitude, city.longitude);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setWeather(data);
      } catch (err) {
        console.error("天気情報の取得に失敗:", err instanceof Error ? err.message : "不明なエラー");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [selectedCity]);

  const currentWeather = weather?.current;

  if(!currentWeather) return <p>天気情報を取得中...</p>;
  return (
    <div>
      <section>
        <h2>都市</h2>
        <select onChange={handleCityChange} value={selectedCity.name}>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>{city.name}</option>
          ))}
        </select>
      </section>
      {loading || !currentWeather ? <p>天気情報を取得中...</p> 
      : 
      <>
        <section>
          <h2>現在の天気情報</h2>
          <p>{currentWeather?.temperature_2m}°C </p>
          <p>{getWeatherInfo(currentWeather.weather_code).icon} {getWeatherInfo(currentWeather.weather_code).label}</p>
          <p>風速: {currentWeather.wind_speed_10m} m/s</p>
        </section>
      </>
      }
    </div>
  );
};
 