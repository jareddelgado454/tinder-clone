import { usersDating, usersFriends, usersRelationship } from '@/constants/Users';
import { UserType } from '@/constants/UserType';
import { useModalAction } from '@/contexts/swipeContext';
import { FontAwesome } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export default function Modal() {
  const insets = useSafeAreaInsets();
  const { userId, userType } = useLocalSearchParams();
  const id = Number(userId);

  const { setAction } = useModalAction();

  let userList: UserType[] = [];
  if (userType === 'citas') userList = usersDating;
  else if (userType === 'amistad') userList = usersFriends;
  else if (userType === 'relacion') userList = usersRelationship;

  const user = userList.find(u => u.id === id);
  if (!user) return <Text>User not found</Text>;

  const [expanded, setExpanded] = useState(true);
  const panelHeight = useSharedValue(expanded ? height * 0.55 : 150); 

  const togglePanel = () => {
    setExpanded(!expanded);
    panelHeight.value = withTiming(expanded ? 150 : height * 0.55, { duration: 300 });
  };

  const panelAnimation = useAnimatedStyle(() => ({
    height: panelHeight.value,
    bottom: 0,
  }));

  const imageAnimation = useAnimatedStyle(() => ({
    height: withTiming(height, { duration: 300 }),
  }));

  const handlePressChoice = (choice: -1 | 1 | "super") => {
    setAction(choice);   
    router.back();       
  };

  const tagColors = {
    amistad: ['#8c80e6', '#7589e2'] as const,
    citas: ['#feb245', '#fe7981'] as const,
    relacion: ['#ff718b', '#ff718b'] as const,
  };
  const gradientColors = tagColors[userType as keyof typeof tagColors] || ['#ccc', '#ccc'] as const;

  const interests = ['Música', 'Viajes', 'Deporte', 'Cine'];
  const selfTags = ['Femme'];

  return (
    <View style={styles.container}>
      <Animated.Image source={user.image} style={[styles.image, imageAnimation]} resizeMode="cover" />

      <View style={styles.topButtons}>
        <TouchableOpacity onPress={() => router.back()}>
          <Fontisto name="close-a" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="ellipsis-v" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <Animated.View style={[styles.detailPanel, panelAnimation]}>
        <TouchableOpacity style={styles.toggleButton} onPress={togglePanel}>
          <FontAwesome name={expanded ? 'angle-down' : 'angle-up'} size={35} color="#fff" />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name} {user.lastName}, {user.age}</Text>
          <Text style={styles.location}>{user.location}</Text>

          {expanded && (
            <>
              <Text style={styles.subtitle}>Intereses</Text>
              <View style={styles.tagsContainer}>
                {interests.map(tag => (
                  <LinearGradient
                    key={tag}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={gradientColors}
                    style={styles.tag}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </LinearGradient>
                ))}
              </View>

              <Text style={styles.subtitle}>Me considero</Text>
              <View style={styles.tagsContainer}>
                {selfTags.map(tag => (
                  <LinearGradient
                    key={tag}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={gradientColors}
                    style={styles.tag}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </LinearGradient>
                ))}
              </View>
            </>
          )}

          {expanded && (
            <View style={[styles.actionButtons, { marginTop: 20, paddingBottom: insets.bottom + 10 }]}>
              <TouchableOpacity onPress={() => handlePressChoice(-1)} style={[styles.circleButton, { backgroundColor: '#d0bfbf' }]}>
                <FontAwesome name="times" color="#fff" size={28} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePressChoice("super")} style={[styles.circleButton, { backgroundColor: '#f7ebf0ff' }]}>
                <FontAwesome name="heart" color="#ff3a8cff" size={28} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePressChoice(1)} style={[styles.circleButton, { backgroundColor: '#feb5db' }]}>
                <FontAwesome  name="check" color="#fff" size={28} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  topButtons: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  detailPanel: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 5,
    flexDirection: 'column',
  },
  toggleButton: {
    position: 'absolute',
    top: -25,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#fe5c9c',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  userInfo: {
    marginTop: 20,
    width: '100%',
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  circleButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
