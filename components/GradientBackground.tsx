import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ColorValue, StyleSheet } from 'react-native';

type GradientType = 'amistad' | 'citas' | 'relacion' | 'menu';

interface Props {
  type: GradientType;
  children: React.ReactNode;
}

const gradients: Record<GradientType, readonly [ColorValue, ColorValue]> = {
  amistad: ['#A066FF', '#6ECFFF'],   
  citas: ['#FFB347', '#FF6EC7'],    
  relacion: ['#FF6F61', '#FF1493'], 
  menu: ['#FF8FAB', '#FF5E78'],
};

export default function GradientBackground({ type, children }: Props) {
  return (
    <LinearGradient colors={gradients[type]} style={styles.background}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
