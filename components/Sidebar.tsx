import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Sidebar() {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Menú</Text>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Configuración</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#ffb6c1', // rosado claro
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 18,
  },
});
