import { Box, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypedSelector';
import WeatherDetails from '../components/WeatherDetails';

import WeatherSearch from '../components/WeatherSearch';
import { v4 as uuidv4 } from 'uuid';
import { searchActions } from '../../features/searchSlice';

export default function HomePage() {
  const { data, favoriteCities } = useAppSelector((state) => state.search);
  const { addFavoriteCity, removeFavoriteCity } = searchActions;
  const dispatch = useAppDispatch();

  const {
    cityName,
    description,
    imagePath,
    temperature,
    humidity,
    precipitation,
  } = data;

  const addFavoriteHadler = () => {
    const favoriteWeather = {
      id: uuidv4(),
      cityName: data.cityName,
      imagePath: data.imagePath,
      description: data.description,
      temperature: data.temperature,
      humidity: data.humidity,
      precipitation: data.precipitation,
    };
    if (
      favoriteCities.find((city) => city.cityName === favoriteWeather.cityName)
    ) {
      return alert("You can't add same city to your favorites.");
    }
    if (favoriteCities.length < 5) {
      dispatch(addFavoriteCity(favoriteWeather));
    } else {
      alert("You can't add more than five city to your favorite list.");
    }
  };

  const removeFavoriteCityHandler = (e: any) => {
    const data = favoriteCities.filter((city) => e.target.id !== city.id);
    dispatch(removeFavoriteCity(data));
  };

  return (
    <Box sx={{ width: '70%', margin: 'auto' }}>
      {' '}
      <Typography
        sx={{ margin: '4rem auto', width: '50%', textAlign: 'center' }}
        variant='h6'
        component='div'
      >
        Welcome to the weather app 'ipgautomotive'
      </Typography>
      <WeatherSearch />
      {data.cityName && (
        <WeatherDetails
          cityName={cityName}
          description={description}
          imagePath={imagePath}
          temperature={temperature}
          humidity={humidity}
          precipitation={precipitation}
          addFav={addFavoriteHadler}
        />
      )}
      {favoriteCities.length > 0 && (
        <Typography marginTop={2} variant='h4'>
          Favorite Cities
        </Typography>
      )}
      {favoriteCities.map((city) => (
        <WeatherDetails
          id={city.id}
          cityName={city.cityName}
          description={city.description}
          imagePath={city.imagePath}
          temperature={city.temperature}
          humidity={city.humidity}
          precipitation={city.precipitation}
          removeFav={removeFavoriteCityHandler}
        />
      ))}
    </Box>
  );
}
