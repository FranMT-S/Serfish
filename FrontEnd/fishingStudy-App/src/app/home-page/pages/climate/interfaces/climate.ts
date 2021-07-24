export interface CurrentWeather {
    coord:      Coord;
    weather:    WeatherC[];
    base:       string;
    main:       MainC;
    visibility: number;
    wind:       Wind;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface MainC {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
}

export interface Sys {
    type:    number;
    id:      number;
    country: string;
    sunrise: number;
    sunset:  number;
}

export interface WeatherC {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Wind {
    speed: number;
    deg:   number;
    gust:  number;
}


// ***************************************************************

export interface CurrentHoursDaysWeather {
    lat:             number;
    lon:             number;
    timezone:        string;
    timezone_offset: number;
    current?:         Current;
    hourly?:          Current[];
    daily?:           Daily[];
}

export interface Current {
    dt:         number;
    sunrise?:   number;
    sunset?:    number;
    temp:       number;
    feels_like: number;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    uvi:        number;
    clouds:     number;
    visibility: number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    Weather[];
    pop?:       number;
    rain?:      Rain;
}

export interface Rain {
    "1h": number;
}

export interface Weather {
    id:          number;
    main:        Main|string;
    description: Description|string;
    icon:        Icon|string;
}

export enum Description {
    BrokenClouds = "broken clouds",
    LightRain = "light rain",
    ModerateRain = "moderate rain",
    OvercastClouds = "overcast clouds",
    ScatteredClouds = "scattered clouds",
}

export enum Icon {
    The03D = "03d",
    The04D = "04d",
    The04N = "04n",
    The10D = "10d",
    The10N = "10n",
}

export enum Main {
    Clouds = "Clouds",
    Rain = "Rain",
}

export interface Daily {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    moonrise:   number;
    moonset:    number;
    moon_phase: number;
    temp:       Temp;
    feels_like: FeelsLike;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    Weather[];
    clouds:     number;
    pop:        number;
    uvi:        number;
    rain?:      number;
}

export interface FeelsLike {
    day:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface Temp {
    day:   number;
    min:   number;
    max:   number;
    night: number;
    eve:   number;
    morn:  number;
}