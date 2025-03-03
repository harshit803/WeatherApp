import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";



const API_KEY = "c93beb70cddd9f8f49735626f9901fe0";
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=panipat&units=metric&appid=${API_KEY}`;

const WeatherScreen = ({weatherProp, city}) => {

  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        // const currentWeather = data.list[0];
        setWeather({
          // city: data?.city?.name,
          city: weatherProp?.name,
          temperature: Math.round(weatherProp?.main?.temp) + "°C",
          condition: weatherProp?.weather[0]?.main,
          high: Math.round(weatherProp?.main?.temp_max) + "°C",
          low: Math.round(weatherProp?.main?.temp_min) + "°C",
        });
  
        // Extract hourly forecast
        const forecastData = data.list.slice(0, 24).map((hour) => ({
          time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" ,hour12:true}),
          temp: Math.round(hour.main.temp) + "°C",
          icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
        }));
  
        // Group data by day and find min/max temps
        const dailyForecast = {};
        data.list.forEach((entry) => {
          const date = new Date(entry.dt * 1000).toLocaleDateString();
          if (!dailyForecast[date]) {
            dailyForecast[date] = { min: entry.main.temp, max: entry.main.temp };
          } else {
            dailyForecast[date].min = Math.min(dailyForecast[date].min, entry.main.temp);
            dailyForecast[date].max = Math.max(dailyForecast[date].max, entry.main.temp);
          }
        });
       
  
        // Format daily forecast for display
        const formattedForecast = Object.entries(dailyForecast)
          .slice(0, 7) // Show next 5 days
          .map(([date, temps], index) => ({
            day: index === 0 ? "Today" : new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
            min: Math.round(temps.min) + "°C",
            max: Math.round(temps.max) + "°C",
          }));
  
        setHourlyForecast(forecastData);
        // setForecast(formattedForecast);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [weatherProp]);
  

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.city}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        <Text style={styles.city}>{weather?.city}</Text>
        <Text style={styles.temperature}>{weather?.temperature}</Text>
        <Text style={styles.condition}>{weather?.condition}</Text>
        <Text style={styles.details}><Text style={{fontSize:23}}>
        H:</Text> {weather.high}  
        <Text  style={{fontSize:23}}>  L:</Text> {weather.low}</Text>
      </View>

    

     <View  style={styles.infoContainer}>
     <ScrollView horizontal style={styles.hourlyContainer}
       showsHorizontalScrollIndicator={false}
     
      
      >
        
        {hourlyForecast.map((hour, index) => (
          <View key={index} style={styles.hourlyItem}>
            <Text style={styles.hourText}>{hour?.time}</Text>
            <Image source={{ uri: hour?.icon }} style={styles.hourIcon} />
            <Text style={styles.hourTemp}>{hour?.temp}</Text>
          </View>
        ))}
      </ScrollView>
     </View>

 <View style={styles.forecastContainer}>
 <View style={{ flexDirection:"row",borderBottomWidth:0.3,borderColor:"#fffff2"}}>
 
 <Text style={{color:"white",padding:5,fontSize:13}}>10-DAY FORECAST</Text>
    </View>
        {["Today","Tue","Sun","Sat","Fri","Thru"].map((day, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.forecastIcon}>{weather?.icon}</Text>
            <Text style={styles.tempText}>{weather.low} - {weather.high}</Text>
          </View>
        ))}
      </View>
      

    </View>
  );
};

const styles = StyleSheet.create({
 container: { },
  weatherContainer: { alignItems: "center", marginVertical: 20 },
  city: { fontSize: 28, color: 'white' },
  icon: { width: 100, height: 100 },
  temperature: { fontSize: 45, color: 'white' },
  condition: { fontSize: 20, color: 'white',  },
  details: { fontSize: 15, color: 'white' },
  infoContainer: { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, marginVertical: 10 },
  infoText: { color: 'white', textAlign: 'center' },
  hourlyContainer: { flexDirection: 'row', marginVertical: 5, },
  hourlyItem: { alignItems: 'center', marginHorizontal: 15 },
  hourText: { color: 'white', fontSize: 16 },
  hourIcon: { width: 40, height: 40 },
  hourTemp: { color: 'white', fontSize: 18,  },
  forecastContainer: { backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 10, borderRadius: 10 },
  forecastItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  forecastIcon: { width: 40, height: 40 },
  dayText: { color: 'white', fontSize: 18 },
  tempText: { color: 'white', fontSize: 18,  },
  icon:{color: 'white', fontSize: 18}
});

export default WeatherScreen;
