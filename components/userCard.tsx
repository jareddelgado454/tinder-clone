import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Choice from "./Choice";
import TopFilters from "./TypeSearch";

interface UserCardProps {
  user: {
    id: any;
    name: string;
    age: number;
    image: any;
    location: any;
    type: any;
  };
  isFirst: boolean;
  onSwipeOff: () => void;
}

const { width } = Dimensions.get("window");

export default function UserCard({ user, isFirst, onSwipeOff }: UserCardProps) {

  const [showSuperChoice, setShowSuperChoice] = React.useState(false);

  const swipe = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const handleSuperLike = useCallback(() => {
    setShowSuperChoice(true); 
    
    setTimeout(() => {
      setShowSuperChoice(false); 
      onSwipeOff(); 
    }, 1000);
  }, [onSwipeOff]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          const { dx, dy } = gestureState;
          return isFirst && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy);
        },
        onPanResponderMove: (_, { dx, dy, y0 }) => {
          swipe.setValue({ x: dx, y: dy });
          tiltSign.setValue(y0 > 400 ? 1 : -1);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
          const direction = Math.sign(dx);
          const isActionActive = Math.abs(dx) > 100;

          if (isActionActive) {
            Animated.timing(swipe, {
              duration: 200,
              toValue: { x: direction * 500, y: dy },
              useNativeDriver: true,
            }).start(() => onSwipeOff());
          } else {
            Animated.spring(swipe, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
              friction: 5,
            }).start();
          }
        },
      }),
    [isFirst]
  );

  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["-8deg", "0deg", "8deg"],
  });

  const checkOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const noOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const handleChoice = useCallback((direction:any) => {
    Animated.timing(swipe, {
      duration: 600,
      toValue: direction * 500 ,
      useNativeDriver: true,
    }).start(() => onSwipeOff());
  }, [swipe.x, onSwipeOff]);

  const renderChoice = useCallback(
    () => (
      <>
        <Animated.View
          style={[styles.choiceNoContainer, { opacity: noOpacity }]}
        >
          <Choice type="no" />
        </Animated.View>
        <Animated.View
          style={[styles.choiceCheckContainer, { opacity: checkOpacity }]}
        >
          <Choice type="check" />
        </Animated.View>

        {showSuperChoice && (
          <View style={styles.choiceSuperContainer}>
            <Choice type="super" />
          </View>
        )}
      </>
    ),[showSuperChoice]
  );

  return (
    <Animated.View
      style={[styles.cardContainer, isFirst && animatedCardStyle]}
      {...(isFirst ? panResponder.panHandlers : {})}
      pointerEvents="box-none"
    >
      <ImageBackground
        source={user.image}
        style={styles.card}
        imageStyle={styles.image}
      >
        <View style={styles.topContainer}>
          <TopFilters />
        </View>

        <View style={styles.bottomContainer}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.userInfo}>
                {user.name}, {user.age}
              </Text>
              <Text style={styles.LocationInfo}>{user.location}</Text>
            </View>

            <TouchableOpacity
              style={styles.infoButton}
              onPress={() =>
                router.push({
                  pathname: "/modal",
                  params: { userId: user.id, userType: user.type },
                })
              }
            >
              <View
                style={{
                  borderColor: "white",
                  borderWidth: 3,
                  borderRadius: 100,
                  width: 35,
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "black" }}
                >
                  !
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: "#d0bfbf" }]}
              onPress={() => handleChoice(-1)}
            >
              <FontAwesome name="times" color="#fff" size={28} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: "#f7ebf0ff" }]}
              onPress={handleSuperLike}
            >
              <FontAwesome name="heart" color="#ff3a8cff" size={28} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: "#feb5db" }]}
              onPress={() => handleChoice(1)}
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
    height: "100%",
    alignSelf: "center",
    borderRadius: 40,
    zIndex: 50,
    backgroundColor: "#ddd",
    position: "absolute",
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    borderRadius: 40,
  },
  topContainer: {
    padding: 15,
    zIndex: 100,
  },
  bottomContainer: {
    padding: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  userInfo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  LocationInfo: {
    color: "#dad8d8ff",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    zIndex: 200,
  },
  circleButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
  },
  infoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff6b86",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
  },
  choiceNoContainer: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  choiceCheckContainer: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245, 185, 142, 0.4)",
  },
  choiceSuperContainer: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(246, 227, 150, 0.6)", 
    zIndex: 300,
  },

});
