import { SearchType } from "../types";
import axios from "axios";
import { useMemo, useState } from "react";
import { z } from "zod";

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

type Weather = z.infer<typeof Weather>;

const initalState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export function useWeather() {
  const [weather, setWeather] = useState<Weather>(initalState);

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initalState);
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios(geoUrl);

      if (!data[0]) {
        setNotFound(true);
        return;
      }

      if (data[0]) {
        setNotFound(false);
        const lat = data[0].lat;
        const lon = data[0].lon;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
        const { data: weatherResult } = await axios(weatherUrl);
        const result = Weather.safeParse(weatherResult);

        if (result.success) {
          setWeather(result.data);
        } else {
          console.log("respuesta mal formada");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData,
  };
}
