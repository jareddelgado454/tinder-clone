import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TopFilters from './TypeSearch';

interface UserCardProps {
  user: {
    id: any;
    name: string;
    age: number;
    image: any;
    location: any;
    type: any;
  };
  onDislike: () => void;
  onLike: () => void;
  onCheck: () => void;
}

const { width } = Dimensions.get('window');
const ANIMATION_DURATION = 900;

export default function UserCard({ user, onDislike, onLike, onCheck }: UserCardProps) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacityOverlay = useSharedValue(0);
  const cardOpacity = useSharedValue(1);
  const overlayText = useSharedValue('');

  const animateCard = (direction: 'left' | 'right' | 'center') => {
    if (direction === 'left') {
      overlayText.value = 'X';
      cardOpacity.value = withTiming(0.7, { duration: 200 });
      translateX.value = withTiming(-width, { duration: ANIMATION_DURATION });
      rotate.value = withTiming(-15, { duration: ANIMATION_DURATION });
      opacityOverlay.value = withTiming(1, { duration: ANIMATION_DURATION }, () =>
        runOnJS(onDislike)()
      );
    } else if (direction === 'right') {
      overlayText.value = '✔';
      cardOpacity.value = withTiming(0.7, { duration: 200 });
      translateX.value = withTiming(width, { duration: ANIMATION_DURATION });
      rotate.value = withTiming(15, { duration: ANIMATION_DURATION });
      opacityOverlay.value = withTiming(1, { duration: ANIMATION_DURATION }, () =>
        runOnJS(onCheck)()
      );
    } else {
      overlayText.value = 'SUPER LIKE';
      cardOpacity.value = withTiming(0.7, { duration: 200 });
      opacityOverlay.value = withTiming(1, { duration: ANIMATION_DURATION }, () =>
        runOnJS(onLike)()
      );
    }
  };

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${rotate.value}deg` },
      { scale: scale.value },
    ],
    opacity: cardOpacity.value,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacityOverlay.value,
  }));

  return (
    <Animated.View style={[styles.cardContainer, cardStyle]}>
      <ImageBackground source={user.image} style={styles.card} imageStyle={styles.image}>
        <View style={styles.topContainer}>
          <TopFilters />
        </View>

        {/* Overlay grande centrado, NO bloquea toques */}
        <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="none">
          <Text style={styles.overlayText}>{overlayText.value}</Text>
        </Animated.View>

        <View style={styles.bottomContainer}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.userInfo}>
                {user.name}, {user.age}
              </Text>
              <Text style={styles.LocationInfo}>{user.location}</Text>
            </View>

            <TouchableOpacity
              style={styles.infoButton}
              onPress={() =>
                router.push({ pathname: '/modal', params: { userId: user.id, userType: user.type } })
              }
            >
              <View
                style={{
                  borderColor: 'white',
                  borderWidth: 3,
                  borderRadius: 100,
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'black' }}>!</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: '#d0bfbf' }]}
              onPress={() => animateCard('left')}
            >
              <FontAwesome name="times" color="#fff" size={28} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: '#f7ebf0ff' }]}
              onPress={() => animateCard('center')}
            >
              <FontAwesome name="heart" color="#ff3a8cff" size={28} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: '#feb5db' }]}
              onPress={() => animateCard('right')}
            >
              <FontAwesome name="check" color="#fff" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.85,
    height: '100%',
    alignSelf: 'center',
    borderRadius: 40,
    zIndex: 50,
    backgroundColor: '#ddd',
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 40,
  },
  topContainer: {
    padding: 15,
  },
  bottomContainer: {
    padding: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  userInfo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  LocationInfo: {
    color: '#dad8d8ff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  circleButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff6b86',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  overlayText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
});
