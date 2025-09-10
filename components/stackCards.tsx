import { usersDating, usersFriends, usersRelationship } from '@/constants/Users';
import { useModalAction } from '@/contexts/swipeContext';
import { useCustomTheme } from '@/contexts/themeContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  View
} from 'react-native';
import UserCard from './userCard';

const { width, height } = Dimensions.get('window');

export default function CardStack() {
  const { action, setAction } = useModalAction();
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

  const removeTopCard = useCallback(() => {
    setFilteredUsers((prev) => prev.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  useEffect(() => {
    if (searchType === 'citas') {
      setFilteredUsers(usersDating);
    } else if (searchType === 'amistad') {
      setFilteredUsers(usersFriends);
    } else if (searchType === 'relacion') {
      setFilteredUsers(usersRelationship);
    }
  }, [searchType]);

  const handleActionFromModal = useCallback(() => {
    if (!action) return;

    if (action === -1) {
      // Ejecutar swipe "No"
      Animated.timing(swipe, {
        toValue: { x: -500, y: 0 },
        duration: 400,
        useNativeDriver: true,
      }).start(() => removeTopCard());
    } else if (action === 1) {
      // Ejecutar swipe "Check"
      Animated.timing(swipe, {
        toValue: { x: 500, y: 0 },
        duration: 400,
        useNativeDriver: true,
      }).start(() => removeTopCard());
    } else if (action === "super") {
      // Ejecutar swipe "Superlike"
      Animated.timing(swipe, {
        toValue: { x: 0, y: -500 },
        duration: 400,
        useNativeDriver: true,
      }).start(() => removeTopCard());
    }

    setAction(null); // limpiar acción
  }, [action, swipe, removeTopCard, setAction]);

  // Detectamos acción del modal
  useEffect(() => {
    handleActionFromModal();
  }, [action]);

  const currentUser = filteredUsers[0];
  const nextUser = filteredUsers[1];

  return (
    <View style={styles.container}>
      {currentUser && (
        <Animated.View style={[styles.card]}>
           {nextUser && (
                <View style={styles.nextCard}>
                <Image
                    source={nextUser.image}
                    style={styles.nextCardImage}
                    resizeMode="cover"
                />
                </View>
            )}
            {
              filteredUsers.map((user, index) => {
                      const isFirst = index === 0;
                      return (
                        <UserCard
                          key={user.id}
                          user={user}
                          isFirst={isFirst}
                          onSwipeOff={removeTopCard}
                        />
                      );
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
