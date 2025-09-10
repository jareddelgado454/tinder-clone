import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Choice from './Choice';
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
  swipe : any;
  tiltSign : any;
  isFirst : boolean;
}

const { width } = Dimensions.get('window');
const ANIMATION_DURATION = 900;

export default function UserCard({ user,
  tiltSign, swipe, isFirst, ...rest }: UserCardProps) {

  const rotate = swipe && tiltSign
    ? Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['-8deg', '0deg', '8deg'],
      })
    : '0deg';


  const checkOpacity = swipe
    ? swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      })
    : new Animated.Value(0);

  const noOpacity = swipe
    ? swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      })
    : new Animated.Value(0);


  const animatedCardStyle = isFirst && swipe
  ? { transform: [...swipe.getTranslateTransform(), { rotate }] }
  : {};

  const renderChoice = useCallback(()=>{
    return (
      <>
        <Animated.View style={[styles.choiceNoContainer, { opacity: noOpacity}]}>
          <Choice type={"no"}/>
        </Animated.View>
        {/* <View style={styles.choiceSuperContainer}>
          <Choice type={"super"}/>
        </View> */}
        <Animated.View style={[styles.choiceCheckContainer, { opacity: checkOpacity }]}>
          <Choice type={"check"}/>
        </Animated.View>
      </>
    );
  },[]);

  return (
    <Animated.View style={[styles.cardContainer, isFirst && animatedCardStyle]} {...(isFirst ? rest : {})}>
      <ImageBackground source={user.image} style={styles.card} imageStyle={styles.image}>
        <View style={styles.topContainer}>
          <TopFilters />
        </View>

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
              onPress={() => {}}
            >
              <FontAwesome name="times" color="#fff" size={28} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: '#f7ebf0ff' }]}
              onPress={() => {}}
            >
              <FontAwesome name="heart" color="#ff3a8cff" size={28} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: '#feb5db' }]}
              onPress={() => {}}
            >
              <FontAwesome name="check" color="#fff" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {isFirst && renderChoice()}
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
    position:"absolute"
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
  choiceNoContainer: {
    position:"absolute",
    flex:1,
    width:"100%",
    height:"100%",
    borderRadius:40,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  choiceSuperContainer: {
    position:"absolute",
    flex:1,
    width:"100%",
    height:"100%",
    borderRadius:40,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(245, 185, 142, 0.4)",
  },
  choiceCheckContainer: {
    position:"absolute",
    flex:1,
    width:"100%",
    height:"100%",
    borderRadius:40,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "rgba(245, 185, 142, 0.4)",
  },
});
