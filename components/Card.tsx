'use client';

import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import TopFilters from './TypeSearch';

const { width, height } = Dimensions.get('window');

interface CardProps {
  name: string;
  age: number;
  image: any;
}

export default function Card({ name, age, image }: CardProps) {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(translateY.value) }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <TopFilters></TopFilters>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}, {age}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: height * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    position: 'absolute',
    alignSelf: 'center',
    top: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: '85%',
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
