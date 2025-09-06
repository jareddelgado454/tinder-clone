'use client';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonsProps {
  onLike: () => void;
  onDislike: () => void;
}

export default function Buttons({ onLike, onDislike }: ButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={onDislike}>
        <Text style={styles.text}>Dislike</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={onLike}>
        <Text style={styles.text}>Like</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
