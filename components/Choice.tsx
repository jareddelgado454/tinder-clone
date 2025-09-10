import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChoiceProps {
  type: "no" | "super" | "check";
}

export default function Choice({ type }: ChoiceProps) {
  return (
    <View style={styles.container}>
      {type === "no" && (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="close-thick" size={80} color="#ffffffff" />
        </View>
      )}

      {type === "check" && (
        <View style={[styles.iconContainer, styles.checkBorder]}>
          <MaterialCommunityIcons name="check-bold" size={80} color="#ffffffff" />
        </View>
      )}

      {type === "super" && (
        <View style={[styles.superLikeContainer]}>
          <Text style={styles.superLikeText}>SUPER{'\n'}LIKE</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "35%", // Ajusta según el diseño
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  noBorder: {
    borderColor: "#ffffffff", 
  },

  checkBorder: {
    borderColor: "#4EFF6B", 
  },

  /** SUPER LIKE */
  superLikeContainer: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 3,
    borderColor: "#FFF",
    borderRadius: 12,
    textAlign:"center",
    transform: [{ rotate : "-10deg" }]
  },
  superLikeText: {
    color: "#FFF",
    fontSize: 35,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign:"center"
  },
});
