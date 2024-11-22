import { useContext, useEffect, useState } from "react";
import { AppContext } from "../helpers/Contexts";
import {
  // DEFAULT_WEATHER,
  WeatherData,
  WeatherService,
} from "../data/weatherService";
import DataBox from "./dataBox";

const SKELETON_DELAY = 2000;

function TodayHourly() {
  const { changePage } = useContext(AppContext);

  // const { tempC, windMph, feelsLikeC, humidityPercentage } = DEFAULT_WEATHER;
  const [degrees, setDegrees] = useState<number>();
  const [wind, setWind] = useState<number>();
  const [feelsLike, setFeelsLikeC] = useState<number>();
  const [humidity, setHumidity] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    updateWeather();
  }, []);

  const weatherService = new WeatherService();

  async function updateWeather() {
    setLoading(true);
    await setTimeout(async () => {
      const updatedWeather: WeatherData =
        await weatherService.getTodayWeather();
      setDegrees(updatedWeather.tempC);
      setWind(updatedWeather.windMph);
      setFeelsLikeC(updatedWeather.feelsLikeC);
      setHumidity(updatedWeather.humidityPercentage);
      setLoading(false);
    }, SKELETON_DELAY);
  }
  const hourly: number[] = [];

  return (
    <div id="today">
      <h2>today weather</h2>
      <div className="current-weather">
        <div className="row">
          <DataBox value={`${degrees}C`} title="degrees" loading={loading} />
          <DataBox value={`${wind} mph`} title="wind" loading={loading} />
        </div>
        <div className="row">
          <DataBox
            value={`${feelsLike}C`}
            title="feels like"
            loading={loading}
          />
          <DataBox value={`${humidity}%`} title="humidity" loading={loading} />
        </div>
      </div>

      <div className="hourly">
        <div className="row">
          <DataBox value={`${hourly[0]}C`} title="now" loading={loading} />
          <DataBox value={`${hourly[1]}C`} title="+1" loading={loading} />
          <DataBox value={`${hourly[2]}C`} title="+2" loading={loading} />
          <DataBox value={`${hourly[3]}C`} title="+3" loading={loading} />
        </div>
      </div>
      <div className="buttons">
        <button className="menu" onClick={() => changePage("menu")}>
          menu
        </button>
        <button className="refresh" onClick={() => updateWeather()}>
          refresh
        </button>
      </div>
    </div>
  );
}

export default TodayHourly;
