import { usersDating, usersFriends, usersRelationship } from '@/constants/Users';
import { useCustomTheme } from '@/contexts/themeContext';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import UserCard from './userCard';

const { width, height } = Dimensions.get('window');

export default function CardStack() {
  const { searchType } = useCustomTheme();
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

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

  const handleNextCard = () => {
    setFilteredUsers((prev) => prev.slice(1));
  };

  return (
    <View style={styles.container}>
      {/* Tarjeta siguiente simulada debajo */}

      {/* Tarjeta actual */}
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
          <UserCard
            user={currentUser}
            onDislike={handleNextCard}
            onLike={handleNextCard}
            onCheck={handleNextCard}
          />
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
    paddingTop:15
  },

  /** Card actual */
  card: {
    position: 'relative',
    width: width * 0.85,
    height: height * 0.90,
    borderRadius: 40,
    backgroundColor: '#ddd',
    zIndex: 2,
  },

  /** Tarjeta siguiente */
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
