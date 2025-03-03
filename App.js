import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Animated } from 'react-native';
import { useState } from 'react';
import SearchScreen from './screens/SearchScreen';

export default function App() {
  const [scrollY] = useState(new Animated.Value(0));

  const statusBarOpacity = scrollY.interpolate({
    inputRange: [0, 250], // Adjust range based on scroll depth
    outputRange: [2, 0],  // Fully visible at top, fades at 150px scroll
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Animated StatusBar Overlay */}
      <Animated.View style={[styles.statusBarOverlay, { opacity: statusBarOpacity }]} />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={30}
      >
        <SearchScreen />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4f6bbb",
  },
  statusBarOverlay: {
   
    top: 0,
    left: 0,
    right: 0,
    height: 5, // Adjust based on notch size
    backgroundColor: "#4f6bbb", // Match background for smooth effect
  },
  scrollView: {
    marginTop: 30,
  },
});
