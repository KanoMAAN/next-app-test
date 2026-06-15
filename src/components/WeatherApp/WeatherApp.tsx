"use client"

import React from 'react';
import { DropdownList } from './CitySelector';

type DailyWeather = {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
  time: string;
}


export const WeatherApp: React.FC = () => {
    return (
        <div>
            <DropdownList /> {/* */}
            <></>
        </div>
    );
};

