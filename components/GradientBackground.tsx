import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ColorValue, StyleSheet } from 'react-native';

type GradientType = 'amistad' | 'citas' | 'relacion' | 'menu';

interface Props {
  type: GradientType;
  children: React.ReactNode;
}

const gradients: Record<GradientType, readonly [ColorValue, ColorValue]> = {
  amistad: ['#A066FF', '#6ECFFF'],   // Lila → Celeste
  citas: ['#FFB347', '#FF6EC7'],     // Amarillo anaranjado → Rosado
  relacion: ['#FF6F61', '#FF1493'],  // Coral → Fucsia
  menu: ['#FF8FAB', '#FF5E78'],      // Fondo rosado cuando el menú está abierto
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
