'use client';

import Buttons from '@/components/Buttons';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function IndexPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animación del desplazamiento de la card
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

  const users = [
    { name: 'Alice', age: 23, image: require('../assets/images/user1.jpeg') },
    { name: 'Bob', age: 28, image: require('../assets/images/user2.jpg') },
    { name: 'Carol', age: 26, image: require('../assets/images/user3.webp') },
  ];

  return (
    <View style={styles.container}>
      {/* Fondo lateral */}
      <View style={styles.sidebarContainer}>
        <Sidebar />
      </View>

      {/* Contenido principal */}
      <Animated.View
        style={[
          styles.mainContent,
          animatedCardStyle,
          { backgroundColor: isMenuOpen ? '#ffebf0' : '#f2f2f2' },
        ]}
      >
        <Header onMenuPress={handleMenuToggle} onFilterPress={handleFilter} />
        <View style={styles.cardsContainer}>
          {users.map((user, index) => (
            <Card key={index} name={user.name} age={user.age} image={user.image} />
          ))}
        </View>
        <Buttons onLike={() => console.log('Like')} onDislike={() => console.log('Dislike')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb6c1', // color de fondo visible cuando se abre el menú
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
    backgroundColor: '#f2f2f2',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
