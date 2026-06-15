export const cities: City[] = [
  { name: "東京", latitude: 35.6762, longitude: 139.6503 },
  { name: "大阪", latitude: 34.6937, longitude: 135.5023 },
  { name: "札幌", latitude: 43.0621, longitude: 141.3544 },
  { name: "福岡", latitude: 33.5904, longitude: 130.4017 },
  { name: "名古屋", latitude: 35.1815, longitude: 136.9066 },
  { name: "仙台", latitude: 38.2682, longitude: 140.8694 },
  { name: "那覇", latitude: 26.2124, longitude: 127.6809 },
];

type City = {
  name: string;
  latitude: number;
  longitude: number;
};

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
}