'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CardStack from '@/components/stackCards';
import { useCustomTheme } from '@/contexts/themeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function IndexPage() {
  const { isMenuOpen, setIsMenuOpen, gradientColors } = useCustomTheme();

  // Animación para mover la tarjeta cuando el menú se abre
  const translateX = useSharedValue(0);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    borderRadius: isMenuOpen ? 20 : 0,
    overflow: 'hidden',
  }));

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    translateX.value = withSpring(!isMenuOpen ? width * 0.6 : 0, {
      damping: 15,
    });
  };

  const handleFilter = () => {
    console.log('Filtros presionados');
  };

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {isMenuOpen && (
        <View style={styles.sidebarContainer}>
          <Sidebar onMenuPress={handleMenuToggle}/>
        </View>
      )}


      {/* Contenido principal animado */}
      <Animated.View style={[styles.mainContent, animatedCardStyle]}>
        {!isMenuOpen 
          ? <Header onMenuPress={handleMenuToggle} onFilterPress={handleFilter} />
          : <View style={{width:"100%", height:80}}></View>
        }
        <View style={styles.cardsContainer}>
          <CardStack />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarContainer: {
    position: 'absolute',
    width: width * 0.6,
    height: '100%',
    backgroundColor: '#ffb6c1',
  },
  mainContent: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",     
    justifyContent: "flex-start", 
  }
});
