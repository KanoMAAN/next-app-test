import { useEffect, useState } from "react";
import { cities, getWeatherInfo } from "./constant";
import { buildWeatherUrl } from "./weather";

type City = {
  name: string;
  latitude: number;
  longitude: number;
};

type DailyWeather = {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
  time: string;
}

const convertDailyWeather = (daily: Daily | undefined): DailyWeather[] => {
    if (!daily) return [];
    return daily.time.map((date: number, index: string) => ({
      date,
      maxTemperature: daily.temperature_2m_max[index],
      minTemperature: daily.temperature_2m_min[index],
      weatherCode: daily.weather_code[index],
      time: date,
    }));
  };

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
      {loading || !currentWeather ? <p>天気情報を取得中...</p> 
      : 
      <>
      <section>
          <h2>今週の天気</h2>
          {
            dailyWeather?.map((d) => (
              <div key={d.date}>
                <p>{d.date}</p
                <p>{getWeatherInfo(d.weatherCode).icon} {getWeatherInfo(d.weatherCode).label}</p>
                <p>最高: {d.maxTemperature}°C 最低: {d.minTemperature}°C</p>
              </div>
            ))
          }
        </section>
      </>
      }
    </div>
  )};
