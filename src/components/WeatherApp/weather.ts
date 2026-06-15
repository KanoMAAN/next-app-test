// src/types/weather.ts
export type WeatherResponse = {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};

export type City = {
  name: string;
  latitude: number;
  longitude: number;
};

// src/lib/weather.ts
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