import styles from "./App.module.css";
import { Alert } from "./components/Alert/Alert";
import { Form } from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import { useWeather } from "./hooks/useWeather";
import { WeatherDetail } from "./WeatherDetail/WeatherDetail";

function App() {
  const { weather, loading, notFound, fetchWeather, hasWeatherData } =
    useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador del clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
