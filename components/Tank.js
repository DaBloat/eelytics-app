import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const TOTAL_TANK_HEIGHT_CM = 15;
const MINIMUM_THRESHOLD_CM = 2;

const Tank = ({ tank, onOpenModal, styles }) => {
  // Use useRef to hold the animated value, preventing it from being re-created on re-renders
  const animatedLevel = useRef(new Animated.Value(tank.level)).current;

  useEffect(() => {
    // Animate the water level whenever the tank.level prop changes
    Animated.timing(animatedLevel, {
      toValue: tank.level,
      duration: 2000, // 2-second animation for a smooth transition
      useNativeDriver: false, // 'height' is a layout property, so we can't use the native driver
    }).start();
  }, [tank.level]); // This effect runs only when tank.level changes

  // Interpolate the animated value to a percentage string for the height style
  const waterLevelPercentage = animatedLevel.interpolate({
    inputRange: [0, TOTAL_TANK_HEIGHT_CM],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp', // Ensure the output doesn't go beyond 0% or 100%
  });

  let tankBorderColor = 'green';
  if (
    tank.level >= TOTAL_TANK_HEIGHT_CM ||
    tank.level <= MINIMUM_THRESHOLD_CM ||
    tank.level !== tank.maintainedLevelCm
  ) {
    tankBorderColor = 'red';
  }

  return (
    <TouchableOpacity style={styles.section} onPress={() => onOpenModal(tank)}>
      <View style={[styles.tankVisualContainer, { borderColor: tankBorderColor }]}>
        <Animated.View style={[styles.waterLevel, { height: waterLevelPercentage }]} />
        <Text style={styles.waterLevelText}>{`${tank.level} cm`}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{tank.name}</Text>
        <Text style={styles.tankDetailsText}>{tank.description}</Text>
        <Text style={styles.tankDetailsText}>{`Accepts: ${tank.acceptedGroups.join(', ')}`}</Text>
        <Text style={styles.tankDetailsText}>{`Maintain: ${tank.maintainedLevelCm} cm`}</Text>
        <Text style={styles.tankDetailsText}>
          Population: {tank.population}
        </Text>
        <Text style={styles.tankDetailsText}>
          MODE: <Text style={[styles.maintainModeText, { color: tank.mode === 'HOUSING' ? 'green' : 'red' }]}>{tank.mode}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tank;