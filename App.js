import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const AccelerometerComponent = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [isAccelerometerActive, setAccelerometerActive] = useState(false);

  useEffect(() => {
    let subscription;
    if (isAccelerometerActive) {
      subscription = Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isAccelerometerActive]);

  const startStopAccelerometer = () => {
    setAccelerometerActive((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Accelerometer</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.box}>
          <Text>X: {data.x.toFixed(2)}</Text>
        </View>
        <View style={styles.box}>
          <Text>Y: {data.y.toFixed(2)}</Text>
        </View>
        <View style={styles.box}>
          <Text>Z: {data.z.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={startStopAccelerometer}>
          <Text style={styles.buttonText}>
            {isAccelerometerActive ? 'Stop Accelerometer' : 'Start Accelerometer'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
  },
  content: {
    flex: 0.6,
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.2,
    backgroundColor: 'lightcoral',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default AccelerometerComponent;
