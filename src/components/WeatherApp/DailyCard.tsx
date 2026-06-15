"use client";

import { useEffect, useState } from "react";

export const getWeatherInfo = (code: number): { label: string; icon: string } => {
  if (code === 0) return { label: "快晴", icon: "☀️" };
  if (code <= 3) return { label: "晴れ", icon: "🌤️" };
  if (code <= 48) return { label: "霧", icon: "🌫️" };
  if (code <= 55) return { label: "霧雨", icon: "🌦️" };
  if (code <= 65) return { label: "雨", icon: "🌧️" };
  if (code <= 75) return { label: "雪", icon: "🌨️" };
  if (code <= 82) return { label: "にわか雨", icon: "🌧️" };
  if (code >= 95) return { label: "雷雨", icon: "⛈️" };
  return { label: "不明", icon: "❓" };
};
type City = {
  name: string;
  latitude: number;
  longitude: number;
};

const cities: City[] = [
  { name: "東京", latitude: 35.6762, longitude: 139.6503 },
  { name: "大阪", latitude: 34.6937, longitude: 135.5023 },
  { name: "札幌", latitude: 43.0621, longitude: 141.3544 },
  { name: "福岡", latitude: 33.5904, longitude: 130.4017 },
  { name: "名古屋", latitude: 35.1815, longitude: 136.9066 },
  { name: "仙台", latitude: 38.2682, longitude: 140.8694 },
  { name: "那覇", latitude: 26.2124, longitude: 127.6809 },
];

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const buildWeatherUrl = (lat: number, lon: number): string => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    timezone: "Asia/Tokyo",
    forecast_days: "7",
  });
  return `${BASE_URL}?${params}`;
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

  const convertDailyWeather = (daily: Daily | undefined): DailyWeather[] => {
    if (!daily) return [];
    return daily.time.map((date, index) => ({
      date,
      maxTemperature: daily.temperature_2m_max[index],
      minTemperature: daily.temperature_2m_min[index],
      weatherCode: daily.weather_code[index],
      time: date,
    }));
  };

  const currentWeather = weather?.current;
  const dailyWeather:DailyWeather[] = convertDailyWeather(weather?.daily);

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
        <section>
          <h2>今週の天気</h2>
          {
            dailyWeather?.map((d) => (
              <div key={d.date}>
                <p>{d.date}</p>
                <p>{getWeatherInfo(d.weatherCode).icon} {getWeatherInfo(d.weatherCode).label}</p>
                <p>最高: {d.maxTemperature}°C 最低: {d.minTemperature}°C</p>
              </div>
            ))
          }
        </section>
      </>
      }
    </div>
  );
};
 