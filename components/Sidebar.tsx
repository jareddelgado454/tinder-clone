import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SidebarProps {
  onMenuPress: () => void;
}

export default function Sidebar({ onMenuPress }: SidebarProps) {
  return (
    <View style={styles.sidebar}>
      {/* X en la esquina superior izquierda */}
      <TouchableOpacity style={styles.closeButton} onPress={onMenuPress}>
        <Fontisto name="close-a" size={22} color="white" />
      </TouchableOpacity>

      {/* Perfil */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/fotoPerfil.jpg')} // Asegúrate de tener esta imagen
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Jared, 26</Text>
        <Text style={styles.profileCity}>Miraflores</Text>
      </View>

      {/* Opciones */}
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="male-female" size={24} color="white" style={styles.itemIcon} />
          <Text style={styles.itemText}>Lecafé</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.iconWrapper}>
            <Ionicons name="chatbubble" size={22} color="white" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
          <Text style={styles.itemText}>Mensajes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <FontAwesome name="heart" size={22} color="white" style={styles.itemIcon} />
          <Text style={styles.itemText}>Matches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <FontAwesome name="user" size={22} color="white" style={styles.itemIcon} />
          <Text style={styles.itemText}>Mi Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Entypo name="book" size={22} color="white" style={styles.itemIcon} />
          <Text style={styles.itemText}>Tutorial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="settings-sharp" size={22} color="white" style={styles.itemIcon} />
          <Text style={styles.itemText}>Ajustes</Text>
        </TouchableOpacity>
      </View>

      {/* Cerrar sesión en la parte inferior */}
      <TouchableOpacity style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={22} color="white" style={styles.itemIcon}/>
        <Text style={styles.itemText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#ffb6c1',
    paddingTop: 40, 
    paddingHorizontal: 20,
    color:"white"
  },
  closeButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 10,
    color:"white"
  },
  profileContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 23,
    fontWeight: 'bold',
    color:"white"
  },
  profileCity: {
    fontSize: 15,
    color:"white"
  },
  menuItems: {
    marginTop: 40,
    paddingLeft:20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, 
  },
  itemIcon: {
    marginRight: 15,
    width:30,
    maxWidth:30
  },
  itemText: {
    fontSize: 16,
    color:"white",
    fontWeight:"bold"
  },
  iconWrapper: {
    width: 28,
    height: 28,
    marginRight: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50, // distancia desde las opciones
    paddingVertical: 15,
    paddingLeft:20
  },
});
