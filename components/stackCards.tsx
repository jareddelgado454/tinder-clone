import { usersDating, usersFriends, usersRelationship } from '@/constants/Users';
import { useCustomTheme } from '@/contexts/themeContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View
} from 'react-native';
import UserCard from './userCard';

const { width, height } = Dimensions.get('window');

export default function CardStack() {
  const { searchType } = useCustomTheme();
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(()=>{
    if(!filteredUsers.length){
      if (searchType === 'citas') {
        setFilteredUsers(usersDating);
      } else if (searchType === 'amistad') {
        setFilteredUsers(usersFriends);
      } else if (searchType === 'relacion') {
        setFilteredUsers(usersRelationship);
      }
    }
  },[filteredUsers.length]);

  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder : () => true,
    onPanResponderMove : (_, {dx, dy, y0}) => {
      swipe.setValue({ x:dx, y:dy });
      tiltSign.setValue(y0 > 400 ? 1 : -1);
    },
    onPanResponderRelease : (_, {dx, dy}) => {

      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if(isActionActive){
        Animated.timing(swipe,{
          duration: 200,
          toValue: {
            x: direction*500,
            y: dy, 
          },
          useNativeDriver : true,
        }).start(removeTopCard);
      }else {
        Animated.spring(swipe, {
          toValue : {
            x:0,
            y:0,
          },
          useNativeDriver : true,
          friction : 5
        }).start();
      }
    }
  });

  const removeTopCard = useCallback(() => {
    swipe.setValue({ x: 0, y: 0 });
    tiltSign.setValue(1);
    setFilteredUsers((prev) => prev.slice(1));
  }, [swipe, tiltSign]);

  useEffect(() => {
    if (searchType === 'citas') {
      setFilteredUsers(usersDating);
    } else if (searchType === 'amistad') {
      setFilteredUsers(usersFriends);
    } else if (searchType === 'relacion') {
      setFilteredUsers(usersRelationship);
    }
  }, [searchType]);

  const currentUser = filteredUsers[0];
  const nextUser = filteredUsers[1];

  return (
    <View style={styles.container}>
      {currentUser && (
        <Animated.View style={[styles.card]}>
           {/* {nextUser && (
                <View style={styles.nextCard}>
                <Image
                    source={nextUser.image}
                    style={styles.nextCardImage}
                    resizeMode="cover"
                />
                </View>
            )} */}
            {
              filteredUsers.map((user, index) => {
                console.log("este es el index ", index);
                const isFirst = index===0;
                const dragHandlers = isFirst ? panResponder.panHandlers : {};
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    tiltSign={isFirst ? tiltSign : undefined}
                    swipe={isFirst ? swipe : undefined}
                    isFirst={isFirst}
                    {...(isFirst ? dragHandlers : {})}
                  /> 
                )
              }).reverse()
            }
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop:15,
    paddingBottom:40,
  },

  card: {
    position: 'relative',
    width: width * 0.85,
    height: "100%",
    borderRadius: 40,
    backgroundColor: '#ddd',
    zIndex: 2,
  },

  nextCard: {
    position: 'absolute',
    width: width * 0.75,
    height: "100%",
    borderRadius: 40,
    overflow: 'hidden',
    top: -20,                  
    left: (width * 0.80 - width * 0.70) / 2, 
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  /** Imagen superior de la tarjeta siguiente */
  nextCardImage: {
    width: '100%',
    height: "100%", 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'flex-start',
  },
});
