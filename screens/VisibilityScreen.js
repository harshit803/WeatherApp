import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from "react-native";
import { BarChart } from "react-native-chart-kit";  // Import BarChart
import { Dimensions } from "react-native";

const API_KEY = "c93beb70cddd9f8f49735626f9901fe0";
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=srinagar&units=metric&appid=${API_KEY}`;

const VisibilityCard = () => {
  const [visibility, setVisibility] = useState(null);
  const [visibilityData, setVisibilityData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const forecasts = data.list.slice(0, 6);
        setVisibility(forecasts[0].visibility / 1000);
        setVisibilityData(forecasts.map(item => item.visibility / 1000));
        setTimeLabels(forecasts.map(item => new Date(item.dt * 1000).getHours() + "h"));
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={{padding:15}}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.card}>
        <Text style={styles.label}> <Text style={{fontSize:25}}>V</Text>ISIBILITY</Text>
        <Text style={styles.visibility}>{visibility} km</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <BarChart
            data={{
              labels: timeLabels,
              datasets: [{ data: visibilityData }],
            }}
            width={350}
            
            
            height={220}
            yAxisSuffix=" km"
            chartConfig={{
              backgroundGradientFrom: "#1E3A8A",
              backgroundGradientTo: "#fff",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            fromZero={true} // This ensures the chart starts from zero
          />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  
  card: {
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
  visibility: {
    color: "white",
    fontSize: 36,
  },
  modalContainer: {
     flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:10,
   
     backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
   marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: "white",
    fontSize: 16,
   
  },
});

export default VisibilityCard;
