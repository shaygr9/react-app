export type WeatherData = {
  condition: string;
  image: string;
  tempC: number;
  windMph: number;
  humidityPercentage: number;
  cloudPercentage: number;
  feelsLikeC: number;
};

interface IWeatherService {
  getTodayWeather: () => Promise<WeatherData>;
  getTodayHourly: () => void;
  getForecast: (days: number) => void;
}

export const DEFAULT_WEATHER: WeatherData = {
  condition: "Partly cloudy",
  image: "cdn.weatherapi.com/weather/64x64/night/116.png",
  tempC: 21.3,
  windMph: 8.5,
  humidityPercentage: 64,
  cloudPercentage: 25,
  feelsLikeC: 21.3,
};

// https://www.weatherapi.com/docs/
const BASE_URL = "http://api.weatherapi.com/v1";
const FORECAST_PATH = "/forecast.json";
const CURRENT_PATH = "/current.json";
const API_KEY_PARAM = "key=468f963f26134908a55154048241611";

export class WeatherService implements IWeatherService {
  _city: string;
  constructor(city = "Tel Aviv") {
    this._city = city;
  }
  getForecast(days: number) {
    fetch(
      `${BASE_URL}${FORECAST_PATH}?${API_KEY_PARAM}&q=${this._city}&days=${days}`
    );
    return { 0: DEFAULT_WEATHER, 1: DEFAULT_WEATHER };
  }

  getTodayHourly() {
    this.getForecast(0);
    return DEFAULT_WEATHER;
  }

  async getTodayWeather(): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}${CURRENT_PATH}?${API_KEY_PARAM}&q=${this._city}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log("shay", data);
    return this._convertResponseToWeatherObject(data);
  }

  _convertResponseToWeatherObject(data: unknown): WeatherData {
    if (typeof data !== "object" || data === null) {
      throw new Error(); //TODO
    }
    const current = "current" in data ? data.current : undefined;
    if (!current || typeof current !== "object") {
      throw new Error(); //TODO
    }

    const condition = "condition" in current ? current.condition : undefined;
    if (!condition || typeof condition !== "object") {
      throw new Error(); //TODO
    }

    const res = {
      condition: "text" in condition ? (condition.text as string) : "",
      image: "icon" in condition ? (condition.icon as string) : "",
      tempC: "temp_c" in current ? (current.temp_c as number) : NaN,
      windMph: "wind_mph" in current ? (current.wind_mph as number) : NaN,
      humidityPercentage:
        "humidity" in current ? (current.humidity as number) : NaN,
      cloudPercentage: "cloud" in current ? (current.cloud as number) : NaN,
      feelsLikeC:
        "feelslike_c" in current ? (current.feelslike_c as number) : NaN,
    };
    console.log("shy", res);
    return res;
  }
}
