import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const options = [
  { key: 'amistad', icon: 'people', label: 'Amistad' },
  { key: 'citas', icon: 'heart', label: 'Citas' },
  { key: 'relacion', icon: 'infinite', label: 'Relación' },
];

interface Props {
  onSelect: (type: 'amistad' | 'citas' | 'relacion') => void;
}

export default function TypeSearch({ onSelect }: Props) {
  const [selected, setSelected] = useState<'amistad' | 'citas' | 'relacion'>('amistad');

  const handleSelect = (key: 'amistad' | 'citas' | 'relacion') => {
    setSelected(key);
    onSelect(key); // Avisamos al padre (index.tsx)
  };

  return (
    <View style={styles.card}>
      {/* Botones superiores */}
      <View style={styles.topButtons}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={styles.circleButton}
            onPress={() => handleSelect(option.key as any)}
          >
            <Ionicons
              name={option.icon as any}
              size={24}
              color={selected === option.key ? '#fff' : 'rgba(255,255,255,0.6)'}
              style={{ marginBottom: 4 }}
            />
            {selected === option.key && (
              <Text style={styles.buttonText}>{option.label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Imagen de perfil */}
      <Image
        source={{ uri: 'https://i.pravatar.cc/300' }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  circleButton: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  image: {
    width: '100%',
    height: 400,
  },
});
