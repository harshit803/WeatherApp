import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const API_KEY = "YOUR_OPENWEATHER_API_KEY";
const CITY = "Panipat";

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Panipat&appid=YOUR_OPENWEATHER_API_KEY&units=metric
`
      );
      setWeather(response.data);
    } catch (error) {
      setErrorMsg("Failed to fetch weather data");
    }
  };

  return (
    <View style={styles.container}>
      {weather ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{CITY}</Text>
          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°</Text>
          <Text style={styles.condition}>{weather.weather[0].main}</Text>
          <Text style={styles.details}>H:{Math.round(weather.main.temp_max)}°  L:{Math.round(weather.main.temp_min)}°</Text>
        </View>
      ) : (
        <Text style={styles.error}>{errorMsg || "Loading..."}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  weatherContainer: { alignItems: "center" },
  city: { fontSize: 24, fontWeight: "bold" },
  temperature: { fontSize: 50, fontWeight: "bold" },
  condition: { fontSize: 18, textTransform: "capitalize" },
  details: { fontSize: 16, color: "gray" },
  error: { fontSize: 16, color: "red" },
});

export default WeatherComponent;
