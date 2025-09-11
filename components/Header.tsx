import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  onMenuPress: () => void;
  onFilterPress: () => void;
}

export default function Header({ onMenuPress, onFilterPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="#ffffffff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onFilterPress}>
        <Feather name="filter" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
});
