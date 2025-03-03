import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";


const API_KEY = "c93beb70cddd9f8f49735626f9901fe0";
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=&units=metric&appid=${API_KEY}`;

const WindCard = () => {
  const [windSpeed, setWindSpeed] = useState(null);
  const [gustSpeed, setGustSpeed] = useState(null);
  const [windDirection, setWindDirection] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch wind data from OpenWeather API
  useEffect(() => {
    const fetchWindData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=$chennai&appid=${API_KEY}&units=imperial`
        );
        const data = await response.json();
        setWindSpeed(data.wind.speed);
        setGustSpeed(data.wind.gust || 0);
        setWindDirection(data.wind.deg);
      } catch (error) {
        console.error("Error fetching wind data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWindData();
  }, []);

  return (
    <LinearGradient colors={["#1976D2", "#64B5F6"]} style={styles.card}>
      <Text style={styles.title}>🌬 WIND</Text>

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View style={styles.content}>
          {/* Wind Details */}
          <View style={styles.details}>
            <Text style={styles.label}>Wind</Text>
            <Text style={styles.value}>{windSpeed} mph</Text>
            <Text style={styles.label}>Gusts</Text>
            <Text style={styles.value}>{gustSpeed} mph</Text>
            <Text style={styles.label}>Direction</Text>
            <Text style={styles.value}>{windDirection}° NW</Text>
          </View>

          {/* Wind Compass UI */}
          <View style={styles.compassContainer}>
            <Svg height="100" width="100" viewBox="0 0 100 100">
              {/* Outer Circle */}
              <Circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
              {/* Direction Labels */}
              <SvgText x="50" y="12" fill="white" fontSize="10" textAnchor="middle">N</SvgText>
              <SvgText x="50" y="95" fill="white" fontSize="10" textAnchor="middle">S</SvgText>
              <SvgText x="5" y="55" fill="white" fontSize="10" textAnchor="middle">W</SvgText>
              <SvgText x="95" y="55" fill="white" fontSize="10" textAnchor="middle">E</SvgText>

              {/* Wind Direction Arrow */}
              <Line
                x1="50"
                y1="50"
                x2={50 + 30 * Math.cos((windDirection - 90) * (Math.PI / 180))}
                y2={50 + 30 * Math.sin((windDirection - 90) * (Math.PI / 180))}
                stroke="white"
                strokeWidth="3"
              />
            </Svg>
            <Text style={styles.windSpeedText}>{windSpeed} mph</Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 15,
    width: 300,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "white",
    opacity: 0.8,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  compassContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  windSpeedText: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
  },
});

export default WindCard;
