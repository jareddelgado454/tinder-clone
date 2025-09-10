import { usersDating, usersFriends, usersRelationship } from '@/constants/Users';
import { UserType } from '@/constants/UserType';
import { FontAwesome } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { height, width: screenWidth } = Dimensions.get('window');

export default function Modal() {
  const { userId, userType } = useLocalSearchParams();
  const id = Number(userId);

  let userList: UserType[] = [];
  if (userType === 'citas') userList = usersDating;
  else if (userType === 'amistad') userList = usersFriends;
  else if (userType === 'relacion') userList = usersRelationship;

  const user = userList.find(u => u.id === id);
  if (!user) return <Text>User not found</Text>;

  const [expanded, setExpanded] = useState(true);
  const panelHeight = useSharedValue(400);

  const togglePanel = () => {
    setExpanded(!expanded);
    panelHeight.value = withTiming(expanded ? 200 : 400, { duration: 300 });
  };

  const panelAnimation = useAnimatedStyle(() => ({
    height: panelHeight.value,
    top: expanded ? height * 0.5 - 25 : height * 0.75,
  }));

  const imageAnimation = useAnimatedStyle(() => ({
    height: withTiming(expanded ? height * 0.6 : height, { duration: 300 }),
  }));

  // Definir colores de los gradientes según el tipo
  const tagColors = {
    amistad: ['#8c80e6', '#7589e2'] as const,
    citas: ['#feb245', '#fe7981'] as const,
    relacion: ['#ff718b', '#ff718b'] as const,
  };
  const gradientColors = tagColors[userType as keyof typeof tagColors] || ['#ccc', '#ccc'] as const;

  // Intereses y "Me considero"
  const interests = ['Música', 'Viajes', 'Deporte', 'Cine'];
  const selfTags = ['Femme'];

  return (
    <View style={styles.container}>
      {/* Imagen de perfil */}
      <Animated.Image source={user.image} style={[styles.image, imageAnimation]} />

      {/* Botones sobre la imagen */}
      <View style={styles.topButtons}>
        <TouchableOpacity onPress={() => router.back()}>
            <Fontisto name="close-a" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome name="ellipsis-v" size={24} color="#050505ff" />
        </TouchableOpacity>
      </View>

      {/* Panel inferior */}
      <Animated.View style={[styles.detailPanel, panelAnimation]}>
        {/* Botón circular para mover el panel */}
        <TouchableOpacity style={styles.toggleButton} onPress={togglePanel}>
          <FontAwesome name={expanded ? 'angle-down' : 'angle-up'} size={35} color="#fff" />
        </TouchableOpacity>

        {/* Información del usuario */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name} {user.lastName}, {user.age}</Text>
          <Text style={styles.location}>{user.location}</Text>

          {expanded && (
            <>
              {/* Intereses */}
              <Text style={styles.subtitle}>Intereses</Text>
              <View style={styles.tagsContainer}>
                {interests.map((tag) => (
                  <LinearGradient 
                    key={tag} 
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }} 
                    colors={gradientColors} style={styles.tag}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </LinearGradient>
                ))}
              </View>

              {/* Me considero */}
              <Text style={styles.subtitle}>Me considero</Text>
              <View style={styles.tagsContainer}>
                {selfTags.map((tag) => (
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
        </View>

        {/* Botones de acción pegados al fondo */}
        {expanded && (
          <View style={[
            styles.actionButtons,
            { left: (screenWidth - 300) / 2 }
          ]}>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#d0bfbf' }]}>
              <FontAwesome name="times" color="#fff" size={28} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#f7ebf0ff' }]}>
              <FontAwesome name="heart" color="#ff3a8cff" size={28} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleButton, { backgroundColor: '#feb5db' }]}>
              <FontAwesome name="check" color="#fff" size={28} />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%",
    backgroundColor: 'red',
  },
  image: {
    width: '100%',
  },
  topButtons: {
    position: 'absolute',
    top: 45,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  topButtonText: {
    color: '#050505ff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailPanel: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 0,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 5,
    flexDirection: "column",
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
    alignItems: 'flex-start',
    width: "100%",
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
    position: 'absolute',
    bottom: 30,
    width: 300,
    marginBottom:20,
  },
  circleButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
