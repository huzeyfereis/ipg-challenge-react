import { Button, Card, Typography, CircularProgress } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useAppSelector } from '../../../hooks/useTypedSelector';

interface Props {
  id?: string;
  cityName: string;
  description: string;
  imageCode?: number;
  imagePath: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  addFav?: () => void;
  removeFav?: (e: any) => any;
}

export default function WeatherDetails({ ...props }: Props) {
  const { isLoading } = useAppSelector((state) => state.search);
  const {
    id,
    cityName,
    description,
    imagePath,
    temperature,
    humidity,
    precipitation,
    addFav,
    removeFav,
  } = props;
  return (
    <Card
      sx={{
        padding: 2,
        boxSizing: 'border-box',
        boxShadow: 3,
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <Typography>{cityName}</Typography>
          <img src={imagePath} alt='Weather data by WeatherAPI.com'></img> |
          <Typography>Current weather: {description}</Typography> |
          <Typography>Temp: {temperature} C°</Typography> |
          <Typography>Humidty: {humidity}</Typography> |
          <Typography>Precip_mm: {precipitation}</Typography>
          {addFav && (
            <Button
              onClick={addFav}
              variant='outlined'
              startIcon={<ThumbUpIcon />}
            >
              Like{' '}
            </Button>
          )}
          {removeFav && (
            <Button
              id={id}
              onClick={removeFav}
              variant='outlined'
              size='small'
              startIcon={<ThumbDownIcon />}
            >
              Dislike
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
