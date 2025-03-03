import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const API_KEY = "c93beb70cddd9f8f49735626f9901fe0";
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=gurugram&units=metric&appid=${API_KEY}`;

const HumidityCard = ({humidityProp}) => {
  const [humidity, setHumidity] = useState(null);
  const [dewPoint, setDewPoint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const firstForecast = data.list[0];
        setHumidity(firstForecast.main.humidityProp);
        setDewPoint(firstForecast.main.temp - ((100 - firstForecast.main.humidity) / 5));
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={{padding:15}}>
    <View style={styles.infoContainer}>
      <Text style={styles.label}> <Text style={{fontSize:25,}}>H</Text>UMIDITY</Text>
      <Text style={styles.humidity}>{humidityProp}%</Text>
      <Text style={styles.dewPoint}>The dew point is {Math.round(dewPoint)}°</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  infoContainer: { 
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
     padding: 10,
      borderRadius: 10,
       marginVertical: 10,
    width:160,
    height:160
 },

  label: {
    color: "white",
    fontSize: 12,
    marginBottom: 5,
  },
  humidity: {
    color: "white",
    fontSize: 36,
    // fontWeight: "bold",
  },
  dewPoint: {
    color: "white",
    fontSize: 14,
    marginTop:30,
  },
});

export default HumidityCard;
