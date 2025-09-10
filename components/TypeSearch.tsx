import { useCustomTheme } from '@/contexts/themeContext';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const amistadIcon =  require('../assets/images/amistadIcon.png');
const relacionIcon = require('@/assets/images/relacionIcon.png');
const citasIcon = require('@/assets/images/citasIcon.png');

type SearchType = 'amistad' | 'relacion' | 'citas';

const filters: { type: SearchType; label: string; icon: any }[] = [
  { type: 'amistad', label: 'Amistad', icon: amistadIcon },
  { type: 'citas', label: 'Citas', icon: citasIcon },
  { type: 'relacion', label: 'Relación', icon: relacionIcon },
];

export default function TopFilters() {
  const { searchType, setSearchType } = useCustomTheme();

  return (
    <View style={styles.container} pointerEvents="box-none">
      {filters.map((filter) => {
        const selected = filter.type === searchType;
        return (
          <View key={filter.type} style={{ display:"flex", flexDirection:"column",  alignItems:"center" }}>
            <View style={{
              padding: 2,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              borderWidth: selected ? 1 : 0,
              borderColor: selected ? '#e89aae' : 'transparent',
            }}>
              <TouchableOpacity
                key={filter.type}
                style={[
                  styles.filterButton,
                  { opacity: selected ? 1 : 0.5 },
                ]}
                
                onPress={() => {
                  console.log('Presionando:', filter.type);
                  setSearchType(filter.type); 
                }}
              >
                <Image source={filter.icon} style={styles.icon} resizeMode="contain" />
              </TouchableOpacity>
            </View>
            {selected && <Text style={styles.label}>{filter.label}</Text>}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: '100%',
    zIndex:50
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
  },
  icon: {
    width: 35,
    height: 35,
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});