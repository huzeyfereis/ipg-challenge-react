import axios from 'axios';

interface ResultItem {
  cityName: string;
  description: string;
  imageCode: string;
  imagePath: string;
  temperature: string;
  humidity: number;
  precipitation: string;
}

export const getCurrentWeather = async (cityName: string) => {
  console.log(cityName);
  return await axios
    .get(`${process.env.REACT_APP_BASE_URI}${cityName}`)
    .then((res) => {
      if (!res) return null;
      const { location, current } = res.data;
      const structuredResponse: ResultItem = {
        cityName: location.name,
        description: current.condition.text,
        imageCode: current.condition.code,
        imagePath: current.condition.icon,
        temperature: current.temp_c,
        humidity: current.humidity,
        precipitation: current.precip_mm,
      };
      return structuredResponse;
    })
    .catch((err) => console.log(err));
};

export default { getCurrentWeather };
