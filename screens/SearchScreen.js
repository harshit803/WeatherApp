import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, Button,Image, StyleSheet, FlatList, TouchableOpacity,  Dimensions, ActivityIndicator
} from "react-native";
import WeatherScreen from "./HomeScreen";


let data = { city: "encodedCity" };

const { width, height } = Dimensions.get("window");


const SearchScreen = () => {
  const [city, setCity] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // useEffect(()=>{
  //   console.log("tar1",weather);
  // },[weather])
  // useEffect(()=>{

  // },[city])

  const API_KEY = "c93beb70cddd9f8f49735626f9901fe0";

  // Fetch weather data (GET request)
  const fetchWeather = async (processedCity) => {
    setLoading(true);
    setError("");
   
    try {
      const encodedCity = encodeURIComponent(processedCity);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.cod === 200) {
        setWeather(data);
      }
      else {
        setWeather(null);
       
      
       
       setError(`No weather data found for "${processedCity}"`);
      }
      if (data.length > 0) {
        console.log("Valid city:", data[0].display_name);
        return true;
      } else {
        console.log("Invalid city");
        return false;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const processCityAndFetchWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Fetch weather directly (GET request)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.cod === 200) {
        setWeather(data);
      }
     
         else {
       // setError(`No weather data found for "${city}". Please enter a valid city.`);

        setWeather(null);
        setError( <Image
          source={{
            uri: 'https://ouch-cdn2.icons8.com/M_Msnux4rbOE_1KYHxLwttTJz3MAUKl6fD5WGW3ZntE/rs:fit:608:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTYy/L2M3MzgwMGFjLTVl/NzAtNDU3Yy04MjRl/LTdkMTNmNzQwMjY1/MS5zdmc.png',
          }}
          style={{width: 300, height: 300,alignSelf:"center"}}
        />);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  // Select a city from suggestions
  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setWeather(null);
    setError("");
  };

  // Show suggestions as user types
  const handleInputChange = (text) => {
    setCity(text);

  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label,]}>Enter City Name:</Text>
      
        <TextInput

          style={styles.input}
          placeholder="Search for a Country/City🌏"
          value={city}
          onChangeText={handleInputChange}
        />
        <View style={[styles.buttonContainer]}>
        <TouchableOpacity onPress={processCityAndFetchWeather}>
          <Text style={{fontSize:28,}}>🔍</Text>
        </TouchableOpacity>
          
        
      </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectCity(item)} style={styles.suggestionItem}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}





      {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.loadingText} />}

      {weather && (
        <View style={styles.weatherContainer}>

          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, padding: 10 }}>
            <Text style={styles.weatherText}>🌡️ Temperature: {weather?.main?.temp}°C</Text>
            <Text style={styles.weatherText}>☁️ Weather: {weather?.weather[0]?.description}</Text>

            <Text style={styles.weatherText}>💧 Humidity: {weather?.main?.humidity}%</Text>

          </View>
          <WeatherScreen weatherProp={weather} />

        </View>
      )}

      {error && !loading && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#4f6bbb",
    justifyContent: "center",
  },
  label: {
    fontSize: width * 0.05,
    color: "white",
    padding: 20,
    marginTop: 10,
    textAlign: "center",

  },
  input: {
    backgroundColor: "white",
    color: "	#1e3a8a",
    padding: 10,
    borderRadius: 10,
    fontSize: width * 0.04,
    marginBottom: 20,
  },
  suggestionItem: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    width: width * 0.3,
    alignSelf: "center",
    justifyContent:"flex-end",
    borderRadius: 10,
    flexDirection: "row",
    position:"absolute",
    right:15,
    top:85,






  },
  loadingText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,

  },
  weatherContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  weatherText: {
    fontSize: width * 0.04,
    marginBottom: 5,
    color: "white",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchScreen;
