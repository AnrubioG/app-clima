import { Weather } from "../types";
import { formatTemperature } from "../utils";
import styles from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  weather: Weather;
};

export function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2>El clima en {weather.name}</h2>
      <p className={styles.current}>
        {formatTemperature(weather.main.temp)}&deg;C{" "}
      </p>
      <div className={styles.temperatures}>
        <p>
          <span>Min:</span> {formatTemperature(weather.main.temp_min)}&deg;C{" "}
        </p>
        <p>
          <span>Max: </span> {formatTemperature(weather.main.temp_max)}&deg;C
        </p>
      </div>
    </div>
  );
}
