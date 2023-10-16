import { Box, Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../hooks/useTypedSelector';
import { useState } from 'react';
import { getCurrentWeather } from '../../../services/searchService';
import { searchActions } from '../../../features/searchSlice';
import { fetchData } from '../../../features/searchSlice';

export default function WeatherSearch() {
  const dispatch = useAppDispatch();
  const [cityName, setCityName] = useState('');
  const { fetchDataRequest } = searchActions;

  const searchHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cityName.length > 0) {
      dispatch(fetchDataRequest(cityName));
      dispatch(fetchData(cityName));
      setCityName('');
    } else {
      alert('Please enter a city name!');
    }
  };

  const getCityNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        width: '30%',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <TextField
        id={'city'}
        label={'Search'}
        name={'city'}
        onChange={getCityNameHandler}
      />
      <Button
        name='_action'
        value='search'
        type='submit'
        variant='contained'
        color='primary'
        onClick={searchHandler}
      >
        Search
      </Button>
    </Box>
  );
}
